import { createContext, useContext, useState, ReactNode } from 'react';
import { Character, ShopItem, InventoryItem } from '@/types/game';

interface PlayerState {
  name: string;
  level: number;
  experience: number;
  coins: number;
  wins: number;
  losses: number;
  inventory: InventoryItem[];
}

interface GameContextType {
  playerState: PlayerState;
  updatePlayerState: (updates: Partial<PlayerState>) => void;
  purchaseItem: (item: ShopItem) => boolean;
  useInventoryItem: (inventoryItem: InventoryItem, character: Character) => Character;
  gainExperience: (exp: number) => void;
  canAfford: (price: number) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    name: 'Player',
    level: 1,
    experience: 0,
    coins: 1250,
    wins: 0,
    losses: 0,
    inventory: []
  });

  const updatePlayerState = (updates: Partial<PlayerState>) => {
    setPlayerState(prev => ({ ...prev, ...updates }));
  };

  const purchaseItem = (item: ShopItem): boolean => {
    if (playerState.coins >= item.price) {
      setPlayerState(prev => {
        const existingItem = prev.inventory.find(invItem => invItem.id === item.id);
        
        if (existingItem) {
          // Increase quantity if item already exists
          return {
            ...prev,
            coins: prev.coins - item.price,
            inventory: prev.inventory.map(invItem =>
              invItem.id === item.id
                ? { ...invItem, quantity: invItem.quantity + 1 }
                : invItem
            )
          };
        } else {
          // Add new item to inventory
          const inventoryItem: InventoryItem = {
            ...item,
            inventoryId: `${item.id}-${Date.now()}`,
            quantity: 1
          };
          
          return {
            ...prev,
            coins: prev.coins - item.price,
            inventory: [...prev.inventory, inventoryItem]
          };
        }
      });
      
      return true;
    }
    return false;
  };

  const useInventoryItem = (inventoryItem: InventoryItem, character: Character): Character => {
    const updatedCharacter = { ...character };
    
    // Apply item effect to character
    switch (inventoryItem.effect.stat) {
      case 'attack':
        updatedCharacter.attack += inventoryItem.effect.value;
        break;
      case 'defense':
        updatedCharacter.defense += inventoryItem.effect.value;
        break;
      case 'health':
        const healthIncrease = inventoryItem.effect.value;
        updatedCharacter.health = Math.min(updatedCharacter.maxHealth, updatedCharacter.health + healthIncrease);
        break;
      case 'energy':
        const energyIncrease = inventoryItem.effect.value;
        updatedCharacter.energy = Math.min(updatedCharacter.maxEnergy, updatedCharacter.energy + energyIncrease);
        break;
    }
    
    // Remove item from inventory (decrease quantity)
    setPlayerState(prev => ({
      ...prev,
      inventory: prev.inventory.map(item =>
        item.inventoryId === inventoryItem.inventoryId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    }));
    
    return updatedCharacter;
  };

  const gainExperience = (exp: number) => {
    setPlayerState(prev => {
      const newExp = prev.experience + exp;
      const expNeededForNextLevel = prev.level * 100; // 100 exp per level
      
      if (newExp >= expNeededForNextLevel) {
        // Level up!
        const newLevel = prev.level + 1;
        const remainingExp = newExp - expNeededForNextLevel;
        
        return {
          ...prev,
          level: newLevel,
          experience: remainingExp,
          coins: prev.coins + 25 // Bonus coins for leveling up
        };
      }
      
      return {
        ...prev,
        experience: newExp
      };
    });
  };

  const canAfford = (price: number): boolean => {
    return playerState.coins >= price;
  };

  return (
    <GameContext.Provider value={{
      playerState,
      updatePlayerState,
      purchaseItem,
      useInventoryItem,
      gainExperience,
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