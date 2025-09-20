import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Character } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { villageHeroes, monsters } from '@/data/characters';
import { CharacterCard } from '@/components/game/CharacterCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Coins, Swords } from 'lucide-react';
import { toast } from 'sonner';

const Village = () => {
  const { playerState, updatePlayerState, recruitHero } = useGame();
  const navigate = useNavigate();
  const [selectedHero, setSelectedHero] = useState<Character | null>(null);
  const [showVillageDetails, setShowVillageDetails] = useState(false);
  const [showHeroSelection, setShowHeroSelection] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [avatarBorderColor, setAvatarBorderColor] = useState('border-amber-400');

  const colorOptions = [
    { name: 'Amber', class: 'border-amber-400', color: '#fbbf24' },
    { name: 'Red', class: 'border-red-400', color: '#f87171' },
    { name: 'Blue', class: 'border-blue-400', color: '#60a5fa' },
    { name: 'Green', class: 'border-green-400', color: '#4ade80' },
    { name: 'Purple', class: 'border-purple-400', color: '#a78bfa' },
    { name: 'Pink', class: 'border-pink-400', color: '#f472b6' },
    { name: 'Cyan', class: 'border-cyan-400', color: '#22d3ee' },
    { name: 'Orange', class: 'border-orange-400', color: '#fb923c' },
  ];

  // Helper function to check if hero is owned
  const isHeroOwned = (hero: Character) => {
    return playerState.ownedHeroes.find(ownedHero => ownedHero.id === hero.id) !== undefined;
  };

  // Heroes available for purchase in the village (filter out owned heroes)
  const availableHeroes = villageHeroes.filter(hero => !isHeroOwned(hero));

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
    
    // Check if hero is already owned
    const alreadyOwned = playerState.ownedHeroes.find(ownedHero => ownedHero.id === hero.id);
    if (alreadyOwned) {
      toast.error("You already own this hero!");
      return;
    }
    
    if (recruitHero(hero, price)) {
      toast.success(`Successfully recruited ${hero.name} for ${price} coins!`);
      // Clear selection since hero is no longer available
      setSelectedHero(null);
    } else {
      toast.error("Not enough coins to recruit this hero!");
    }
  };

  const handleStartBattle = () => {
    if (!playerState.selectedHero) {
      toast.error("Please select a hero first!");
      return;
    }
    
    // Navigate to main page with battle state
    navigate('/', { state: { startBattle: true } });
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

  // Background music effect - only plays on village page
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    
    const initializeMusic = async () => {
      audio = new Audio('/audio/village-theme.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      
      try {
        await audio.play();
      } catch (error) {
        // Handle autoplay restrictions
        console.log('Autoplay prevented, user interaction required');
        
        // Add click listener to start music on first interaction
        const handleFirstInteraction = async () => {
          if (audio) {
            await audio.play();
            document.removeEventListener('click', handleFirstInteraction);
          }
        };
        document.addEventListener('click', handleFirstInteraction);
      }
    };

    initializeMusic();

    // Cleanup function - stops music when leaving village page
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio = null;
      }
    };
  }, []);

  if (!showVillageDetails) {
    // Village Overview - Show the uploaded image with clickable central building
    return (
      <div className="relative flex justify-center items-start">
        {/* Village Background Image */}
        <img 
          src="/lovable-uploads/3fcfc7b7-b1e7-4a6b-9768-25ed5e80443f.png"
          alt="Village"
          className="w-full h-auto"
        />
        
        {/* Selected Hero positioned in top left corner */}
        {playerState.selectedHero && (
          <Dialog open={showHeroSelection} onOpenChange={setShowHeroSelection}>
            <DialogTrigger asChild>
              <div className="absolute top-4 left-4 z-10 cursor-pointer hover:scale-105 transition-transform">
                <img 
                  src={playerState.selectedHero.image} 
                  alt={playerState.selectedHero.name}
                  className={`w-40 h-40 rounded-full object-cover border-[8px] ${avatarBorderColor} shadow-lg`}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">Choose Your Hero ⚔️</DialogTitle>
              </DialogHeader>
              
              {/* Avatar Preview and Color Palette Row */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex gap-6 items-center">
                  {/* Avatar Preview - Left Side */}
                  <div className="flex-shrink-0">
                    <div className="text-sm font-semibold mb-3 text-gray-700 text-center">
                      Current Avatar Preview:
                    </div>
                    <div className="flex justify-center">
                      <img 
                        src={playerState.selectedHero.image} 
                        alt={playerState.selectedHero.name}
                        className={`w-20 h-20 rounded-full object-cover border-[5px] ${avatarBorderColor} shadow-lg`}
                      />
                    </div>
                  </div>

                  {/* Color Palette - Right Side */}
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-3 text-gray-700 flex items-center gap-2">
                      🎨 Avatar Border Color:
                    </div>
                    <div className="grid grid-cols-8 gap-2">
                      {colorOptions.map((colorOption) => (
                        <button
                          key={colorOption.name}
                          onClick={() => {
                            setAvatarBorderColor(colorOption.class);
                            toast.success(`Border color changed to ${colorOption.name}!`);
                          }}
                          className={`w-10 h-10 rounded-full border-2 hover:scale-110 transition-transform ${
                            avatarBorderColor === colorOption.class ? 'ring-2 ring-gray-500' : ''
                          }`}
                          style={{ backgroundColor: colorOption.color }}
                          title={colorOption.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {playerState.ownedHeroes.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    size="medium"
                    onClick={() => {
                      updatePlayerState({ selectedHero: character });
                      setShowHeroSelection(false);
                      toast.success(`${character.name} selected!`);
                    }}
                    isSelected={playerState.selectedHero?.id === character.id}
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Navigation buttons - Top Right */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <Link to="/">
            <Button variant="outline" size="icon" className="bg-amber-200/90 hover:bg-amber-300 border-2 border-amber-400 w-16 h-16">
              <ArrowLeft className="h-8 w-8" />
            </Button>
          </Link>
        </div>

        {/* Clickable central building area */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 cursor-pointer hover:scale-110 transition-transform duration-200 z-20 flex items-center justify-center"
          onClick={() => setShowVillageDetails(true)}
          title="Click to enter the Heroes' Guild"
        >
          {/* Subtle indicator for clickable area */}
          <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm border border-white/30 opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-white text-sm font-bold">Enter</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-green-100 to-amber-50 relative overflow-hidden">
      {/* Sky and clouds background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-100 to-transparent h-1/3"></div>
      
      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-600 via-green-500 to-transparent opacity-30"></div>
      
      {/* Trees scattered around */}
      <div className="absolute bottom-10 left-4 text-4xl">🌲</div>
      <div className="absolute bottom-16 right-8 text-3xl">🌳</div>
      <div className="absolute bottom-20 left-1/4 text-2xl">🌲</div>
      <div className="absolute bottom-8 right-1/3 text-3xl">🌳</div>
      
      <div className="relative z-10 max-w-md mx-auto p-4 space-y-6">
        {/* Village Header */}
        <div className="bg-amber-100/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/80 hover:bg-white"
              onClick={() => setShowVillageDetails(false)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-amber-800 flex items-center gap-2">
                🏛️ Heroes' Guild Hall
              </h1>
              <p className="text-sm text-amber-700">Recruit new heroes for your adventure</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-yellow-400/80 px-3 py-1 rounded-full shadow-sm">
                <Coins className="h-4 w-4 text-yellow-800" />
                <span className="font-bold text-yellow-900">{playerState.coins}</span>
              </div>
              <Link to="/leaderboard">
                <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white text-amber-800 border-amber-300">
                  📊 Progress
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Village Square - Hero Recruitment */}
        <div className="bg-stone-100/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-stone-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🏛️</span>
            <h2 className="font-bold text-stone-800 text-lg">Available Heroes</h2>
          </div>
          <p className="text-sm text-stone-600 mb-4">Brave heroes seeking adventure await your call</p>
          
          {/* Hero Buildings Grid */}
          <div className="grid grid-cols-2 gap-4">
            {availableHeroes.map((hero, index) => {
              const buildings = ['🏠', '🏡', '🏘️', '🏰'];
              const building = buildings[index % buildings.length];
              
              return (
                <div key={hero.id} className="relative">
                  {/* Building background */}
                  <div className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg p-3 border-2 border-amber-200 shadow-md hover:shadow-lg transition-all duration-200">
                    <div className="text-center mb-2">
                      <span className="text-2xl">{building}</span>
                      <div className="text-xs text-amber-700 font-semibold">{hero.name}'s House</div>
                    </div>
                    
                    <div 
                      className="cursor-pointer transform hover:scale-105 transition-transform"
                      onClick={() => setSelectedHero(hero)}
                    >
                      <CharacterCard
                        character={hero}
                        size="small"
                        isSelected={selectedHero?.id === hero.id}
                      />
                    </div>
                    
                    {/* Rarity badge */}
                    <div className="absolute top-1 right-1">
                      <Badge className={`text-white text-xs ${getRarityColor(hero.rarity)} shadow-sm`}>
                        {hero.rarity}
                      </Badge>
                    </div>
                    
                    {/* Price tag */}
                    <div className="absolute bottom-1 right-1 bg-yellow-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                      {getHeroPrice(hero)} 🪙
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hero Details Inn */}
        {selectedHero && (
          <div className="bg-red-100/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍺</span>
              <h3 className="font-bold text-red-800 text-lg">The Tavern - Hero Details</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-lg">
                {selectedHero.image.startsWith('/') ? (
                  <img 
                    src={selectedHero.image} 
                    alt={selectedHero.name}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-amber-300"
                  />
                ) : (
                  <span className="text-4xl">{selectedHero.image}</span>
                )}
                <div>
                  <div className="font-bold text-lg text-red-800">{selectedHero.name}</div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-red-300 text-red-700">{selectedHero.rarity}</Badge>
                    <Badge className="bg-blue-600 text-white">⚔️ Hero</Badge>
                  </div>
                </div>
              </div>
              
              {/* Stats in tavern style */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-amber-50/80 rounded-lg border border-amber-200">
                <div className="text-center bg-white/50 p-2 rounded">
                  <div className="text-sm text-amber-700">⚔️ Attack</div>
                  <div className="font-bold text-lg text-amber-800">{selectedHero.attack}</div>
                </div>
                <div className="text-center bg-white/50 p-2 rounded">
                  <div className="text-sm text-amber-700">🛡️ Defense</div>
                  <div className="font-bold text-lg text-amber-800">{selectedHero.defense}</div>
                </div>
                <div className="text-center bg-white/50 p-2 rounded">
                  <div className="text-sm text-amber-700">❤️ Health</div>
                  <div className="font-bold text-lg text-amber-800">{selectedHero.maxHealth}</div>
                </div>
                <div className="text-center bg-white/50 p-2 rounded">
                  <div className="text-sm text-amber-700">⚡ Energy</div>
                  <div className="font-bold text-lg text-amber-800">{selectedHero.maxEnergy}</div>
                </div>
              </div>

              {/* Abilities */}
              <div className="space-y-2 bg-white/50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm text-red-800 flex items-center gap-1">
                  📜 Hero Abilities:
                </h4>
                {selectedHero.abilities.map((ability) => (
                  <div key={ability.id} className="text-xs space-y-1 bg-amber-50/50 p-2 rounded">
                    <div className="flex justify-between">
                      <span className="font-medium text-red-700">{ability.name}</span>
                      <span className="text-amber-600">{ability.energyCost}⚡</span>
                    </div>
                    <div className="text-red-600">{ability.description}</div>
                  </div>
                ))}
              </div>

              {/* Recruitment Button */}
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 shadow-lg" 
                onClick={() => handlePurchaseHero(selectedHero)}
                disabled={!canAfford(getHeroPrice(selectedHero)) || isHeroOwned(selectedHero)}
              >
                {isHeroOwned(selectedHero) 
                  ? '✅ Already Recruited'
                  : canAfford(getHeroPrice(selectedHero)) 
                    ? `🤝 Recruit for ${getHeroPrice(selectedHero)} coins` 
                    : '💰 Not enough coins'
                }
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Village;
