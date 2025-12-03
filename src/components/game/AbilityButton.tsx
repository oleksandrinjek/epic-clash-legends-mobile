import { Ability, Character } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AbilityButtonProps {
  ability: Ability;
  character: Character;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
}

export const AbilityButton = ({ ability, character, onClick, disabled, isActive }: AbilityButtonProps) => {
  const canUse = character.energy >= ability.energyCost && ability.currentCooldown === 0;
  
  const getAbilityIcon = (type: Ability['type']) => {
    switch (type) {
      case 'attack': return '⚔️';
      case 'defend': return '🛡️';
      case 'heal': return '💚';
      case 'special': return '✨';
      case 'super': return '💥';
    }
  };

  const getAbilityColor = (type: Ability['type']) => {
    switch (type) {
      case 'attack': return 'border-red-500 hover:bg-red-50 dark:hover:bg-red-950';
      case 'defend': return 'border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950';
      case 'heal': return 'border-green-500 hover:bg-green-50 dark:hover:bg-green-950';
      case 'special': return 'border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950';
      case 'super': return 'border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950';
    }
  };

  const getActiveGlow = (type: Ability['type']) => {
    switch (type) {
      case 'attack': return 'shadow-[0_0_20px_rgba(239,68,68,0.7)] bg-red-100 dark:bg-red-900 border-red-400 scale-105';
      case 'defend': return 'shadow-[0_0_20px_rgba(59,130,246,0.7)] bg-blue-100 dark:bg-blue-900 border-blue-400 scale-105';
      case 'heal': return 'shadow-[0_0_20px_rgba(34,197,94,0.7)] bg-green-100 dark:bg-green-900 border-green-400 scale-105';
      case 'special': return 'shadow-[0_0_20px_rgba(168,85,247,0.7)] bg-purple-100 dark:bg-purple-900 border-purple-400 scale-105';
      case 'super': return 'shadow-[0_0_20px_rgba(234,179,8,0.7)] bg-yellow-100 dark:bg-yellow-900 border-yellow-400 scale-105';
    }
  };

  return (
    <Button
      variant="outline"
      className={cn(
        'h-auto p-3 flex flex-col items-start space-y-1 relative transition-all duration-300',
        getAbilityColor(ability.type),
        !canUse && 'opacity-50 cursor-not-allowed',
        disabled && 'pointer-events-none',
        isActive && getActiveGlow(ability.type)
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
        {ability.type === 'super' && `${ability.damage} DMG (Super)`}
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