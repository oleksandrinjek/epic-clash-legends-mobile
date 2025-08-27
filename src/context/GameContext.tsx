import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Character, ShopItem, InventoryItem } from '@/types/game';
import { heroes } from '@/data/characters';
import { usePlayerPersistence } from '@/hooks/use-player-persistence';

interface PlayerState {
  name: string;
  level: number;
  experience: number;
  coins: number;
  wins: number;
  losses: number;
  inventory: InventoryItem[];
  selectedHero: Character | null;
  ownedHeroes: Character[];
}

interface GameContextType {
  playerState: PlayerState;
  updatePlayerState: (updates: Partial<PlayerState>) => void;
  purchaseItem: (item: ShopItem) => boolean;
  useInventoryItem: (inventoryItem: InventoryItem, character: Character) => Character;
  gainExperience: (exp: number) => void;
  canAfford: (price: number) => boolean;
  recruitHero: (hero: Character, price: number) => boolean;
  saveProgress: () => Promise<void>;
  loadProgress: () => Promise<void>;
  isAuthenticated: boolean;
  initializePlayer: (name: string) => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const {
    playerId,
    isLoading,
    isAuthenticated,
    initializePlayer: initPlayer,
    loadPlayerState: loadState,
    savePlayerState: saveState,
    autoSave,
  } = usePlayerPersistence();

  const [playerState, setPlayerState] = useState<PlayerState>({
    name: 'Player',
    level: 1,
    experience: 0,
    coins: 1250,
    wins: 0,
    losses: 0,
    inventory: [],
    selectedHero: heroes[0], // Default to first hero
    ownedHeroes: [...heroes] // Start with the default heroes
  });

  const updatePlayerState = (updates: Partial<PlayerState>) => {
    setPlayerState(prev => {
      const newState = { ...prev, ...updates };
      // Auto-save after state updates
      if (isAuthenticated) {
        autoSave(newState);
      }
      return newState;
    });
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

  const recruitHero = (hero: Character, price: number): boolean => {
    if (playerState.coins >= price) {
      // Check if hero is already owned
      const alreadyOwned = playerState.ownedHeroes.find(ownedHero => ownedHero.id === hero.id);
      if (alreadyOwned) {
        return false; // Hero already owned
      }

      setPlayerState(prev => ({
        ...prev,
        coins: prev.coins - price,
        ownedHeroes: [...prev.ownedHeroes, { ...hero }]
      }));
      return true;
    }
    return false;
  };

  // Save progress to database
  const saveProgress = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      await saveState({
        name: playerState.name,
        level: playerState.level,
        experience: playerState.experience,
        coins: playerState.coins,
        wins: playerState.wins,
        losses: playerState.losses,
        inventory: playerState.inventory,
        ownedHeroes: playerState.ownedHeroes,
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [isAuthenticated, saveState, playerState]);

  // Load progress from database
  const loadProgress = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      const savedState = await loadState();
      if (savedState) {
        setPlayerState(prev => ({
          ...prev,
          ...savedState,
          // Ensure we have a valid selectedHero - either from saved state or default to first owned hero
          selectedHero: (savedState as any).selectedHero || savedState.ownedHeroes[0] || prev.selectedHero,
        }));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  }, [isAuthenticated, loadState]);

  // Initialize player
  const initializePlayer = useCallback(async (name: string) => {
    await initPlayer(name);
    setPlayerState(prev => ({ ...prev, name }));
  }, [initPlayer]);

  // Load progress when authenticated
  useEffect(() => {
    if (isAuthenticated && playerId) {
      loadProgress();
    }
  }, [isAuthenticated, playerId, loadProgress]);

  // Ensure we always have heroes and a selected hero
  useEffect(() => {
    if (playerState.ownedHeroes.length === 0) {
      setPlayerState(prev => ({
        ...prev,
        ownedHeroes: [...heroes],
        selectedHero: heroes[0]
      }));
    } else if (!playerState.selectedHero || !playerState.ownedHeroes.find(h => h.id === playerState.selectedHero?.id)) {
      // If no hero is selected or selected hero is not owned, select the first owned hero
      setPlayerState(prev => ({
        ...prev,
        selectedHero: prev.ownedHeroes[0]
      }));
    }
  }, [playerState.ownedHeroes.length, playerState.selectedHero]);

  return (
    <GameContext.Provider value={{
      playerState,
      updatePlayerState,
      purchaseItem,
      useInventoryItem,
      gainExperience,
      canAfford,
      recruitHero,
      saveProgress,
      loadProgress,
      isAuthenticated,
      initializePlayer
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