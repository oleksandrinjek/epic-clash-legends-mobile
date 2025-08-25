import { useGame } from '@/context/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Coins, Target, TrendingUp } from 'lucide-react';

export const ProgressTracker = () => {
  const { playerState } = useGame();
  
  const experienceNeeded = playerState.level * 100;
  const experienceProgress = (playerState.experience / experienceNeeded) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5" />
          Progress Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level and Experience */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Level {playerState.level}</span>
            <span className="text-xs text-muted-foreground">
              {playerState.experience} / {experienceNeeded} XP
            </span>
          </div>
          <Progress value={experienceProgress} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Coins */}
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">{playerState.coins}</p>
              <p className="text-xs text-muted-foreground">Coins</p>
            </div>
          </div>

          {/* Wins */}
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">{playerState.wins}</p>
              <p className="text-xs text-muted-foreground">Wins</p>
            </div>
          </div>

          {/* Losses */}
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-sm font-medium">{playerState.losses}</p>
              <p className="text-xs text-muted-foreground">Losses</p>
            </div>
          </div>

          {/* Win Rate */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-blue-500" />
            <div>
              <p className="text-sm font-medium">
                {playerState.wins + playerState.losses > 0 
                  ? Math.round((playerState.wins / (playerState.wins + playerState.losses)) * 100)
                  : 0}%
              </p>
              <p className="text-xs text-muted-foreground">Win Rate</p>
            </div>
          </div>
        </div>

        {/* Hero Collection */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Heroes Owned</span>
            <Badge variant="secondary">
              {playerState.ownedHeroes.length}
            </Badge>
          </div>
        </div>

        {/* Inventory */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Inventory Items</span>
            <Badge variant="secondary">
              {playerState.inventory.reduce((total, item) => total + item.quantity, 0)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
