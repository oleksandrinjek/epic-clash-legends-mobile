import { Character } from '@/types/game';

export const heroes: Character[] = [
  {
    id: 'fire-knight',
    name: 'Fire Ninja',
    type: 'hero',
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
    type: 'hero',
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
    type: 'hero',
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
    name: 'World Defender',
    type: 'hero',
    health: 120,
    maxHealth: 120,
    attack: 20,
    defense: 25,
    energy: 30,
    maxEnergy: 30,
    rarity: 'common',
    image: '/lovable-uploads/e5cf715e-7d36-4b2a-9d8d-46cdd081b4ef.png',
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

export const monsters: Character[] = [
  {
    id: 'shadow-demon',
    name: 'Shadow Demon',
    type: 'monster',
    health: 90,
    maxHealth: 90,
    attack: 32,
    defense: 12,
    energy: 45,
    maxEnergy: 45,
    rarity: 'epic',
    image: '👹🌙',
    abilities: [
      {
        id: 'dark-blast',
        name: 'Dark Blast',
        damage: 28,
        energyCost: 18,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Unleashes shadow energy',
        type: 'attack'
      },
      {
        id: 'shadow-heal',
        name: 'Shadow Drain',
        damage: -15,
        energyCost: 22,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Drains life from enemy to heal',
        type: 'heal'
      }
    ]
  },
  {
    id: 'frost-giant',
    name: 'Frost Giant',
    type: 'monster',
    health: 140,
    maxHealth: 140,
    attack: 28,
    defense: 20,
    energy: 35,
    maxEnergy: 35,
    rarity: 'legendary',
    image: '🧊👹',
    abilities: [
      {
        id: 'ice-smash',
        name: 'Ice Smash',
        damage: 35,
        energyCost: 25,
        cooldown: 1,
        currentCooldown: 0,
        description: 'Massive ice attack that slows enemy',
        type: 'attack'
      },
      {
        id: 'frost-armor',
        name: 'Frost Armor',
        damage: 0,
        energyCost: 20,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Ice armor reduces damage by 60%',
        type: 'defend'
      }
    ]
  },
  {
    id: 'fire-drake',
    name: 'Fire Drake',
    type: 'monster',
    health: 85,
    maxHealth: 85,
    attack: 38,
    defense: 8,
    energy: 55,
    maxEnergy: 55,
    rarity: 'rare',
    image: '🐲🔥',
    abilities: [
      {
        id: 'flame-breath',
        name: 'Flame Breath',
        damage: 32,
        energyCost: 20,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Breathes scorching flames',
        type: 'attack'
      },
      {
        id: 'wing-gust',
        name: 'Wing Gust',
        damage: 18,
        energyCost: 15,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Wind attack that pushes back enemy',
        type: 'attack'
      }
    ]
  },
  {
    id: 'void-wraith',
    name: 'Void Wraith',
    type: 'monster',
    health: 70,
    maxHealth: 70,
    attack: 40,
    defense: 5,
    energy: 60,
    maxEnergy: 60,
    rarity: 'legendary',
    image: '👻🌌',
    abilities: [
      {
        id: 'void-strike',
        name: 'Void Strike',
        damage: 45,
        energyCost: 30,
        cooldown: 1,
        currentCooldown: 0,
        description: 'Devastating attack from the void',
        type: 'attack'
      },
      {
        id: 'phase-out',
        name: 'Phase Out',
        damage: 0,
        energyCost: 25,
        cooldown: 5,
        currentCooldown: 0,
        description: 'Becomes incorporeal, avoiding damage',
        type: 'special'
      }
    ]
  },
  {
    id: 'rock-golem',
    name: 'Rock Golem',
    type: 'monster',
    health: 160,
    maxHealth: 160,
    attack: 22,
    defense: 30,
    energy: 25,
    maxEnergy: 25,
    rarity: 'common',
    image: '🗿⛰️',
    abilities: [
      {
        id: 'boulder-toss',
        name: 'Boulder Toss',
        damage: 26,
        energyCost: 15,
        cooldown: 1,
        currentCooldown: 0,
        description: 'Hurls a massive boulder',
        type: 'attack'
      },
      {
        id: 'stone-skin',
        name: 'Stone Skin',
        damage: 0,
        energyCost: 12,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Hardens skin for ultimate defense',
        type: 'defend'
      }
    ]
  },
  {
    id: 'storm-elemental',
    name: 'Storm Elemental',
    type: 'monster',
    health: 75,
    maxHealth: 75,
    attack: 35,
    defense: 10,
    energy: 65,
    maxEnergy: 65,
    rarity: 'epic',
    image: '⚡🌪️',
    abilities: [
      {
        id: 'lightning-bolt',
        name: 'Lightning Bolt',
        damage: 38,
        energyCost: 22,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Electric shock from the storm',
        type: 'attack'
      },
      {
        id: 'thunder-clap',
        name: 'Thunder Clap',
        damage: 20,
        energyCost: 18,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Stunning sound wave attack',
        type: 'attack'
      }
    ]
  }
];

// Combined array for backward compatibility
export const characters: Character[] = [...heroes, ...monsters];