import { useState, useEffect, useCallback } from 'react';
import { DatabaseService } from '@/lib/database';
import { useToast } from '@/hooks/use-toast';

export interface PlayerState {
  name: string;
  level: number;
  experience: number;
  coins: number;
  wins: number;
  losses: number;
  inventory: any[];
  ownedHeroes: any[];
}

export function usePlayerPersistence() {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Generate a simple player ID (in a real app, you'd use proper auth)
  const generatePlayerId = useCallback(() => {
    const storedId = localStorage.getItem('epic-clash-player-id');
    if (storedId) {
      return storedId;
    }
    
    const newId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('epic-clash-player-id', newId);
    return newId;
  }, []);

  // Initialize player
  const initializePlayer = useCallback(async (name: string) => {
    setIsLoading(true);
    try {
      const id = generatePlayerId();
      setPlayerId(id);
      
      // Check if player exists in database
      const existingPlayer = await DatabaseService.getPlayer(id);
      
      if (!existingPlayer) {
        // Create new player
        await DatabaseService.createPlayer(id, name);
        await DatabaseService.createPlayerProgress(id, {
          level: 1,
          experience: 0,
          coins: 1250,
          wins: 0,
          losses: 0,
        });
        
        toast({
          title: "Welcome!",
          description: "New player profile created successfully.",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Your progress has been loaded.",
        });
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error initializing player:', error);
      toast({
        title: "Error",
        description: "Failed to initialize player. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [generatePlayerId, toast]);

  // Load player state
  const loadPlayerState = useCallback(async (): Promise<PlayerState | null> => {
    if (!playerId) return null;
    
    setIsLoading(true);
    try {
      const state = await DatabaseService.loadPlayerState(playerId);
      return state;
    } catch (error) {
      console.error('Error loading player state:', error);
      toast({
        title: "Error",
        description: "Failed to load your progress. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [playerId, toast]);

  // Save player state
  const savePlayerState = useCallback(async (state: PlayerState): Promise<boolean> => {
    if (!playerId) return false;
    
    try {
      const success = await DatabaseService.savePlayerState(playerId, state);
      if (success) {
        toast({
          title: "Progress Saved",
          description: "Your game progress has been saved successfully.",
        });
      }
      return success;
    } catch (error) {
      console.error('Error saving player state:', error);
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }, [playerId, toast]);

  // Auto-save functionality
  const autoSave = useCallback(async (state: PlayerState) => {
    if (!playerId) return;
    
    try {
      await DatabaseService.savePlayerState(playerId, state);
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [playerId]);

  // Save game session
  const saveGameSession = useCallback(async (sessionData: any): Promise<boolean> => {
    if (!playerId) return false;
    
    try {
      const success = await DatabaseService.saveGameSession(playerId, sessionData);
      return !!success;
    } catch (error) {
      console.error('Error saving game session:', error);
      return false;
    }
  }, [playerId]);

  // Initialize on mount
  useEffect(() => {
    const storedId = localStorage.getItem('epic-clash-player-id');
    if (storedId) {
      setPlayerId(storedId);
      setIsAuthenticated(true);
    }
  }, []);

  return {
    playerId,
    isLoading,
    isAuthenticated,
    initializePlayer,
    loadPlayerState,
    savePlayerState,
    autoSave,
    saveGameSession,
  };
}
