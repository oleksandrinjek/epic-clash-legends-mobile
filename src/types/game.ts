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
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
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
  type: 'attack' | 'defend' | 'heal' | 'special';
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