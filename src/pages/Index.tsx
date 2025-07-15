import { useState } from 'react';
import { Character } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { GameMenu } from '@/components/game/GameMenu';
import { BattleArena } from '@/components/game/BattleArena';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type GameState = 'menu' | 'battle' | 'victory' | 'defeat';

const Index = () => {
  const { playerState, updatePlayerState, getUpgradedHero } = useGame();
  const [gameState, setGameState] = useState<GameState>('menu');
  const [playerCharacter, setPlayerCharacter] = useState<Character | null>(null);
  const [enemyCharacter, setEnemyCharacter] = useState<Character | null>(null);

  const handleStartBattle = (player: Character, enemy: Character) => {
    // Apply upgrades to the selected hero
    const upgradedPlayer = getUpgradedHero(player);
    
    // Deep clone to avoid mutating the original data
    const clone = (obj: any) => JSON.parse(JSON.stringify(obj));
    setPlayerCharacter(clone(upgradedPlayer));
    setEnemyCharacter(clone(enemy));
    setGameState('battle');
  };

  const handleBattleEnd = (winner: 'player' | 'enemy') => {
    // Update stats based on battle result
    updatePlayerState({
      wins: winner === 'player' ? playerState.wins + 1 : playerState.wins,
      losses: winner === 'enemy' ? playerState.losses + 1 : playerState.losses
    });
    setGameState(winner === 'player' ? 'victory' : 'defeat');
  };

  const handleReturnToMenu = () => {
    setGameState('menu');
    setPlayerCharacter(null);
    setEnemyCharacter(null);
  };

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
