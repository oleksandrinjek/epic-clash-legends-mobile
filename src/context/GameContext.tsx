import { createContext, useContext, useState, ReactNode } from 'react';
import { Character, ShopItem } from '@/types/game';

export interface PurchasedItem extends ShopItem {
  purchaseId: string;
  appliedToHero?: string;
}

interface PlayerState {
  name: string;
  level: number;
  coins: number;
  wins: number;
  losses: number;
  purchasedItems: PurchasedItem[];
}

interface GameContextType {
  playerState: PlayerState;
  updatePlayerState: (updates: Partial<PlayerState>) => void;
  purchaseItem: (item: ShopItem) => boolean;
  getUpgradedHero: (hero: Character) => Character;
  canAfford: (price: number) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    name: 'Player',
    level: 12,
    coins: 1250,
    wins: 0,
    losses: 0,
    purchasedItems: []
  });

  const updatePlayerState = (updates: Partial<PlayerState>) => {
    setPlayerState(prev => ({ ...prev, ...updates }));
  };

  const purchaseItem = (item: ShopItem): boolean => {
    if (playerState.coins >= item.price) {
      const purchasedItem: PurchasedItem = {
        ...item,
        purchaseId: `${item.id}-${Date.now()}`
      };
      
      setPlayerState(prev => ({
        ...prev,
        coins: prev.coins - item.price,
        purchasedItems: [...prev.purchasedItems, purchasedItem]
      }));
      
      return true;
    }
    return false;
  };

  const getUpgradedHero = (hero: Character): Character => {
    const upgradedHero = { ...hero };
    
    // Apply all purchased item bonuses to the hero
    playerState.purchasedItems.forEach(item => {
      switch (item.effect.stat) {
        case 'attack':
          upgradedHero.attack += item.effect.value;
          break;
        case 'defense':
          upgradedHero.defense += item.effect.value;
          break;
        case 'health':
          upgradedHero.health += item.effect.value;
          upgradedHero.maxHealth += item.effect.value;
          break;
        case 'energy':
          upgradedHero.energy += item.effect.value;
          upgradedHero.maxEnergy += item.effect.value;
          break;
      }
    });
    
    return upgradedHero;
  };

  const canAfford = (price: number): boolean => {
    return playerState.coins >= price;
  };

  return (
    <GameContext.Provider value={{
      playerState,
      updatePlayerState,
      purchaseItem,
      getUpgradedHero,
      canAfford
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};