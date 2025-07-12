import { Character } from '@/types/game';

export const characters: Character[] = [
  {
    id: 'fire-knight',
    name: 'Fire Ninja',
    health: 100,
    maxHealth: 100,
    attack: 25,
    defense: 15,
    energy: 50,
    maxEnergy: 50,
    rarity: 'epic',
    image: '/lovable-uploads/49100634-f3c6-4802-994b-538b52ea2d38.png',
    abilities: [
      {
        id: 'flame-strike',
        name: 'Flame Strike',
        damage: 30,
        energyCost: 20,
        cooldown: 0,
        currentCooldown: 0,
        description: 'A powerful fire attack',
        type: 'attack'
      },
      {
        id: 'blazing-shield',
        name: 'Blazing Shield',
        damage: 0,
        energyCost: 15,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Reduces incoming damage by 50%',
        type: 'defend'
      }
    ]
  },
  {
    id: 'ice-mage',
    name: 'Ice Mage',
    health: 80,
    maxHealth: 80,
    attack: 30,
    defense: 10,
    energy: 60,
    maxEnergy: 60,
    rarity: 'rare',
    image: '/lovable-uploads/d93765a6-5a88-4644-89f6-ffc315bc15a5.png',
    abilities: [
      {
        id: 'frost-bolt',
        name: 'Frost Bolt',
        damage: 25,
        energyCost: 15,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Ice projectile that slows enemy',
        type: 'attack'
      },
      {
        id: 'ice-heal',
        name: 'Frozen Recovery',
        damage: -20,
        energyCost: 25,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Heals 20 HP',
        type: 'heal'
      }
    ]
  },
  {
    id: 'shadow-assassin',
    name: 'Guardian',
    health: 70,
    maxHealth: 70,
    attack: 35,
    defense: 8,
    energy: 40,
    maxEnergy: 40,
    rarity: 'legendary',
    image: '/lovable-uploads/b947c9a5-6e1b-463e-b02e-1cc3b155f794.png',
    abilities: [
      {
        id: 'shadow-strike',
        name: 'Shadow Strike',
        damage: 40,
        energyCost: 25,
        cooldown: 1,
        currentCooldown: 0,
        description: 'High damage stealth attack',
        type: 'attack'
      },
      {
        id: 'vanish',
        name: 'Vanish',
        damage: 0,
        energyCost: 20,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Become untargetable for 1 turn',
        type: 'special'
      }
    ]
  },
  {
    id: 'earth-guardian',
    name: 'Earth Guardian',
    health: 120,
    maxHealth: 120,
    attack: 20,
    defense: 25,
    energy: 30,
    maxEnergy: 30,
    rarity: 'common',
    image: '🌍🛡️',
    abilities: [
      {
        id: 'rock-throw',
        name: 'Rock Throw',
        damage: 22,
        energyCost: 12,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Basic earth attack',
        type: 'attack'
      },
      {
        id: 'stone-wall',
        name: 'Stone Wall',
        damage: 0,
        energyCost: 18,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Blocks next attack completely',
        type: 'defend'
      }
    ]
  }
];