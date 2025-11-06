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
  selectedHero: Character | null; // For battles
  avatarHero: Character | null; // For avatar display
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
  levelUpHero: (heroId: string) => boolean;
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
    selectedHero: { ...heroes[0], level: 1 }, // For battles
    avatarHero: { ...heroes[0], level: 1 }, // For avatar display
    ownedHeroes: heroes.map(h => ({ ...h, level: 1 })) // Start with the default heroes
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
      let currentLevel = prev.level;
      let currentExp = prev.experience + exp;
      let totalCoinsEarned = 0;
      
      // Check for multiple level ups
      while (currentExp >= currentLevel * 100) {
        currentExp -= currentLevel * 100;
        currentLevel += 1;
        totalCoinsEarned += 25; // Bonus coins for each level up
      }
      
      return {
        ...prev,
        level: currentLevel,
        experience: currentExp,
        coins: prev.coins + totalCoinsEarned
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
        ownedHeroes: [...prev.ownedHeroes, { ...hero, level: 1 }]
      }));
      return true;
    }
    return false;
  };

  const levelUpHero = (heroId: string): boolean => {
    const hero = playerState.ownedHeroes.find(h => h.id === heroId);
    if (!hero) return false;

    const currentLevel = hero.level || 1;
    const levelUpCost = currentLevel * 100; // Cost increases with level

    if (playerState.coins < levelUpCost) return false;

    setPlayerState(prev => ({
      ...prev,
      coins: prev.coins - levelUpCost,
      ownedHeroes: prev.ownedHeroes.map(h => {
        if (h.id === heroId) {
          const newLevel = currentLevel + 1;
          // Increase stats by 10% per level
          return {
            ...h,
            level: newLevel,
            attack: Math.floor(h.attack * 1.1),
            defense: Math.floor(h.defense * 1.1),
            maxHealth: Math.floor(h.maxHealth * 1.1),
            health: Math.floor(h.maxHealth * 1.1),
            maxEnergy: Math.floor(h.maxEnergy * 1.05),
            energy: Math.floor(h.maxEnergy * 1.05),
          };
        }
        return h;
      }),
      // Update selected heroes if they are the leveled hero
      selectedHero: prev.selectedHero?.id === heroId 
        ? prev.ownedHeroes.find(h => h.id === heroId) || prev.selectedHero
        : prev.selectedHero,
      avatarHero: prev.avatarHero?.id === heroId
        ? prev.ownedHeroes.find(h => h.id === heroId) || prev.avatarHero
        : prev.avatarHero,
    }));

    return true;
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
          // Ensure we have valid heroes - either from saved state or default to first owned hero
          selectedHero: (savedState as any).selectedHero || savedState.ownedHeroes[0] || prev.selectedHero,
          avatarHero: (savedState as any).avatarHero || savedState.ownedHeroes[0] || prev.avatarHero,
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

  // Ensure we always have heroes and selected heroes
  useEffect(() => {
    if (playerState.ownedHeroes.length === 0) {
      setPlayerState(prev => ({
        ...prev,
        ownedHeroes: [...heroes],
        selectedHero: heroes[0],
        avatarHero: heroes[0]
      }));
    } else {
      // Ensure we have valid selected heroes
      const needsSelectedHero = !playerState.selectedHero || !playerState.ownedHeroes.find(h => h.id === playerState.selectedHero?.id);
      const needsAvatarHero = !playerState.avatarHero || !playerState.ownedHeroes.find(h => h.id === playerState.avatarHero?.id);
      
      if (needsSelectedHero || needsAvatarHero) {
        setPlayerState(prev => ({
          ...prev,
          selectedHero: needsSelectedHero ? prev.ownedHeroes[0] : prev.selectedHero,
          avatarHero: needsAvatarHero ? prev.ownedHeroes[0] : prev.avatarHero
        }));
      }
    }
  }, [playerState.ownedHeroes.length, playerState.selectedHero, playerState.avatarHero]);

  return (
    <GameContext.Provider value={{
      playerState,
      updatePlayerState,
      purchaseItem,
      useInventoryItem,
      gainExperience,
      canAfford,
      recruitHero,
      levelUpHero,
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