import { useState } from 'react';
import { Character } from '@/types/game';
import { characters } from '@/data/characters';
import { CharacterCard } from './CharacterCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface GameMenuProps {
  onStartBattle: (playerCharacter: Character, enemyCharacter: Character) => void;
}

export const GameMenu = ({ onStartBattle }: GameMenuProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [playerStats] = useState({
    name: 'Player',
    level: 12,
    coins: 1250,
    wins: 23,
    losses: 7
  });

  const handleStartBattle = () => {
    if (!selectedCharacter) return;
    
    // Select a random enemy (excluding the selected character)
    const availableEnemies = characters.filter(c => c.id !== selectedCharacter.id);
    const enemyCharacter = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
    
    onStartBattle(selectedCharacter, enemyCharacter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-secondary/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Epic Clash Legends
          </h1>
          <p className="text-muted-foreground">Mobile Battle Arena</p>
        </div>

        {/* Player Stats */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">{playerStats.name}</h2>
            <Badge variant="secondary">Level {playerStats.level}</Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{playerStats.coins}</div>
              <div className="text-xs text-muted-foreground">Coins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{playerStats.wins}</div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">{playerStats.losses}</div>
              <div className="text-xs text-muted-foreground">Losses</div>
            </div>
          </div>
        </Card>

        {/* Character Selection */}
        <Card className="p-4">
          <h2 className="font-bold mb-4">Choose Your Hero</h2>
          <div className="grid grid-cols-2 gap-3">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                size="medium"
                onClick={() => setSelectedCharacter(character)}
                isSelected={selectedCharacter?.id === character.id}
              />
            ))}
          </div>
        </Card>

        {/* Selected Character Info */}
        {selectedCharacter && (
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Selected Hero</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedCharacter.image}</span>
                <div>
                  <div className="font-semibold">{selectedCharacter.name}</div>
                  <Badge variant="outline">{selectedCharacter.rarity}</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Abilities:</h4>
                {selectedCharacter.abilities.map((ability) => (
                  <div key={ability.id} className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{ability.name}</span>
                      <span className="text-muted-foreground">{ability.energyCost}⚡</span>
                    </div>
                    <div className="text-muted-foreground">{ability.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full h-12 text-lg" 
            onClick={handleStartBattle}
            disabled={!selectedCharacter}
          >
            {selectedCharacter ? '⚔️ Start Battle' : 'Select a Hero'}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              🏪 Shop
            </Button>
            <Button variant="outline" className="h-12">
              📊 Leaderboard
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-4">
          Version 1.0.0 • Made with ❤️
        </div>
      </div>
    </div>
  );
};