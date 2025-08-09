import { useState, useEffect } from 'react';
import { Character, Ability } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { CharacterCard } from './CharacterCard';
import { AbilityButton } from './AbilityButton';
import { BattleLog } from './BattleLog';
import { Inventory } from './Inventory';
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
  const { playerState, useInventoryItem } = useGame();
  const [player, setPlayer] = useState<Character>(playerCharacter);
  const [enemy, setEnemy] = useState<Character>(enemyCharacter);
  const [currentTurn, setCurrentTurn] = useState<'player' | 'enemy'>('player');
  const [battleLog, setBattleLog] = useState<string[]>([
    `Battle begins! ${playerCharacter.name} (Hero) vs ${enemyCharacter.name} (Monster)!`
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Background music effect - only plays during battle
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    
    const initializeMusic = async () => {
      audio = new Audio('/audio/battle-theme.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      
      try {
        await audio.play();
      } catch (error) {
        console.log('Battle music could not autoplay due to browser restrictions');
      }
    };

    initializeMusic();

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const addToBattleLog = (message: string) => {
    setBattleLog(prev => [...prev, message]);
  };

  const handleUseInventoryItem = (item: any) => {
    if (currentTurn !== 'player' || isProcessing) return;
    
    const updatedPlayer = useInventoryItem(item, player);
    setPlayer(updatedPlayer);
    
    addToBattleLog(`${player.name} uses ${item.name}!`);
    
    // Using an item doesn't end the turn, player can still use abilities
    toast.success(`Used ${item.name}!`);
  };

  const playAttackSound = () => {
    const attackAudio = new Audio('/audio/attack-sound.mp3');
    attackAudio.volume = 0.5;
    attackAudio.play().catch(error => {
      console.log('Attack sound could not play:', error);
    });
    
    // Stop after 3 seconds
    setTimeout(() => {
      attackAudio.pause();
      attackAudio.currentTime = 0;
    }, 3000);
  };

  const useAbility = async (ability: Ability) => {
    if (isProcessing || currentTurn !== 'player') return;
    // Only check energy for 'super', 'heal', and 'defend' types
    if ((ability.type === 'super' || ability.type === 'heal' || ability.type === 'defend') && player.energy < ability.energyCost) {
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
    // Only deduct energy for 'super', 'heal', and 'defend' types
    if (ability.type === 'super' || ability.type === 'heal' || ability.type === 'defend') {
      newPlayer.energy -= ability.energyCost;
    }
    
    if (ability.type === 'attack') {
      playAttackSound();
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
    } else if (ability.type === 'super') {
      playAttackSound();
      const damage = Math.max(1, ability.damage - enemy.defense);
      const newEnemy = { ...enemy };
      newEnemy.health = Math.max(0, newEnemy.health - damage);
      setEnemy(newEnemy);
      addToBattleLog(`${player.name} uses SUPER ATTACK: ${ability.name} for ${damage} damage!`);
      
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
      // Filter abilities based on monster's current health
      let availableAbilities = enemy.abilities.filter(a => enemy.energy >= a.energyCost && a.currentCooldown === 0);
      let healAbilities = availableAbilities.filter(a => a.type === 'heal');
      let nonHealAbilities = availableAbilities.filter(a => a.type !== 'heal');
      let chosenAbility;
      // Only use heal if health is below 60%
      if (healAbilities.length > 0 && enemy.health < enemy.maxHealth * 0.6) {
        // 50% chance to heal if available and low health, otherwise attack
        if (Math.random() < 0.5 && nonHealAbilities.length > 0) {
          chosenAbility = nonHealAbilities[Math.floor(Math.random() * nonHealAbilities.length)];
        } else {
          chosenAbility = healAbilities[Math.floor(Math.random() * healAbilities.length)];
        }
      } else if (nonHealAbilities.length > 0) {
        chosenAbility = nonHealAbilities[Math.floor(Math.random() * nonHealAbilities.length)];
      } else if (healAbilities.length > 0) {
        // If only heal is available, use it
        chosenAbility = healAbilities[Math.floor(Math.random() * healAbilities.length)];
      } else {
        // No abilities available
        addToBattleLog(`${enemy.name} skips turn (no energy or ability on cooldown)`);
        endTurn();
        return;
      }
      const newEnemy = { ...enemy };
      newEnemy.energy -= chosenAbility.energyCost;
      if (chosenAbility.type === 'attack') {
        playAttackSound();
        const damage = Math.max(1, chosenAbility.damage - newPlayer.defense);
        newPlayer.health = Math.max(0, newPlayer.health - damage);
        setPlayer(newPlayer);
        addToBattleLog(`${enemy.name} uses ${chosenAbility.name} for ${damage} damage!`);
        if (newPlayer.health <= 0) {
          addToBattleLog(`${player.name} is defeated! Monster wins!`);
          setTimeout(() => onBattleEnd('enemy'), 1500);
          return;
        }
      } else if (chosenAbility.type === 'heal') {
        const healAmount = Math.abs(chosenAbility.damage);
        newEnemy.health = Math.min(newEnemy.maxHealth, newEnemy.health + healAmount);
        addToBattleLog(`${enemy.name} heals for ${healAmount} HP!`);
      } else if (chosenAbility.type === 'super') {
        playAttackSound();
        const damage = Math.max(1, chosenAbility.damage - newPlayer.defense);
        newPlayer.health = Math.max(0, newPlayer.health - damage);
        setPlayer(newPlayer);
        addToBattleLog(`${enemy.name} uses SUPER ATTACK: ${chosenAbility.name} for ${damage} damage!`);
        if (newPlayer.health <= 0) {
          addToBattleLog(`${player.name} is defeated! Monster wins!`);
          setTimeout(() => onBattleEnd('enemy'), 1500);
          return;
        }
      } else if (chosenAbility.type === 'defend') {
        addToBattleLog(`${enemy.name} takes a defensive stance!`);
      }
      setEnemy(newEnemy);
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

        {/* Main Battle Area - Four columns */}
        <div className="grid grid-cols-4 gap-4 items-start">
          {/* Left Column - Player Hero */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <CharacterCard character={player} size="large" />
            </div>
            
            {/* Player Abilities */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 text-center">Hero Abilities</h3>
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

          {/* Inventory Column */}
          <div className="space-y-4">
            <Inventory
              inventory={playerState.inventory}
              onUseItem={handleUseInventoryItem}
              disabled={isProcessing || currentTurn !== 'player'}
            />
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