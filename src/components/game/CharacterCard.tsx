import { Character } from '@/types/game';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info } from 'lucide-react';
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
        isSelected && 'ring-2 ring-primary ring-offset-2 bg-primary/5',
        isEnemy && 'border-destructive',
        onClick && 'hover:shadow-xl',
        // Add type-based styling
        character.type === 'hero' && 'border-l-4 border-l-blue-500',
        character.type === 'monster' && 'border-l-4 border-l-red-500'
      )}
      onClick={onClick}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            ✓
          </div>
        </div>
      )}
      
      {/* Rarity Border */}
      <div className={cn('absolute top-0 left-0 right-0 h-1', getRarityColor(character.rarity))} />
      
      {/* Character Image */}
      <div className="relative h-28 overflow-hidden">
        {character.image.startsWith('/') || character.image.startsWith('http') ? (
          <img 
            src={character.image} 
            alt={character.name}
            className={cn(
              "w-full h-full object-cover",
              character.name === 'Fire Drake' ? 'object-center' : 'object-top'
            )}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-b from-background to-muted text-4xl">
            {character.image}
          </div>
        )}
      </div>
      
      {/* Character Info */}
      <div className="p-2 space-y-2">
        <div className="text-center relative">
          <div className="flex items-center justify-center gap-1">
            <h3 className="font-bold text-sm leading-tight">{character.name}</h3>
            <Popover>
              <PopoverTrigger asChild>
                <button 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Механика боя</h4>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-medium text-primary">Нанесение урона:</p>
                      <p className="text-muted-foreground mt-1">
                        Урон = (Урон способности + Атака) - Защита противника
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-primary">Восстановление HP:</p>
                      <p className="text-muted-foreground mt-1">
                        Способности типа "heal" восстанавливают здоровье. HP не может превысить максимальное значение.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-primary">Восстановление Energy:</p>
                      <p className="text-muted-foreground mt-1">
                        +10 энергии в начале каждого хода. Энергия тратится на использование способностей.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-primary">Перезарядка способностей:</p>
                      <p className="text-muted-foreground mt-1">
                        После использования способности начинается перезарядка (cooldown). Уменьшается на 1 каждый ход.
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
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