import { Ability, Character } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AbilityButtonProps {
  ability: Ability;
  character: Character;
  onClick: () => void;
  disabled?: boolean;
}

export const AbilityButton = ({ ability, character, onClick, disabled }: AbilityButtonProps) => {
  const canUse = character.energy >= ability.energyCost && ability.currentCooldown === 0;
  
  const getAbilityIcon = (type: Ability['type']) => {
    switch (type) {
      case 'attack': return '⚔️';
      case 'defend': return '🛡️';
      case 'heal': return '💚';
      case 'special': return '✨';
    }
  };

  const getAbilityColor = (type: Ability['type']) => {
    switch (type) {
      case 'attack': return 'border-red-500 hover:bg-red-50';
      case 'defend': return 'border-blue-500 hover:bg-blue-50';
      case 'heal': return 'border-green-500 hover:bg-green-50';
      case 'special': return 'border-purple-500 hover:bg-purple-50';
    }
  };

  return (
    <Button
      variant="outline"
      className={cn(
        'h-auto p-3 flex flex-col items-start space-y-1 relative',
        getAbilityColor(ability.type),
        !canUse && 'opacity-50 cursor-not-allowed',
        disabled && 'pointer-events-none'
      )}
      onClick={onClick}
      disabled={disabled || !canUse}
    >
      {/* Ability Header */}
      <div className="flex items-center justify-between w-full">
        <span className="text-lg">{getAbilityIcon(ability.type)}</span>
        <Badge variant="secondary" className="text-xs">
          {ability.energyCost}⚡
        </Badge>
      </div>
      
      {/* Ability Name */}
      <div className="font-semibold text-sm leading-tight text-left">
        {ability.name}
      </div>
      
      {/* Damage/Effect */}
      <div className="text-xs text-muted-foreground">
        {ability.type === 'attack' && `${ability.damage} DMG`}
        {ability.type === 'heal' && `+${Math.abs(ability.damage)} HP`}
        {ability.type === 'defend' && 'Defensive'}
        {ability.type === 'special' && 'Special'}
      </div>
      
      {/* Cooldown Indicator */}
      {ability.currentCooldown > 0 && (
        <div className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {ability.currentCooldown}
        </div>
      )}
    </Button>
  );
};