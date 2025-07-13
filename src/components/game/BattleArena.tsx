import { useState } from 'react';
import { Character, Ability } from '@/types/game';
import { CharacterCard } from './CharacterCard';
import { AbilityButton } from './AbilityButton';
import { BattleLog } from './BattleLog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface BattleArenaProps {
  playerCharacter: Character;
  enemyCharacter: Character;
  onBattleEnd: (winner: 'player' | 'enemy') => void;
  onReturnToMenu: () => void;
}

export const BattleArena = ({ 
  playerCharacter, 
  enemyCharacter, 
  onBattleEnd,
  onReturnToMenu 
}: BattleArenaProps) => {
  const [player, setPlayer] = useState<Character>(playerCharacter);
  const [enemy, setEnemy] = useState<Character>(enemyCharacter);
  const [currentTurn, setCurrentTurn] = useState<'player' | 'enemy'>('player');
  const [battleLog, setBattleLog] = useState<string[]>([
    `Battle begins! ${playerCharacter.name} (Hero) vs ${enemyCharacter.name} (Monster)!`
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addToBattleLog = (message: string) => {
    setBattleLog(prev => [...prev, message]);
  };

  const useAbility = async (ability: Ability) => {
    if (isProcessing || currentTurn !== 'player') return;
    if (player.energy < ability.energyCost) {
      toast.error('Not enough energy!');
      return;
    }
    if (ability.currentCooldown > 0) {
      toast.error('Ability is on cooldown!');
      return;
    }

    setIsProcessing(true);

    // Player uses ability
    const newPlayer = { ...player };
    newPlayer.energy -= ability.energyCost;
    
    if (ability.type === 'attack') {
      const damage = Math.max(1, ability.damage - enemy.defense);
      const newEnemy = { ...enemy };
      newEnemy.health = Math.max(0, newEnemy.health - damage);
      setEnemy(newEnemy);
      addToBattleLog(`${player.name} uses ${ability.name} for ${damage} damage!`);
      
      if (newEnemy.health <= 0) {
        addToBattleLog(`${enemy.name} is defeated! Hero wins!`);
        setTimeout(() => onBattleEnd('player'), 1500);
        return;
      }
    } else if (ability.type === 'heal') {
      const healAmount = Math.abs(ability.damage);
      newPlayer.health = Math.min(newPlayer.maxHealth, newPlayer.health + healAmount);
      addToBattleLog(`${player.name} heals for ${healAmount} HP!`);
    } else if (ability.type === 'defend') {
      addToBattleLog(`${player.name} takes a defensive stance!`);
    }

    setPlayer(newPlayer);

    // Enemy AI turn
    setTimeout(() => {
      const enemyAbility = enemy.abilities[Math.floor(Math.random() * enemy.abilities.length)];
      const newEnemy = { ...enemy };
      
      if (newEnemy.energy >= enemyAbility.energyCost && enemyAbility.currentCooldown === 0) {
        newEnemy.energy -= enemyAbility.energyCost;
        
        if (enemyAbility.type === 'attack') {
          const damage = Math.max(1, enemyAbility.damage - newPlayer.defense);
          newPlayer.health = Math.max(0, newPlayer.health - damage);
          setPlayer(newPlayer);
          addToBattleLog(`${enemy.name} uses ${enemyAbility.name} for ${damage} damage!`);
          
          if (newPlayer.health <= 0) {
            addToBattleLog(`${player.name} is defeated! Monster wins!`);
            setTimeout(() => onBattleEnd('enemy'), 1500);
            return;
          }
        } else if (enemyAbility.type === 'heal') {
          const healAmount = Math.abs(enemyAbility.damage);
          newEnemy.health = Math.min(newEnemy.maxHealth, newEnemy.health + healAmount);
          addToBattleLog(`${enemy.name} heals for ${healAmount} HP!`);
        }
        
        setEnemy(newEnemy);
      } else {
        addToBattleLog(`${enemy.name} skips turn (no energy or ability on cooldown)`);
      }
      
      endTurn();
    }, 1000);
  };

  const endTurn = () => {
    // Restore energy and reduce cooldowns
    setPlayer(prev => ({
      ...prev,
      energy: Math.min(prev.maxEnergy, prev.energy + 10),
      abilities: prev.abilities.map(a => ({
        ...a,
        currentCooldown: Math.max(0, a.currentCooldown - 1)
      }))
    }));
    
    setEnemy(prev => ({
      ...prev,
      energy: Math.min(prev.maxEnergy, prev.energy + 10),
      abilities: prev.abilities.map(a => ({
        ...a,
        currentCooldown: Math.max(0, a.currentCooldown - 1)
      }))
    }));

    setCurrentTurn('player');
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Battle Header */}
        <Card className="p-4">
          <div className="text-center space-y-2">
            <h2 className="text-lg font-bold">Hero vs Monster Battle</h2>
            <div className="flex justify-center items-center space-x-4 text-sm">
              <Badge className="bg-blue-600 text-white">⚔️ Hero</Badge>
              <span>vs</span>
              <Badge className="bg-red-600 text-white">👹 Monster</Badge>
            </div>
          </div>
        </Card>

        {/* Main Battle Area - Three columns */}
        <div className="grid grid-cols-3 gap-6 items-start">
          {/* Left Column - Player Hero */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <CharacterCard character={player} size="large" />
            </div>
            
            {/* Player Abilities */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 text-center">Your Hero Abilities</h3>
              <div className="grid grid-cols-1 gap-2">
                {player.abilities.map((ability) => (
                  <AbilityButton
                    key={ability.id}
                    ability={ability}
                    onClick={() => useAbility(ability)}
                    disabled={isProcessing || currentTurn !== 'player' || 
                             player.energy < ability.energyCost || ability.currentCooldown > 0}
                    character={player}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Center Column - Battle Info & Log */}
          <div className="space-y-4">
            {/* Battle Info */}
            <Card className="p-4">
              <div className="text-center space-y-2">
                <h2 className="text-lg font-bold">
                  {currentTurn === 'player' ? 'Your Turn' : 'Enemy Turn'}
                </h2>
                <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                  <span>Round: 1</span>
                  <span>•</span>
                  <span>{currentTurn === 'player' ? '⚔️ Attack!' : '🛡️ Defend!'}</span>
                </div>
              </div>
            </Card>

            {/* Battle Log */}
            <BattleLog messages={battleLog} />
          </div>

          {/* Right Column - Enemy Monster */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <CharacterCard character={enemy} isEnemy size="large" />
            </div>
            
            {/* Enemy Info Display */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 text-center">Enemy Abilities</h3>
              <div className="space-y-2">
                {enemy.abilities.map((ability) => (
                  <div key={ability.id} className="text-sm p-2 bg-muted rounded">
                    <div className="font-medium">{ability.name}</div>
                    <div className="text-xs text-muted-foreground">{ability.description}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Controls */}
        <div className="flex justify-center">
          <Button variant="outline" onClick={onReturnToMenu}>
            Return to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};