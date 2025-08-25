import { supabase, TABLES } from './supabase';
import { Character, ShopItem, InventoryItem } from '@/types/game';

// Player types for database
export interface PlayerRecord {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PlayerProgressRecord {
  id: string;
  player_id: string;
  level: number;
  experience: number;
  coins: number;
  wins: number;
  losses: number;
  created_at: string;
  updated_at: string;
}

export interface PlayerInventoryRecord {
  id: string;
  player_id: string;
  item_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface PlayerHeroRecord {
  id: string;
  player_id: string;
  hero_id: string;
  hero_data: Character;
  created_at: string;
  updated_at: string;
}

export interface GameSessionRecord {
  id: string;
  player_id: string;
  session_data: any;
  created_at: string;
  updated_at: string;
}

export class DatabaseService {
  // Player management
  static async createPlayer(playerId: string, name: string): Promise<PlayerRecord | null> {
    const { data, error } = await supabase
      .from(TABLES.PLAYERS)
      .insert({
        id: playerId,
        name: name,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating player:', error);
      return null;
    }

    return data;
  }

  static async getPlayer(playerId: string): Promise<PlayerRecord | null> {
    const { data, error } = await supabase
      .from(TABLES.PLAYERS)
      .select('*')
      .eq('id', playerId)
      .single();

    if (error) {
      console.error('Error fetching player:', error);
      return null;
    }

    return data;
  }

  // Progress management
  static async createPlayerProgress(
    playerId: string,
    progress: Omit<PlayerProgressRecord, 'id' | 'player_id' | 'created_at' | 'updated_at'>
  ): Promise<PlayerProgressRecord | null> {
    const { data, error } = await supabase
      .from(TABLES.PLAYER_PROGRESS)
      .insert({
        player_id: playerId,
        ...progress,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating player progress:', error);
      return null;
    }

    return data;
  }

  static async updatePlayerProgress(
    playerId: string,
    progress: Partial<Omit<PlayerProgressRecord, 'id' | 'player_id' | 'created_at' | 'updated_at'>>
  ): Promise<PlayerProgressRecord | null> {
    const { data, error } = await supabase
      .from(TABLES.PLAYER_PROGRESS)
      .update({
        ...progress,
        updated_at: new Date().toISOString(),
      })
      .eq('player_id', playerId)
      .select()
      .single();

    if (error) {
      console.error('Error updating player progress:', error);
      return null;
    }

    return data;
  }

  static async getPlayerProgress(playerId: string): Promise<PlayerProgressRecord | null> {
    const { data, error } = await supabase
      .from(TABLES.PLAYER_PROGRESS)
      .select('*')
      .eq('player_id', playerId)
      .single();

    if (error) {
      console.error('Error fetching player progress:', error);
      return null;
    }

    return data;
  }

  // Inventory management
  static async getPlayerInventory(playerId: string): Promise<PlayerInventoryRecord[]> {
    const { data, error } = await supabase
      .from(TABLES.PLAYER_INVENTORY)
      .select('*')
      .eq('player_id', playerId);

    if (error) {
      console.error('Error fetching player inventory:', error);
      return [];
    }

    return data || [];
  }

  static async updateInventoryItem(
    playerId: string,
    itemId: string,
    quantity: number
  ): Promise<PlayerInventoryRecord | null> {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      const { error } = await supabase
        .from(TABLES.PLAYER_INVENTORY)
        .delete()
        .eq('player_id', playerId)
        .eq('item_id', itemId);

      if (error) {
        console.error('Error removing inventory item:', error);
      }
      return null;
    }

    // Check if item exists
    const existingItem = await this.getInventoryItem(playerId, itemId);

    if (existingItem) {
      // Update existing item
      const { data, error } = await supabase
        .from(TABLES.PLAYER_INVENTORY)
        .update({
          quantity,
          updated_at: new Date().toISOString(),
        })
        .eq('player_id', playerId)
        .eq('item_id', itemId)
        .select()
        .single();

      if (error) {
        console.error('Error updating inventory item:', error);
        return null;
      }

      return data;
    } else {
      // Create new item
      const { data, error } = await supabase
        .from(TABLES.PLAYER_INVENTORY)
        .insert({
          player_id: playerId,
          item_id: itemId,
          quantity,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating inventory item:', error);
        return null;
      }

      return data;
    }
  }

  static async getInventoryItem(
    playerId: string,
    itemId: string
  ): Promise<PlayerInventoryRecord | null> {
    const { data, error } = await supabase
      .from(TABLES.PLAYER_INVENTORY)
      .select('*')
      .eq('player_id', playerId)
      .eq('item_id', itemId)
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  // Hero management
  static async getPlayerHeroes(playerId: string): Promise<PlayerHeroRecord[]> {
    const { data, error } = await supabase
      .from(TABLES.PLAYER_HEROES)
      .select('*')
      .eq('player_id', playerId);

    if (error) {
      console.error('Error fetching player heroes:', error);
      return [];
    }

    return data || [];
  }

  static async addPlayerHero(
    playerId: string,
    hero: Character
  ): Promise<PlayerHeroRecord | null> {
    const { data, error } = await supabase
      .from(TABLES.PLAYER_HEROES)
      .insert({
        player_id: playerId,
        hero_id: hero.id,
        hero_data: hero,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding player hero:', error);
      return null;
    }

    return data;
  }

  // Game session management
  static async saveGameSession(
    playerId: string,
    sessionData: any
  ): Promise<GameSessionRecord | null> {
    const { data, error } = await supabase
      .from(TABLES.GAME_SESSIONS)
      .insert({
        player_id: playerId,
        session_data: sessionData,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving game session:', error);
      return null;
    }

    return data;
  }

  // Bulk operations
  static async savePlayerState(
    playerId: string,
    playerState: {
      name: string;
      level: number;
      experience: number;
      coins: number;
      wins: number;
      losses: number;
      inventory: InventoryItem[];
      ownedHeroes: Character[];
    }
  ): Promise<boolean> {
    try {
      // Update or create player
      await this.createPlayer(playerId, playerState.name);

      // Update progress
      await this.updatePlayerProgress(playerId, {
        level: playerState.level,
        experience: playerState.experience,
        coins: playerState.coins,
        wins: playerState.wins,
        losses: playerState.losses,
      });

      // Update inventory
      for (const item of playerState.inventory) {
        await this.updateInventoryItem(playerId, item.id, item.quantity);
      }

      // Update heroes
      // First, remove all existing heroes
      const existingHeroes = await this.getPlayerHeroes(playerId);
      for (const hero of existingHeroes) {
        await supabase
          .from(TABLES.PLAYER_HEROES)
          .delete()
          .eq('id', hero.id);
      }

      // Add current heroes
      for (const hero of playerState.ownedHeroes) {
        await this.addPlayerHero(playerId, hero);
      }

      return true;
    } catch (error) {
      console.error('Error saving player state:', error);
      return false;
    }
  }

  static async loadPlayerState(playerId: string): Promise<{
    name: string;
    level: number;
    experience: number;
    coins: number;
    wins: number;
    losses: number;
    inventory: InventoryItem[];
    ownedHeroes: Character[];
  } | null> {
    try {
      const [player, progress, inventory, heroes] = await Promise.all([
        this.getPlayer(playerId),
        this.getPlayerProgress(playerId),
        this.getPlayerInventory(playerId),
        this.getPlayerHeroes(playerId),
      ]);

      if (!player || !progress) {
        return null;
      }

      // Convert inventory records to InventoryItem format
      const inventoryItems: InventoryItem[] = inventory.map(record => ({
        id: record.item_id,
        inventoryId: record.id,
        quantity: record.quantity,
        // You'll need to fetch the full item data from your shop items
        // For now, we'll use placeholder data
        name: 'Item',
        type: 'potion',
        price: 0,
        description: '',
        image: '',
        effect: { stat: 'health', value: 0 },
        rarity: 'common',
      }));

      // Convert hero records to Character format
      const ownedHeroes: Character[] = heroes.map(record => record.hero_data);

      return {
        name: player.name,
        level: progress.level,
        experience: progress.experience,
        coins: progress.coins,
        wins: progress.wins,
        losses: progress.losses,
        inventory: inventoryItems,
        ownedHeroes,
      };
    } catch (error) {
      console.error('Error loading player state:', error);
      return null;
    }
  }
}
