import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Character } from '@/types/game';
import { heroes, monsters } from '@/data/characters';
import { CharacterCard } from './CharacterCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface GameMenuProps {
  onStartBattle: (playerCharacter: Character, enemyCharacter: Character) => void;
  playerStats: {
    name: string;
    level: number;
    coins: number;
    wins: number;
    losses: number;
  };
}

export const GameMenu = ({ onStartBattle, playerStats }: GameMenuProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleStartBattle = () => {
    if (!selectedCharacter) return;
    
    // Ensure only heroes can be selected as player characters
    if (selectedCharacter.type !== 'hero') {
      return;
    }
    
    // Select a random monster as enemy (heroes only fight monsters)
    const enemyCharacter = monsters[Math.floor(Math.random() * monsters.length)];
    
    onStartBattle(selectedCharacter, enemyCharacter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-secondary/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Heroes vs Monsters
          </h1>
          <p className="text-muted-foreground">Choose your hero to battle monsters!</p>
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

        {/* Hero Selection */}
        <Card className="p-4">
          <h2 className="font-bold mb-4">Choose Your Hero ⚔️</h2>
          <div className="grid grid-cols-2 gap-3">
            {heroes.map((character) => (
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
                {selectedCharacter.image.startsWith('/') ? (
                  <img 
                    src={selectedCharacter.image} 
                    alt={selectedCharacter.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-2xl">{selectedCharacter.image}</span>
                )}
                <div>
                  <div className="font-semibold">{selectedCharacter.name}</div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{selectedCharacter.rarity}</Badge>
                    <Badge className="bg-blue-600 text-white">⚔️ Hero</Badge>
                  </div>
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
            {selectedCharacter ? '⚔️ Battle Monsters!' : 'Select a Hero'}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Link to="/shop">
              <Button variant="outline" className="h-12 w-full">
                🏪 Shop
              </Button>
            </Link>
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