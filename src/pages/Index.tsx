import { useState, useEffect } from 'react';
import { Character } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { GameMenu } from '@/components/game/GameMenu';
import { BattleArena } from '@/components/game/BattleArena';
import { PlayerNameForm } from '@/components/game/PlayerNameForm';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { monsters } from '@/data/characters';

type GameState = 'menu' | 'battle' | 'victory' | 'defeat';

const Index = () => {
  const { playerState, updatePlayerState, gainExperience } = useGame();
  const location = useLocation();
  const [gameState, setGameState] = useState<GameState>('menu');
  const [playerCharacter, setPlayerCharacter] = useState<Character | null>(null);
  const [enemyCharacter, setEnemyCharacter] = useState<Character | null>(null);

  const handleStartBattle = (player: Character, enemy: Character) => {
    // Use the hero as-is, no automatic upgrades
    // Items will be used from inventory during battle
    
    // Deep clone to avoid mutating the original data
    const clone = (obj: any) => JSON.parse(JSON.stringify(obj));
    setPlayerCharacter(clone(player));
    setEnemyCharacter(clone(enemy));
    setGameState('battle');
  };

  const handleBattleEnd = (winner: 'player' | 'enemy') => {
    // Calculate rewards based on enemy rarity
    let coinsEarned = 0;
    let expGained = 0;
    
    if (winner === 'player' && enemyCharacter) {
      const rarityRewards = {
        common: { coins: 25, exp: 15 },
        uncommon: { coins: 50, exp: 30 },
        rare: { coins: 100, exp: 60 },
        epic: { coins: 200, exp: 120 },
        legendary: { coins: 500, exp: 300 }
      };
      
      const rewards = rarityRewards[enemyCharacter.rarity] || rarityRewards.common;
      coinsEarned = rewards.coins;
      expGained = rewards.exp;
    }
    
    // Update stats based on battle result
    const newState = {
      wins: winner === 'player' ? playerState.wins + 1 : playerState.wins,
      losses: winner === 'enemy' ? playerState.losses + 1 : playerState.losses,
      coins: winner === 'player' ? playerState.coins + coinsEarned : playerState.coins
    };
    
    updatePlayerState(newState);
    
    if (winner === 'player') {
      gainExperience(expGained);
      toast.success(`Victory! You earned ${coinsEarned} coins and ${expGained} experience!`, {
        description: enemyCharacter ? `Defeated ${enemyCharacter.rarity} enemy: ${enemyCharacter.name}` : undefined
      });
    }
    
    setGameState(winner === 'player' ? 'victory' : 'defeat');
  };

  const handleReturnToMenu = () => {
    setGameState('menu');
    setPlayerCharacter(null);
    setEnemyCharacter(null);
  };

  // Auto-start battle if coming from village with battle flag
  useEffect(() => {
    const locationState = location.state as any;
    if (locationState?.startBattle && playerState.selectedHero) {
      // Clear the location state to prevent repeated battles
      window.history.replaceState({}, document.title);
      
      // Start battle with selected hero
      const enemyCharacter = monsters[Math.floor(Math.random() * monsters.length)];
      handleStartBattle(playerState.selectedHero, enemyCharacter);
    }
  }, [location.state]);

  // Show name form if player hasn't set their name yet
  if (playerState.name === 'Player') {
    return <PlayerNameForm />;
  }

  if (gameState === 'menu') {
    return <GameMenu onStartBattle={handleStartBattle} />;
  }

  if (gameState === 'battle' && playerCharacter && enemyCharacter) {
    return (
      <BattleArena
        playerCharacter={playerCharacter}
        enemyCharacter={enemyCharacter}
        onBattleEnd={handleBattleEnd}
        onReturnToMenu={handleReturnToMenu}
      />
    );
  }

  if (gameState === 'victory' || gameState === 'defeat') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
        <Card className="max-w-sm w-full p-8 text-center space-y-4">
          <div className="text-6xl">
            {gameState === 'victory' ? '🎉' : '💀'}
          </div>
          <h1 className="text-2xl font-bold">
            {gameState === 'victory' ? 'Victory!' : 'Defeat!'}
          </h1>
          <p className="text-muted-foreground">
            {gameState === 'victory' 
              ? 'Congratulations! You emerged victorious!' 
              : 'Better luck next time, hero!'
            }
          </p>
          <div className="space-y-2">
            <Button className="w-full" onClick={handleReturnToMenu}>
              Return to Menu
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => playerCharacter && enemyCharacter && setGameState('battle')}
            >
              Battle Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return <GameMenu onStartBattle={handleStartBattle} />;
};

export default Index;
