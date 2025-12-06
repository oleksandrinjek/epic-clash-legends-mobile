import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Character } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { heroes, monsters } from '@/data/characters';
import { CharacterCard } from './CharacterCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

import { Save, Download, Cloud, Upload, Download as ExportIcon, Settings } from 'lucide-react';
import { ProgressExport } from '@/lib/progress-export';

interface GameMenuProps {
  onStartBattle: (playerCharacter: Character, enemyCharacter: Character) => void;
}

export const GameMenu = ({ onStartBattle }: GameMenuProps) => {
  const { playerState, updatePlayerState, saveProgress, loadProgress, isAuthenticated, levelUpHero } = useGame();
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(playerState.selectedHero?.id || null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derive selectedCharacter from ownedHeroes to keep it in sync
  const selectedCharacter = selectedCharacterId 
    ? playerState.ownedHeroes.find(h => h.id === selectedCharacterId) || null 
    : null;

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
    <div className="h-screen overflow-hidden bg-gradient-to-b from-primary/10 via-background to-secondary/10 p-4 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-4 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Heroes vs Monsters
          </h1>
          <p className="text-muted-foreground">Choose your hero to battle monsters!</p>
        </div>

        {/* Main Horizontal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
          
          {/* Left Column - Player Info & Navigation */}
          <div className="space-y-4 overflow-y-auto min-h-0">
            {/* Player Stats */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg">{playerState.name}</h2>
                <div className="text-right">
                  <Badge variant="secondary">Level {playerState.level}</Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {playerState.experience}/{playerState.level * 100} EXP
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{playerState.coins}</div>
                  <div className="text-xs text-muted-foreground">Coins</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">{playerState.wins}</div>
                  <div className="text-xs text-muted-foreground">Wins</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">{playerState.losses}</div>
                  <div className="text-xs text-muted-foreground">Losses</div>
                </div>
              </div>
            </Card>

            {/* Cloud Save Status */}
            {isAuthenticated && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Cloud Save Active</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        setIsLoading(true);
                        try {
                          await loadProgress();
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                      disabled={isLoading}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {isLoading ? 'Loading...' : 'Load'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        setIsSaving(true);
                        try {
                          await saveProgress();
                        } finally {
                          setIsSaving(false);
                        }
                      }}
                      disabled={isSaving}
                    >
                      <Save className="h-3 w-3 mr-1" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="space-y-3">
              <Link to="/village">
                <Button variant="outline" className="w-full h-14">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e" 
                      alt="Village"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="text-left">
                      <div className="font-bold">🏘️ Village</div>
                      <div className="text-xs text-muted-foreground">Recruit heroes</div>
                    </div>
                  </div>
                </Button>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/shop">
                  <Button variant="outline" className="h-12 w-full">
                    🏪 Shop
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button variant="outline" className="h-12 w-full">
                    📊 Leaderboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Settings Section */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  {showSettings ? 'Hide' : 'Show'}
                </Button>
              </div>
              
              {showSettings && (
                <div className="space-y-3 pt-3 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => ProgressExport.exportProgress(playerState)}
                  >
                    <ExportIcon className="h-4 w-4 mr-2" />
                    Export Progress
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Import Progress
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const result = await ProgressExport.importProgress(file);
                          if (result.success && result.data) {
                            updatePlayerState(result.data);
                            alert('Progress imported successfully!');
                          } else {
                            alert(`Import failed: ${result.error}`);
                          }
                        } catch (error) {
                          alert('Failed to import progress file.');
                        }
                      }
                    }}
                  />
                  <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                    <pre className="whitespace-pre-wrap font-mono text-xs">
                      {ProgressExport.formatProgressData(playerState)}
                    </pre>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Center Column - Hero Selection */}
          <div className="min-h-0 flex flex-col">
            <Card className="p-4 border-2 border-primary/20 flex-1 flex flex-col overflow-hidden">
              <h2 className="font-bold mb-4 text-lg flex items-center gap-2 flex-shrink-0">
                ⚔️ Choose Your Hero
                {selectedCharacter && (
                  <Badge variant="secondary" className="ml-auto">
                    {selectedCharacter.name}
                  </Badge>
                )}
              </h2>
              
              {playerState.ownedHeroes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground flex-1">
                  <div className="text-4xl mb-2">🏰</div>
                  <p className="font-medium">No heroes available</p>
                  <p className="text-sm">Visit the Village to recruit heroes!</p>
                  <Link to="/village" className="mt-3 inline-block">
                    <Button variant="outline" size="sm">
                      Go to Village
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto min-h-0">
                  <div className="grid grid-cols-2 gap-4">
                    {playerState.ownedHeroes.map((character) => (
                      <CharacterCard
                        key={character.id}
                        character={character}
                        size="medium"
                        onClick={() => {
                          setSelectedCharacterId(character.id);
                          updatePlayerState({ selectedHero: character });
                        }}
                        isSelected={selectedCharacter?.id === character.id}
                      />
                    ))}
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded-lg mt-3">
                    <p className="text-xs text-muted-foreground">
                      💡 Click to select
                    </p>
                  </div>
                </div>
              )}

              {/* Battle Button inside hero selection */}
              <div className="flex-shrink-0 pt-4 mt-auto">
                <Button 
                  className="w-full h-14 text-lg" 
                  onClick={handleStartBattle}
                  disabled={!selectedCharacter}
                >
                  {selectedCharacter ? '⚔️ Battle Monsters!' : 'Select a Hero'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Selected Hero & How to Start */}
          <div className="space-y-4">
            {/* Quick Start */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="text-center space-y-2">
                <div className="text-lg">🎯 How to Start</div>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>1. <strong>Select a Hero</strong></p>
                  <p>2. <strong>Review stats</strong></p>
                  <p>3. <strong>Battle!</strong></p>
                </div>
              </div>
            </Card>

            {/* Selected Character Info */}
            {selectedCharacter ? (
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Selected Hero</h3>
                  <Button
                    size="sm"
                    onClick={() => {
                      const currentLevel = selectedCharacter.level || 1;
                      const cost = currentLevel * 100;
                      if (levelUpHero(selectedCharacter.id)) {
                        toast.success(`${selectedCharacter.name} leveled up to level ${currentLevel + 1}!`, {
                          description: `Cost: ${cost} coins`
                        });
                      } else {
                        toast.error(`Need ${cost} coins to level up!`);
                      }
                    }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    ⬆️ Level Up ({(selectedCharacter.level || 1) * 100} 🪙)
                  </Button>
                </div>
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
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">{selectedCharacter.rarity}</Badge>
                        <Badge className="bg-blue-500 text-xs">Lvl {selectedCharacter.level || 1}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 p-3 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Attack</div>
                      <div className="font-bold">{selectedCharacter.attack}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Defense</div>
                      <div className="font-bold">{selectedCharacter.defense}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Health</div>
                      <div className="font-bold">{selectedCharacter.maxHealth}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Energy</div>
                      <div className="font-bold">{selectedCharacter.maxEnergy}</div>
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
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-4 text-center text-muted-foreground">
                <div className="text-4xl mb-2">👆</div>
                <p>Select a hero to see details</p>
              </Card>
            )}
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