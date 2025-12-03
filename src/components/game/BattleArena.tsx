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
  const [activeAbilityId, setActiveAbilityId] = useState<string | null>(null);
  const [damageDisplay, setDamageDisplay] = useState<{ target: 'player' | 'enemy', value: number, type: 'damage' | 'heal' } | null>(null);

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
    setActiveAbilityId(ability.id);

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
      setDamageDisplay({ target: 'enemy', value: damage, type: 'damage' });
      setTimeout(() => setDamageDisplay(null), 1500);
      addToBattleLog(`${player.name} uses ${ability.name} for ${damage} damage!`);
      
      if (newEnemy.health <= 0) {
        addToBattleLog(`${enemy.name} is defeated! Hero wins!`);
        setTimeout(() => {
          setActiveAbilityId(null);
          onBattleEnd('player');
        }, 1500);
        return;
      }
    } else if (ability.type === 'super') {
      const damage = Math.max(1, ability.damage - enemy.defense);
      const newEnemy = { ...enemy };
      newEnemy.health = Math.max(0, newEnemy.health - damage);
      setEnemy(newEnemy);
      setDamageDisplay({ target: 'enemy', value: damage, type: 'damage' });
      setTimeout(() => setDamageDisplay(null), 1500);
      addToBattleLog(`${player.name} uses SUPER ATTACK: ${ability.name} for ${damage} damage!`);
      
      if (newEnemy.health <= 0) {
        addToBattleLog(`${enemy.name} is defeated! Hero wins!`);
        setTimeout(() => {
          setActiveAbilityId(null);
          onBattleEnd('player');
        }, 1500);
        return;
      }
    } else if (ability.type === 'heal') {
      const healAmount = Math.abs(ability.damage);
      newPlayer.health = Math.min(newPlayer.maxHealth, newPlayer.health + healAmount);
      setDamageDisplay({ target: 'player', value: healAmount, type: 'heal' });
      setTimeout(() => setDamageDisplay(null), 1500);
      addToBattleLog(`${player.name} heals for ${healAmount} HP!`);
    } else if (ability.type === 'defend') {
      addToBattleLog(`${player.name} takes a defensive stance!`);
    }

    setPlayer(newPlayer);
    
    setTimeout(() => setActiveAbilityId(null), 800);

    // Enemy AI turn
    setTimeout(() => {
      const currentEnemy = { ...enemy };
      
      // Filter abilities based on energy and cooldown
      // For 'attack' type, no energy is required (same logic as player)
      const availableAbilities = currentEnemy.abilities.filter(
        a => {
          // Attack type abilities don't require energy
          if (a.type === 'attack') return a.currentCooldown === 0;
          // Other types (super, heal, defend) require energy
          return currentEnemy.energy >= a.energyCost && a.currentCooldown === 0;
        }
      );
      
      if (availableAbilities.length === 0) {
        addToBattleLog(`${currentEnemy.name} skips turn (no energy or abilities on cooldown)`);
        endTurn();
        return;
      }
      
      // Monsters cannot heal - only use attack/super/defend abilities
      const combatAbilities = availableAbilities.filter(a => a.type !== 'heal');
      
      if (combatAbilities.length === 0) {
        addToBattleLog(`${currentEnemy.name} skips turn (no combat abilities available)`);
        endTurn();
        return;
      }
      
      // Prefer attack abilities
      const attackAbilities = combatAbilities.filter(a => a.type === 'attack' || a.type === 'super');
      
      let chosenAbility: Ability;
      if (attackAbilities.length > 0) {
        chosenAbility = attackAbilities[Math.floor(Math.random() * attackAbilities.length)];
      } else {
        chosenAbility = combatAbilities[Math.floor(Math.random() * combatAbilities.length)];
      }
      
      // Deduct energy (only for super, heal, defend types, not for regular attack)
      if (chosenAbility.type === 'super' || chosenAbility.type === 'heal' || chosenAbility.type === 'defend') {
        currentEnemy.energy -= chosenAbility.energyCost;
      }
      
      // Execute the chosen ability (only ONE action per turn)
      if (chosenAbility.type === 'heal') {
        const healAmount = Math.abs(chosenAbility.damage);
        currentEnemy.health = Math.min(currentEnemy.maxHealth, currentEnemy.health + healAmount);
        setDamageDisplay({ target: 'enemy', value: healAmount, type: 'heal' });
        setTimeout(() => setDamageDisplay(null), 1500);
        addToBattleLog(`${currentEnemy.name} uses ${chosenAbility.name} and heals for ${healAmount} HP!`);
        setEnemy(currentEnemy);
      } else if (chosenAbility.type === 'attack' || chosenAbility.type === 'super') {
        playAttackSound();
        const damage = Math.max(1, chosenAbility.damage - newPlayer.defense);
        newPlayer.health = Math.max(0, newPlayer.health - damage);
        setDamageDisplay({ target: 'player', value: damage, type: 'damage' });
        setTimeout(() => setDamageDisplay(null), 1500);
        
        const attackType = chosenAbility.type === 'super' ? 'SUPER ATTACK' : 'attack';
        addToBattleLog(`${currentEnemy.name} uses ${attackType}: ${chosenAbility.name} for ${damage} damage!`);
        
        setPlayer(newPlayer);
        setEnemy(currentEnemy);
        
        if (newPlayer.health <= 0) {
          addToBattleLog(`${player.name} is defeated! Monster wins!`);
          setTimeout(() => onBattleEnd('enemy'), 1500);
          return;
        }
      } else if (chosenAbility.type === 'defend') {
        addToBattleLog(`${currentEnemy.name} takes a defensive stance using ${chosenAbility.name}!`);
        setEnemy(currentEnemy);
      } else {
        // Special or other ability types
        addToBattleLog(`${currentEnemy.name} uses ${chosenAbility.name}!`);
        setEnemy(currentEnemy);
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

        {/* Main Battle Area - Four columns */}
        <div className="grid grid-cols-4 gap-4 items-stretch">
          {/* Left Column - Player Hero */}
          <div className="space-y-4 w-full flex flex-col">
            <div className="flex justify-center relative">
              <CharacterCard character={player} size="large" />
              {damageDisplay?.target === 'player' && (
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 text-3xl font-bold animate-fade-in ${
                  damageDisplay.type === 'damage' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {damageDisplay.type === 'damage' ? '-' : '+'}{damageDisplay.value}
                </div>
              )}
            </div>
            
            {/* Player Abilities */}
            <Card className="p-4 flex-1 flex flex-col">
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
                    isActive={activeAbilityId === ability.id}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Inventory Column */}
          <div className="space-y-4 w-full flex flex-col">
            <Inventory
              inventory={playerState.inventory}
              onUseItem={handleUseInventoryItem}
              disabled={isProcessing || currentTurn !== 'player'}
            />
          </div>

          {/* Center Column - Battle Info & Log */}
          <div className="space-y-4 w-full flex flex-col">
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
          <div className="space-y-4 w-full flex flex-col">
            <div className="flex justify-center relative">
              <CharacterCard character={enemy} isEnemy size="large" />
              {damageDisplay?.target === 'enemy' && (
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 text-3xl font-bold animate-fade-in ${
                  damageDisplay.type === 'damage' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {damageDisplay.type === 'damage' ? '-' : '+'}{damageDisplay.value}
                </div>
              )}
            </div>
            
            {/* Enemy Info Display */}
            <Card className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold mb-3 text-center">Enemy Abilities</h3>
              <div className="space-y-2">
                {enemy.abilities.map((ability) => (
                  <div key={ability.id} className="text-sm p-3 bg-muted rounded border border-border">
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium">{ability.name}</div>
                      <Badge variant="outline" className="ml-2">
                        {ability.type === 'attack' || ability.type === 'super' ? `⚔️ ${ability.damage}` : ability.type === 'heal' ? `💚 ${Math.abs(ability.damage)}` : '🛡️'}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{ability.description}</div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">
                        {ability.type === 'attack' ? 'Free' : `⚡ ${ability.energyCost}`}
                      </span>
                      {ability.cooldown > 0 && (
                        <span className="text-muted-foreground">CD: {ability.cooldown}</span>
                      )}
                    </div>
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