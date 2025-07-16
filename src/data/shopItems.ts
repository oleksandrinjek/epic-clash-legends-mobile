import { ShopItem } from '@/types/game';

export const shopItems: ShopItem[] = [
  {
    id: 'flame-sword',
    name: 'Flame Sword',
    type: 'weapon',
    price: 350,
    description: 'A legendary sword imbued with fire magic. Increases attack power significantly.',
    image: '🔥⚔️',
    effect: {
      stat: 'attack',
      value: 10
    },
    rarity: 'legendary'
  },
  {
    id: 'ice-crystal',
    name: 'Ice Crystal',
    type: 'weapon',
    price: 200,
    description: 'A magical ice crystal that enhances magical attacks and provides frost damage.',
    image: '❄️💎',
    effect: {
      stat: 'attack',
      value: 7
    },
    rarity: 'epic'
  },
  {
    id: 'shadow-cloak',
    name: 'Shadow Cloak',
    type: 'armor',
    price: 275,
    description: 'A mystical cloak that provides protection and enhances stealth abilities.',
    image: '🌙🥷',
    effect: {
      stat: 'defense',
      value: 8
    },
    rarity: 'epic'
  },
  {
    id: 'earth-shield',
    name: 'Earth Shield',
    type: 'armor',
    price: 180,
    description: 'A sturdy shield made from ancient earth magic. Provides solid defense.',
    image: '🛡️🪨',
    effect: {
      stat: 'defense',
      value: 6
    },
    rarity: 'rare'
  },
  {
    id: 'healing-potion',
    name: 'Greater Healing Potion',
    type: 'potion',
    price: 100,
    description: 'A powerful potion that restores health during battle.',
    image: '🧪❤️',
    effect: {
      stat: 'health',
      value: 50
    },
    rarity: 'rare',
    usableInBattle: true
  },
  {
    id: 'energy-elixir',
    name: 'Energy Elixir',
    type: 'potion',
    price: 120,
    description: 'A mystical elixir that restores energy during battle.',
    image: '⚡🧪',
    effect: {
      stat: 'energy',
      value: 30
    },
    rarity: 'rare',
    usableInBattle: true
  },
  {
    id: 'power-ring',
    name: 'Ring of Power',
    type: 'accessory',
    price: 300,
    description: 'An ancient ring that amplifies the wearer\'s combat prowess.',
    image: '💍✨',
    effect: {
      stat: 'attack',
      value: 8
    },
    rarity: 'epic'
  },
  {
    id: 'guardian-amulet',
    name: 'Guardian Amulet',
    type: 'accessory',
    price: 250,
    description: 'A protective amulet that shields the wearer from harm.',
    image: '🔮🛡️',
    effect: {
      stat: 'defense',
      value: 7
    },
    rarity: 'epic'
  },
  {
    id: 'iron-sword',
    name: 'Iron Sword',
    type: 'weapon',
    price: 80,
    description: 'A reliable iron sword for beginning warriors.',
    image: '⚔️',
    effect: {
      stat: 'attack',
      value: 3
    },
    rarity: 'common'
  },
  {
    id: 'leather-armor',
    name: 'Leather Armor',
    type: 'armor',
    price: 60,
    description: 'Basic leather armor that provides minimal protection.',
    image: '🦺',
    effect: {
      stat: 'defense',
      value: 2
    },
    rarity: 'common'
  }
];