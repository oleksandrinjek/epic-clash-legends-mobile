import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  PLAYERS: 'players',
  PLAYER_PROGRESS: 'player_progress',
  PLAYER_INVENTORY: 'player_inventory',
  PLAYER_HEROES: 'player_heroes',
  GAME_SESSIONS: 'game_sessions',
} as const;
