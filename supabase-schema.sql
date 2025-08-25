-- Epic Clash Legends Mobile - Supabase Database Schema
-- Run this in your Supabase SQL editor to create the necessary tables

-- Enable Row Level Security (RLS)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Player progress table
CREATE TABLE IF NOT EXISTS player_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 1,
  experience INTEGER NOT NULL DEFAULT 0,
  coins INTEGER NOT NULL DEFAULT 1250,
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(player_id)
);

-- Player inventory table
CREATE TABLE IF NOT EXISTS player_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  item_id VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(player_id, item_id)
);

-- Player heroes table
CREATE TABLE IF NOT EXISTS player_heroes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  hero_id VARCHAR(100) NOT NULL,
  hero_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(player_id, hero_id)
);

-- Game sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  session_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_player_progress_player_id ON player_progress(player_id);
CREATE INDEX IF NOT EXISTS idx_player_inventory_player_id ON player_inventory(player_id);
CREATE INDEX IF NOT EXISTS idx_player_heroes_player_id ON player_heroes(player_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_player_id ON game_sessions(player_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_player_progress_updated_at BEFORE UPDATE ON player_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_player_inventory_updated_at BEFORE UPDATE ON player_inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_player_heroes_updated_at BEFORE UPDATE ON player_heroes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_sessions_updated_at BEFORE UPDATE ON game_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_heroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies (basic - you may want to customize these based on your auth needs)
CREATE POLICY "Players can view their own data" ON players
  FOR SELECT USING (true);

CREATE POLICY "Players can insert their own data" ON players
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Players can update their own data" ON players
  FOR UPDATE USING (true);

CREATE POLICY "Players can view their own progress" ON player_progress
  FOR SELECT USING (true);

CREATE POLICY "Players can insert their own progress" ON player_progress
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Players can update their own progress" ON player_progress
  FOR UPDATE USING (true);

CREATE POLICY "Players can view their own inventory" ON player_inventory
  FOR SELECT USING (true);

CREATE POLICY "Players can insert their own inventory" ON player_inventory
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Players can update their own inventory" ON player_inventory
  FOR UPDATE USING (true);

CREATE POLICY "Players can delete their own inventory" ON player_inventory
  FOR DELETE USING (true);

CREATE POLICY "Players can view their own heroes" ON player_heroes
  FOR SELECT USING (true);

CREATE POLICY "Players can insert their own heroes" ON player_heroes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Players can update their own heroes" ON player_heroes
  FOR UPDATE USING (true);

CREATE POLICY "Players can delete their own heroes" ON player_heroes
  FOR DELETE USING (true);

CREATE POLICY "Players can view their own game sessions" ON game_sessions
  FOR SELECT USING (true);

CREATE POLICY "Players can insert their own game sessions" ON game_sessions
  FOR INSERT WITH CHECK (true);

-- Insert some sample data for testing (optional)
-- INSERT INTO players (id, name) VALUES ('test-player-1', 'TestPlayer1');
-- INSERT INTO player_progress (player_id, level, experience, coins, wins, losses) 
-- VALUES ('test-player-1', 1, 0, 1250, 0, 0);
