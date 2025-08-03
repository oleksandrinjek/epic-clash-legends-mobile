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
        energyCost: 0,
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
      },
      {
        id: 'super-flame',
        name: 'Inferno Burst',
        damage: 60,
        energyCost: 30,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Unleash a devastating inferno!',
        type: 'super'
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
        energyCost: 0,
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
      },
      {
        id: 'super-ice',
        name: 'Absolute Zero',
        damage: 55,
        energyCost: 28,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Freeze the enemy with absolute cold!',
        type: 'super'
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
        energyCost: 0,
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
      },
      {
        id: 'super-shadow',
        name: 'Nightmare Edge',
        damage: 70,
        energyCost: 35,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Strike from the shadows with deadly force!',
        type: 'super'
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
        energyCost: 0,
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
      },
      {
        id: 'super-earth',
        name: 'Gaia Slam',
        damage: 50,
        energyCost: 22,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Smash the ground with earth power!',
        type: 'super'
      }
    ]
  }
];

export const monsters: Character[] = [
  {
    id: 'scary-tree',
    name: 'Scary Tree',
    type: 'monster',
    health: 100,
    maxHealth: 100,
    attack: 28,
    defense: 18,
    energy: 50,
    maxEnergy: 50,
    rarity: 'rare',
    image: '/lovable-uploads/dce986e6-60b4-47a7-a2e8-471d26eda6c8.png',
    abilities: [
      {
        id: 'branch-whip',
        name: 'Branch Whip',
        damage: 25,
        energyCost: 15,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Lashes out with twisted branches',
        type: 'attack'
      },
      {
        id: 'root-entangle',
        name: 'Root Entangle',
        damage: 20,
        energyCost: 20,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Roots burst from ground to entangle enemy',
        type: 'special'
      },
      {
        id: 'bark-armor',
        name: 'Bark Armor',
        damage: 0,
        energyCost: 18,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Thickens bark for increased defense',
        type: 'defend'
      }
    ]
  },
  {
    id: 'rock-golem',
    name: 'Rock Golem',
    type: 'monster',
    health: 120,
    maxHealth: 120,
    attack: 30,
    defense: 25,
    energy: 40,
    maxEnergy: 40,
    rarity: 'epic',
    image: '/lovable-uploads/01cbd07a-768b-42fe-823c-5b23c25d3166.png',
    abilities: [
      {
        id: 'boulder-throw',
        name: 'Boulder Throw',
        damage: 32,
        energyCost: 20,
        cooldown: 1,
        currentCooldown: 0,
        description: 'Hurls a massive stone at the enemy',
        type: 'attack'
      },
      {
        id: 'stone-armor',
        name: 'Stone Armor',
        damage: 0,
        energyCost: 15,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Hardens skin, reducing incoming damage',
        type: 'defend'
      },
      {
        id: 'earth-tremor',
        name: 'Earth Tremor',
        damage: 25,
        energyCost: 25,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Causes the ground to shake violently',
        type: 'special'
      }
    ]
  },
  {
    id: 'frost-giant',
    name: 'Waterdemon',
    type: 'monster',
    health: 140,
    maxHealth: 140,
    attack: 28,
    defense: 20,
    energy: 35,
    maxEnergy: 35,
    rarity: 'legendary',
    image: '/lovable-uploads/89b908d6-cb2f-4b4b-8b19-05b893107d24.png',
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
    image: '/lovable-uploads/24eb45af-d49f-4513-bd0e-f2ed3cb6a8bf.png',
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
    image: '/lovable-uploads/378a5bc1-671a-48d5-87f5-c8019170ec64.png',
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
    id: 'storm-elemental',
    name: 'Firedemon',
    type: 'monster',
    health: 75,
    maxHealth: 75,
    attack: 35,
    defense: 10,
    energy: 65,
    maxEnergy: 65,
    rarity: 'epic',
    image: '/lovable-uploads/f5ddbafa-1275-406f-a966-c01489c58475.png',
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

// Heroes available for purchase in the village
export const villageHeroes: Character[] = [
  {
    id: 'lightning-wizard',
    name: 'Lightning Wizard',
    type: 'hero',
    health: 90,
    maxHealth: 90,
    attack: 32,
    defense: 12,
    energy: 70,
    maxEnergy: 70,
    rarity: 'epic',
    image: '/lovable-uploads/60aa725a-b504-4b45-99c9-c77374d66bfd.png',
    abilities: [
      {
        id: 'thunder-strike',
        name: 'Thunder Strike',
        damage: 35,
        energyCost: 0,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Electric attack that stuns',
        type: 'attack'
      },
      {
        id: 'lightning-shield',
        name: 'Lightning Shield',
        damage: 0,
        energyCost: 20,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Electrifies defense, reflecting damage',
        type: 'defend'
      },
      {
        id: 'chain-lightning',
        name: 'Chain Lightning',
        damage: 65,
        energyCost: 35,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Lightning that bounces between enemies!',
        type: 'super'
      }
    ]
  },
  {
    id: 'forest-ranger',
    name: 'Forest Ranger',
    type: 'hero',
    health: 95,
    maxHealth: 95,
    attack: 28,
    defense: 18,
    energy: 45,
    maxEnergy: 45,
    rarity: 'rare',
    image: '/lovable-uploads/4d283304-067e-41fc-9da9-530663f35cbf.png',
    abilities: [
      {
        id: 'arrow-shot',
        name: 'Arrow Shot',
        damage: 30,
        energyCost: 0,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Precise arrow attack',
        type: 'attack'
      },
      {
        id: 'nature-heal',
        name: 'Nature\'s Blessing',
        damage: -25,
        energyCost: 20,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Heals 25 HP using nature magic',
        type: 'heal'
      },
      {
        id: 'multi-shot',
        name: 'Multi Shot',
        damage: 50,
        energyCost: 25,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Fires multiple arrows at once!',
        type: 'super'
      }
    ]
  },
  {
    id: 'crystal-knight',
    name: 'Crystal Knight',
    type: 'hero',
    health: 110,
    maxHealth: 110,
    attack: 26,
    defense: 22,
    energy: 35,
    maxEnergy: 35,
    rarity: 'legendary',
    image: '/lovable-uploads/fca6bd6e-161c-49a9-ae6f-a947f3376f26.png',
    abilities: [
      {
        id: 'crystal-blade',
        name: 'Crystal Blade',
        damage: 28,
        energyCost: 0,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Sharp crystalline attack',
        type: 'attack'
      },
      {
        id: 'crystal-barrier',
        name: 'Crystal Barrier',
        damage: 0,
        energyCost: 18,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Creates protective crystal shield',
        type: 'defend'
      },
      {
        id: 'prism-blast',
        name: 'Prism Blast',
        damage: 75,
        energyCost: 30,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Devastating light refraction attack!',
        type: 'super'
      }
    ]
  },
  {
    id: 'wind-dancer',
    name: 'Wind Dancer',
    type: 'hero',
    health: 75,
    maxHealth: 75,
    attack: 38,
    defense: 8,
    energy: 55,
    maxEnergy: 55,
    rarity: 'uncommon',
    image: '/lovable-uploads/60aa725a-b504-4b45-99c9-c77374d66bfd.png',
    abilities: [
      {
        id: 'wind-slash',
        name: 'Wind Slash',
        damage: 33,
        energyCost: 0,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Swift wind blade attack',
        type: 'attack'
      },
      {
        id: 'gust-dodge',
        name: 'Gust Dodge',
        damage: 0,
        energyCost: 15,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Wind currents help avoid next attack',
        type: 'special'
      },
      {
        id: 'tornado',
        name: 'Tornado',
        damage: 55,
        energyCost: 28,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Summons a powerful tornado!',
        type: 'super'
      }
    ]
  }
];

// Combined array for backward compatibility
export const characters: Character[] = [...heroes, ...monsters];