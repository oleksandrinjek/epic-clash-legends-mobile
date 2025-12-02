import { Character } from '@/types/game';

export const heroes: Character[] = [
  {
    id: 'fire-knight',
    name: 'Fire Ninja',
    type: 'hero',
    health: 160,
    maxHealth: 160,
    attack: 40,
    defense: 24,
    energy: 80,
    maxEnergy: 80,
    rarity: 'epic',
    image: '/lovable-uploads/49100634-f3c6-4802-994b-538b52ea2d38.png',
    abilities: [
      {
        id: 'flame-strike',
        name: 'Flame Strike',
        damage: 48,
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
        energyCost: 24,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Reduces incoming damage by 50%',
        type: 'defend'
      },
      {
        id: 'super-flame',
        name: 'Inferno Burst',
        damage: 96,
        energyCost: 48,
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
    health: 112,
    maxHealth: 112,
    attack: 42,
    defense: 14,
    energy: 84,
    maxEnergy: 84,
    rarity: 'rare',
    image: '/lovable-uploads/d93765a6-5a88-4644-89f6-ffc315bc15a5.png',
    abilities: [
      {
        id: 'frost-bolt',
        name: 'Frost Bolt',
        damage: 35,
        energyCost: 0,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Ice projectile that slows enemy',
        type: 'attack'
      },
      {
        id: 'ice-heal',
        name: 'Frozen Recovery',
        damage: -28,
        energyCost: 35,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Heals 20 HP',
        type: 'heal'
      },
      {
        id: 'super-ice',
        name: 'Absolute Zero',
        damage: 77,
        energyCost: 39,
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
    health: 126,
    maxHealth: 126,
    attack: 63,
    defense: 14,
    energy: 72,
    maxEnergy: 72,
    rarity: 'legendary',
    image: '/lovable-uploads/b947c9a5-6e1b-463e-b02e-1cc3b155f794.png',
    abilities: [
      {
        id: 'shadow-strike',
        name: 'Shadow Strike',
        damage: 72,
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
        energyCost: 36,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Become untargetable for 1 turn',
        type: 'special'
      },
      {
        id: 'super-shadow',
        name: 'Nightmare Edge',
        damage: 126,
        energyCost: 63,
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
    health: 100,
    maxHealth: 100,
    attack: 25,
    defense: 20,
    energy: 50,
    maxEnergy: 50,
    rarity: 'common',
    image: '/lovable-uploads/e5cf715e-7d36-4b2a-9d8d-46cdd081b4ef.png',
    abilities: [
      {
        id: 'rock-throw',
        name: 'Rock Throw',
        damage: 30,
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
        energyCost: 20,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Blocks next attack completely',
        type: 'defend'
      },
      {
        id: 'super-earth',
        name: 'Gaia Slam',
        damage: 60,
        energyCost: 25,
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
    health: 140,
    maxHealth: 140,
    attack: 39,
    defense: 25,
    energy: 70,
    maxEnergy: 70,
    rarity: 'rare',
    image: '/lovable-uploads/dce986e6-60b4-47a7-a2e8-471d26eda6c8.png',
    abilities: [
      {
        id: 'branch-whip',
        name: 'Branch Whip',
        damage: 35,
        energyCost: 21,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Lashes out with twisted branches',
        type: 'attack'
      },
      {
        id: 'root-entangle',
        name: 'Root Entangle',
        damage: 28,
        energyCost: 28,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Roots burst from ground to entangle enemy',
        type: 'special'
      },
      {
        id: 'bark-armor',
        name: 'Bark Armor',
        damage: 0,
        energyCost: 25,
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
    health: 192,
    maxHealth: 192,
    attack: 48,
    defense: 40,
    energy: 64,
    maxEnergy: 64,
    rarity: 'epic',
    image: '/lovable-uploads/01cbd07a-768b-42fe-823c-5b23c25d3166.png',
    abilities: [
      {
        id: 'boulder-throw',
        name: 'Boulder Throw',
        damage: 51,
        energyCost: 32,
        cooldown: 1,
        currentCooldown: 0,
        description: 'Hurls a massive stone at the enemy',
        type: 'attack'
      },
      {
        id: 'stone-armor',
        name: 'Stone Armor',
        damage: 0,
        energyCost: 24,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Hardens skin, reducing incoming damage',
        type: 'defend'
      },
      {
        id: 'earth-tremor',
        name: 'Earth Tremor',
        damage: 40,
        energyCost: 40,
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
    health: 252,
    maxHealth: 252,
    attack: 50,
    defense: 36,
    energy: 63,
    maxEnergy: 63,
    rarity: 'legendary',
    image: '/lovable-uploads/89b908d6-cb2f-4b4b-8b19-05b893107d24.png',
    abilities: [
      {
        id: 'ice-smash',
        name: 'Ice Smash',
        damage: 63,
        energyCost: 45,
        cooldown: 1,
        currentCooldown: 0,
        description: 'Massive ice attack that slows enemy',
        type: 'attack'
      },
      {
        id: 'frost-armor',
        name: 'Frost Armor',
        damage: 0,
        energyCost: 36,
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
    health: 119,
    maxHealth: 119,
    attack: 53,
    defense: 11,
    energy: 77,
    maxEnergy: 77,
    rarity: 'rare',
    image: '/lovable-uploads/24eb45af-d49f-4513-bd0e-f2ed3cb6a8bf.png',
    abilities: [
      {
        id: 'flame-breath',
        name: 'Flame Breath',
        damage: 45,
        energyCost: 28,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Breathes scorching flames',
        type: 'attack'
      },
      {
        id: 'wing-gust',
        name: 'Wing Gust',
        damage: 25,
        energyCost: 21,
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
    health: 126,
    maxHealth: 126,
    attack: 72,
    defense: 9,
    energy: 108,
    maxEnergy: 108,
    rarity: 'legendary',
    image: '/lovable-uploads/378a5bc1-671a-48d5-87f5-c8019170ec64.png',
    abilities: [
      {
        id: 'void-strike',
        name: 'Void Strike',
        damage: 81,
        energyCost: 54,
        cooldown: 1,
        currentCooldown: 0,
        description: 'Devastating attack from the void',
        type: 'attack'
      },
      {
        id: 'phase-out',
        name: 'Phase Out',
        damage: 0,
        energyCost: 45,
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
    health: 120,
    maxHealth: 120,
    attack: 56,
    defense: 16,
    energy: 104,
    maxEnergy: 104,
    rarity: 'epic',
    image: '/lovable-uploads/f5ddbafa-1275-406f-a966-c01489c58475.png',
    abilities: [
      {
        id: 'lightning-bolt',
        name: 'Lightning Bolt',
        damage: 61,
        energyCost: 35,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Electric shock from the storm',
        type: 'attack'
      },
      {
        id: 'thunder-clap',
        name: 'Thunder Clap',
        damage: 32,
        energyCost: 29,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Stunning sound wave attack',
        type: 'attack'
      }
    ]
  },
  {
    id: 'shadow-beast',
    name: 'Shadow Beast',
    type: 'monster',
    health: 133,
    maxHealth: 133,
    attack: 46,
    defense: 17,
    energy: 63,
    maxEnergy: 63,
    rarity: 'rare',
    image: '/lovable-uploads/378a5bc1-671a-48d5-87f5-c8019170ec64.png',
    abilities: [
      {
        id: 'dark-claw',
        name: 'Dark Claw',
        damage: 42,
        energyCost: 21,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Slashes with shadowy claws',
        type: 'attack'
      },
      {
        id: 'shadow-leap',
        name: 'Shadow Leap',
        damage: 35,
        energyCost: 28,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Teleports behind enemy for surprise attack',
        type: 'special'
      }
    ]
  },
  {
    id: 'bone-dragon',
    name: 'Bone Dragon',
    type: 'monster',
    health: 288,
    maxHealth: 288,
    attack: 63,
    defense: 27,
    energy: 90,
    maxEnergy: 90,
    rarity: 'legendary',
    image: '/lovable-uploads/24eb45af-d49f-4513-bd0e-f2ed3cb6a8bf.png',
    abilities: [
      {
        id: 'bone-breath',
        name: 'Bone Breath',
        damage: 72,
        energyCost: 45,
        cooldown: 1,
        currentCooldown: 0,
        description: 'Breathes cursed bone fragments',
        type: 'attack'
      },
      {
        id: 'death-roar',
        name: 'Death Roar',
        damage: 40,
        energyCost: 36,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Terrifying roar that weakens enemy defense',
        type: 'special'
      },
      {
        id: 'necro-heal',
        name: 'Necro Heal',
        damage: -54,
        energyCost: 54,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Absorbs dark energy to heal',
        type: 'heal'
      }
    ]
  },
  {
    id: 'crystal-spider',
    name: 'Crystal Spider',
    type: 'monster',
    health: 104,
    maxHealth: 104,
    attack: 67,
    defense: 13,
    energy: 96,
    maxEnergy: 96,
    rarity: 'epic',
    image: '/lovable-uploads/crystal-spider.png',
    abilities: [
      {
        id: 'crystal-bite',
        name: 'Crystal Bite',
        damage: 61,
        energyCost: 29,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Venomous bite with crystal fangs',
        type: 'attack'
      },
      {
        id: 'web-trap',
        name: 'Web Trap',
        damage: 24,
        energyCost: 35,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Entangles enemy in crystal webs',
        type: 'special'
      }
    ]
  },
  {
    id: 'poison-plant',
    name: 'Poison Plant',
    type: 'monster',
    health: 96,
    maxHealth: 96,
    attack: 31,
    defense: 17,
    energy: 48,
    maxEnergy: 48,
    rarity: 'uncommon',
    image: '/lovable-uploads/dce986e6-60b4-47a7-a2e8-471d26eda6c8.png',
    abilities: [
      {
        id: 'toxic-spore',
        name: 'Toxic Spore',
        damage: 29,
        energyCost: 14,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Releases poisonous spores',
        type: 'attack'
      },
      {
        id: 'poison-cloud',
        name: 'Poison Cloud',
        damage: 22,
        energyCost: 22,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Creates a lingering poison cloud',
        type: 'special'
      },
      {
        id: 'root-regeneration',
        name: 'Root Regeneration',
        damage: -14,
        energyCost: 18,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Heals by absorbing nutrients from soil',
        type: 'heal'
      }
    ]
  },
  {
    id: 'lava-golem',
    name: 'Lava Golem',
    type: 'monster',
    health: 208,
    maxHealth: 208,
    attack: 51,
    defense: 35,
    energy: 56,
    maxEnergy: 56,
    rarity: 'epic',
    image: '/lovable-uploads/lava-golem.png',
    abilities: [
      {
        id: 'magma-punch',
        name: 'Magma Punch',
        damage: 56,
        energyCost: 32,
        cooldown: 1,
        currentCooldown: 0,
        description: 'Molten fist burns through armor',
        type: 'attack'
      },
      {
        id: 'lava-armor',
        name: 'Lava Armor',
        damage: 0,
        energyCost: 40,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Molten skin damages attackers',
        type: 'defend'
      }
    ]
  },
  {
    id: 'ice-wraith',
    name: 'Ice Wraith',
    type: 'monster',
    health: 98,
    maxHealth: 98,
    attack: 50,
    defense: 8,
    energy: 77,
    maxEnergy: 77,
    rarity: 'rare',
    image: '/lovable-uploads/89b908d6-cb2f-4b4b-8b19-05b893107d24.png',
    abilities: [
      {
        id: 'frost-touch',
        name: 'Frost Touch',
        damage: 24,
        energyCost: 22,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Freezing touch that slows enemy',
        type: 'attack'
      },
      {
        id: 'ice-storm',
        name: 'Ice Storm',
        damage: 39,
        energyCost: 34,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Summons a swirling ice storm',
        type: 'special'
      }
    ]
  },
  {
    id: 'metal-scorpion',
    name: 'Metal Scorpion',
    type: 'monster',
    health: 119,
    maxHealth: 119,
    attack: 48,
    defense: 22,
    energy: 63,
    maxEnergy: 63,
    rarity: 'rare',
    image: '/lovable-uploads/4d283304-067e-41fc-9da9-530663f35cbf.png',
    abilities: [
      {
        id: 'steel-sting',
        name: 'Steel Sting',
        damage: 50,
        energyCost: 25,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Piercing metallic tail strike',
        type: 'attack'
      },
      {
        id: 'armor-pierce',
        name: 'Armor Pierce',
        damage: 63,
        energyCost: 35,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Ignores enemy defense completely',
        type: 'special'
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
    image: '/lovable-uploads/lightning-wizard.png',
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
    name: 'Archero',
    type: 'hero',
    health: 95,
    maxHealth: 95,
    attack: 28,
    defense: 18,
    energy: 45,
    maxEnergy: 45,
    rarity: 'rare',
    image: '/lovable-uploads/6f0c5b59-3cf6-4ef8-9ae2-53e6c96527c3.png',
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
    image: '/lovable-uploads/3f7f3ac7-d7f3-4749-9853-12923e6e8e4e.png',
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
  },
  {
    id: 'steel-warrior',
    name: 'Steel Warrior',
    type: 'hero',
    health: 130,
    maxHealth: 130,
    attack: 24,
    defense: 28,
    energy: 40,
    maxEnergy: 40,
    rarity: 'epic',
    image: '/lovable-uploads/4d283304-067e-41fc-9da9-530663f35cbf.png',
    abilities: [
      {
        id: 'steel-strike',
        name: 'Steel Strike',
        damage: 26,
        energyCost: 0,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Heavy metallic blow',
        type: 'attack'
      },
      {
        id: 'iron-wall',
        name: 'Iron Wall',
        damage: 0,
        energyCost: 20,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Becomes nearly invulnerable for one turn',
        type: 'defend'
      },
      {
        id: 'meteor-crash',
        name: 'Meteor Crash',
        damage: 70,
        energyCost: 35,
        cooldown: 5,
        currentCooldown: 0,
        description: 'Devastating falling strike!',
        type: 'super'
      }
    ]
  },
  {
    id: 'shadow-blade',
    name: 'Shadow Blade',
    type: 'hero',
    health: 85,
    maxHealth: 85,
    attack: 35,
    defense: 12,
    energy: 60,
    maxEnergy: 60,
    rarity: 'rare',
    image: '/lovable-uploads/24eb45af-d49f-4513-bd0e-f2ed3cb6a8bf.png',
    abilities: [
      {
        id: 'shadow-cut',
        name: 'Shadow Cut',
        damage: 32,
        energyCost: 0,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Swift shadow attack',
        type: 'attack'
      },
      {
        id: 'stealth',
        name: 'Stealth',
        damage: 0,
        energyCost: 25,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Becomes invisible, next attack deals double damage',
        type: 'special'
      },
      {
        id: 'shadow-storm',
        name: 'Shadow Storm',
        damage: 58,
        energyCost: 30,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Unleashes a whirlwind of shadow blades!',
        type: 'super'
      }
    ]
  },
  {
    id: 'flame-sorceress',
    name: 'Flame Sorceress',
    type: 'hero',
    health: 70,
    maxHealth: 70,
    attack: 40,
    defense: 8,
    energy: 65,
    maxEnergy: 65,
    rarity: 'legendary',
    image: '/lovable-uploads/fca6bd6e-161c-49a9-ae6f-a947f3376f26.png',
    abilities: [
      {
        id: 'fire-orb',
        name: 'Fire Orb',
        damage: 36,
        energyCost: 0,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Burning magical projectile',
        type: 'attack'
      },
      {
        id: 'phoenix-rebirth',
        name: 'Phoenix Rebirth',
        damage: -40,
        energyCost: 30,
        cooldown: 5,
        currentCooldown: 0,
        description: 'Heals 40 HP and increases next attack damage',
        type: 'heal'
      },
      {
        id: 'inferno-wave',
        name: 'Inferno Wave',
        damage: 80,
        energyCost: 40,
        cooldown: 5,
        currentCooldown: 0,
        description: 'Devastating wave of pure fire!',
        type: 'super'
      }
    ]
  },
  {
    id: 'nature-guardian',
    name: 'Nature Guardian',
    type: 'hero',
    health: 100,
    maxHealth: 100,
    attack: 20,
    defense: 20,
    energy: 50,
    maxEnergy: 50,
    rarity: 'uncommon',
    image: '/lovable-uploads/e5cf715e-7d36-4b2a-9d8d-46cdd081b4ef.png',
    abilities: [
      {
        id: 'vine-whip',
        name: 'Vine Whip',
        damage: 22,
        energyCost: 0,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Natural plant attack',
        type: 'attack'
      },
      {
        id: 'regeneration',
        name: 'Regeneration',
        damage: -15,
        energyCost: 15,
        cooldown: 2,
        currentCooldown: 0,
        description: 'Heals 15 HP every turn for 3 turns',
        type: 'heal'
      },
      {
        id: 'forest-fury',
        name: 'Forest Fury',
        damage: 45,
        energyCost: 25,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Summons the power of the forest!',
        type: 'super'
      }
    ]
  },
  {
    id: 'frost-knight',
    name: 'Frost Knight',
    type: 'hero',
    health: 120,
    maxHealth: 120,
    attack: 22,
    defense: 25,
    energy: 35,
    maxEnergy: 35,
    rarity: 'epic',
    image: '/lovable-uploads/e7915244-1e70-4485-970e-fc9da5872d72.png',
    abilities: [
      {
        id: 'frost-sword',
        name: 'Frost Sword',
        damage: 24,
        energyCost: 0,
        cooldown: 0,
        currentCooldown: 0,
        description: 'Icy blade attack that slows enemy',
        type: 'attack'
      },
      {
        id: 'ice-armor',
        name: 'Ice Armor',
        damage: 0,
        energyCost: 18,
        cooldown: 3,
        currentCooldown: 0,
        description: 'Reduces all damage by 75% for 2 turns',
        type: 'defend'
      },
      {
        id: 'blizzard',
        name: 'Blizzard',
        damage: 65,
        energyCost: 32,
        cooldown: 4,
        currentCooldown: 0,
        description: 'Freezing storm that damages and slows!',
        type: 'super'
      }
    ]
  }
];

// Combined array for backward compatibility
export const characters: Character[] = [...heroes, ...monsters];