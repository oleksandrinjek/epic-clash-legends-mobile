import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Character } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { villageHeroes } from '@/data/characters';
import { CharacterCard } from '@/components/game/CharacterCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Coins } from 'lucide-react';
import { toast } from 'sonner';

const Village = () => {
  const { playerState, updatePlayerState } = useGame();
  const [selectedHero, setSelectedHero] = useState<Character | null>(null);

  // Heroes available for purchase in the village
  const availableHeroes = villageHeroes;

  const getHeroPrice = (hero: Character) => {
    // Price based on rarity
    const rarityPrices = {
      common: 100,
      uncommon: 250,
      rare: 500,
      epic: 1000,
      legendary: 2000
    };
    return rarityPrices[hero.rarity] || 100;
  };

  const handlePurchaseHero = (hero: Character) => {
    const price = getHeroPrice(hero);
    
    if (playerState.coins < price) {
      toast.error("Not enough coins to purchase this hero!");
      return;
    }

    // For now, just deduct coins (you can extend this to add heroes to owned collection)
    updatePlayerState({
      coins: playerState.coins - price
    });

    toast.success(`Successfully purchased ${hero.name} for ${price} coins!`);
  };

  const canAfford = (price: number) => playerState.coins >= price;

  const getRarityColor = (rarity: Character['rarity']) => {
    const colors = {
      common: 'bg-gray-500',
      uncommon: 'bg-green-500',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-yellow-500'
    };
    return colors[rarity];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-secondary/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🏘️ Hero Village
            </h1>
            <p className="text-sm text-muted-foreground">Recruit new heroes for your adventures</p>
          </div>
          <div className="flex items-center space-x-1 bg-yellow-500/20 px-3 py-1 rounded-full">
            <Coins className="h-4 w-4 text-yellow-600" />
            <span className="font-bold text-yellow-700">{playerState.coins}</span>
          </div>
        </div>

        {/* Available Heroes */}
        <Card className="p-4">
          <h2 className="font-bold mb-4">Available Heroes</h2>
          <div className="grid grid-cols-2 gap-3">
            {availableHeroes.map((hero) => (
              <div key={hero.id} className="relative">
                <CharacterCard
                  character={hero}
                  size="medium"
                  onClick={() => setSelectedHero(hero)}
                  isSelected={selectedHero?.id === hero.id}
                />
                <div className="absolute top-2 right-2">
                  <Badge className={`text-white text-xs ${getRarityColor(hero.rarity)}`}>
                    {hero.rarity}
                  </Badge>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold">
                  {getHeroPrice(hero)} 🪙
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Selected Hero Details */}
        {selectedHero && (
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Hero Details</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                {selectedHero.image.startsWith('/') ? (
                  <img 
                    src={selectedHero.image} 
                    alt={selectedHero.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-2xl">{selectedHero.image}</span>
                )}
                <div>
                  <div className="font-semibold">{selectedHero.name}</div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{selectedHero.rarity}</Badge>
                    <Badge className="bg-blue-600 text-white">⚔️ Hero</Badge>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Attack</div>
                  <div className="font-bold text-lg">{selectedHero.attack}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Defense</div>
                  <div className="font-bold text-lg">{selectedHero.defense}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Health</div>
                  <div className="font-bold text-lg">{selectedHero.maxHealth}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Energy</div>
                  <div className="font-bold text-lg">{selectedHero.maxEnergy}</div>
                </div>
              </div>

              {/* Abilities */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Abilities:</h4>
                {selectedHero.abilities.map((ability) => (
                  <div key={ability.id} className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{ability.name}</span>
                      <span className="text-muted-foreground">{ability.energyCost}⚡</span>
                    </div>
                    <div className="text-muted-foreground">{ability.description}</div>
                  </div>
                ))}
              </div>

              {/* Purchase Button */}
              <Button 
                className="w-full" 
                onClick={() => handlePurchaseHero(selectedHero)}
                disabled={!canAfford(getHeroPrice(selectedHero))}
              >
                {canAfford(getHeroPrice(selectedHero)) 
                  ? `Purchase for ${getHeroPrice(selectedHero)} coins` 
                  : 'Not enough coins'
                }
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Village;