import { Character } from '@/types/game';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  isEnemy?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  isSelected?: boolean;
}

export const CharacterCard = ({ 
  character, 
  isEnemy = false, 
  size = 'medium',
  onClick,
  isSelected = false
}: CharacterCardProps) => {
  const healthPercentage = (character.health / character.maxHealth) * 100;
  const energyPercentage = (character.energy / character.maxEnergy) * 100;

  const getRarityColor = (rarity: Character['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
    }
  };

  const sizeClasses = {
    small: 'w-24 h-36',
    medium: 'w-32 h-48',
    large: 'w-40 h-60'
  };

  return (
    <Card 
      className={cn(
        sizeClasses[size],
        'relative overflow-hidden cursor-pointer transition-all duration-200',
        'hover:scale-105 hover:shadow-lg',
        isSelected && 'ring-2 ring-primary',
        isEnemy && 'border-destructive',
        onClick && 'hover:shadow-xl',
        // Add type-based styling
        character.type === 'hero' && 'border-l-4 border-l-blue-500',
        character.type === 'monster' && 'border-l-4 border-l-red-500'
      )}
      onClick={onClick}
    >
      {/* Rarity Border */}
      <div className={cn('absolute top-0 left-0 right-0 h-1', getRarityColor(character.rarity))} />
      
      {/* Character Image */}
      <div className="relative h-28 overflow-hidden">
        {character.image.startsWith('/') || character.image.startsWith('http') ? (
          <img 
            src={character.image} 
            alt={character.name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-b from-background to-muted text-4xl">
            {character.image}
          </div>
        )}
      </div>
      
      {/* Character Info */}
      <div className="p-2 space-y-2">
        <div className="text-center">
          <h3 className="font-bold text-sm leading-tight">{character.name}</h3>
          <Badge variant="outline" className="text-xs">
            {character.rarity}
          </Badge>
        </div>
        
        {/* Health Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>HP</span>
            <span>{character.health}/{character.maxHealth}</span>
          </div>
          <Progress 
            value={healthPercentage} 
            className="h-2"
          />
        </div>
        
        {/* Energy Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Energy</span>
            <span>{character.energy}/{character.maxEnergy}</span>
          </div>
          <Progress 
            value={energyPercentage} 
            className="h-2"
          />
        </div>
        
        {/* Stats */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>⚔️{character.attack}</span>
          <span>🛡️{character.defense}</span>
        </div>
      </div>
    </Card>
  );
};