import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopItem } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { shopItems } from '@/data/shopItems';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export const Shop = () => {
  const { playerState, purchaseItem, canAfford } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All Items', icon: '🛍️' },
    { id: 'weapon', name: 'Weapons', icon: '⚔️' },
    { id: 'armor', name: 'Armor', icon: '🛡️' },
    { id: 'potion', name: 'Potions', icon: '🧪' },
    { id: 'accessory', name: 'Accessories', icon: '💍' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.type === selectedCategory);

  const getRarityColor = (rarity: ShopItem['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'attack': return '⚔️';
      case 'defense': return '🛡️';
      case 'health': return '❤️';
      case 'energy': return '⚡';
      default: return '📊';
    }
  };

  const handlePurchase = (item: ShopItem) => {
    if (purchaseItem(item)) {
      toast({
        title: "Purchase Successful! 🎉",
        description: `You bought ${item.name} for ${item.price} coins! It's now in your inventory.`,
      });
    } else {
      toast({
        title: "Insufficient Coins 💸",
        description: `You need ${item.price - playerState.coins} more coins to buy ${item.name}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-secondary/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                🏪 Hero Shop
              </h1>
              <p className="text-muted-foreground">Upgrade your heroes with powerful items!</p>
            </div>
          </div>
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💰</span>
              <div>
                <div className="font-bold text-lg">{playerState.coins}</div>
                <div className="text-xs text-muted-foreground">Coins</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Shop Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                {/* Item Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {item.image.startsWith('/') || item.image.startsWith('http') ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <span className="text-3xl">{item.image}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getRarityColor(item.rarity)} text-white`}
                        >
                          {item.rarity}
                        </Badge>
                        <Badge variant="secondary">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item Description */}
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>

                {/* Item Effect */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <span>{getStatIcon(item.effect.stat)}</span>
                    <span className="text-sm font-medium">
                      +{item.effect.value} {item.effect.stat.charAt(0).toUpperCase() + item.effect.stat.slice(1)}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Purchase Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">💰</span>
                    <span className="text-lg font-bold text-primary">
                      {item.price}
                    </span>
                  </div>
                  <Button
                    onClick={() => handlePurchase(item)}
                    disabled={!canAfford(item.price)}
                    className="flex items-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Buy</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <div className="text-xs text-muted-foreground">
            💡 Tip: Items go to your inventory! Use them during battle or as permanent upgrades.
          </div>
          {playerState.inventory.length > 0 && (
            <div className="text-xs text-green-600">
              ✅ You have {playerState.inventory.length} item{playerState.inventory.length > 1 ? 's' : ''} in your inventory!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;