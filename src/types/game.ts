export interface Character {
  id: string;
  name: string;
  type: 'hero' | 'monster';
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  energy: number;
  maxEnergy: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  image: string;
  abilities: Ability[];
}

export interface Ability {
  id: string;
  name: string;
  damage: number;
  energyCost: number;
  cooldown: number;
  currentCooldown: number;
  description: string;
  type: 'attack' | 'defend' | 'heal' | 'special' | 'super';
}

export interface GameState {
  playerCharacter: Character;
  enemyCharacter: Character;
  currentTurn: 'player' | 'enemy';
  battleLog: string[];
  gameStatus: 'menu' | 'battle' | 'victory' | 'defeat';
  round: number;
}

export interface Player {
  id: string;
  name: string;
  level: number;
  experience: number;
  coins: number;
  characters: Character[];
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'accessory';
  price: number;
  description: string;
  image: string;
  effect: {
    stat: 'attack' | 'defense' | 'health' | 'energy';
    value: number;
  };
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  usableInBattle?: boolean;
}

export interface InventoryItem extends ShopItem {
  inventoryId: string;
  quantity: number;
}