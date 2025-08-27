import { Link } from 'react-router-dom';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Crown, Trophy, Medal, Award } from 'lucide-react';
import goldCoin from '@/assets/gold-coin.png';
import { ProgressTracker } from '@/components/game/ProgressTracker';

// Mock leaderboard data (in a real app, this would come from a database)
const mockLeaderboardData = [
  { id: 1, name: 'DragonSlayer', wins: 47, losses: 3, coins: 2350, level: 12, winRate: 94 },
  { id: 2, name: 'ShadowHunter', wins: 42, losses: 8, coins: 1980, level: 11, winRate: 84 },
  { id: 3, name: 'FireMage', wins: 38, losses: 12, coins: 1750, level: 10, winRate: 76 },
  { id: 4, name: 'StormWarrior', wins: 35, losses: 15, coins: 1650, level: 9, winRate: 70 },
  { id: 5, name: 'IceQueen', wins: 32, losses: 18, coins: 1550, level: 9, winRate: 64 },
  { id: 6, name: 'BladeMaster', wins: 28, losses: 22, coins: 1400, level: 8, winRate: 56 },
  { id: 7, name: 'LightBringer', wins: 25, losses: 25, coins: 1300, level: 8, winRate: 50 },
  { id: 8, name: 'DarkKnight', wins: 22, losses: 28, coins: 1200, level: 7, winRate: 44 },
  { id: 9, name: 'WindRunner', wins: 18, losses: 32, coins: 1100, level: 7, winRate: 36 },
  { id: 10, name: 'EarthShaker', wins: 15, losses: 35, coins: 1000, level: 6, winRate: 30 },
];

export const Leaderboard = () => {
  const { playerState } = useGame();
  
  // Find current player's rank (mock calculation)
  const currentPlayerRank = 15; // This would be calculated based on player stats
  const currentPlayerData = {
    name: playerState.name,
    wins: playerState.wins,
    losses: playerState.losses,
    coins: playerState.coins,
    level: playerState.level,
    winRate: playerState.wins + playerState.losses > 0 
      ? Math.round((playerState.wins / (playerState.wins + playerState.losses)) * 100)
      : 0
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <Award className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return <Badge className="bg-yellow-500 text-white">🥇 Champion</Badge>;
      case 2: return <Badge className="bg-gray-400 text-white">🥈 Runner-up</Badge>;
      case 3: return <Badge className="bg-amber-600 text-white">🥉 Third Place</Badge>;
      default: return <Badge variant="outline">#{rank}</Badge>;
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
                🏆 Leaderboard
              </h1>
              <p className="text-muted-foreground">Top heroes in the realm</p>
            </div>
          </div>
        </div>

        {/* Current Player Stats */}
        <Card className="p-4 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">Your Ranking</h2>
            <Badge variant="secondary">Rank #{currentPlayerRank}</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{currentPlayerData.level}</div>
              <div className="text-xs text-muted-foreground">Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{currentPlayerData.wins}</div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">{currentPlayerData.losses}</div>
              <div className="text-xs text-muted-foreground">Losses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">{currentPlayerData.winRate}%</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1">
                <img src={goldCoin} alt="Coins" className="h-4 w-4" />
                <span className="text-2xl font-bold text-primary">{currentPlayerData.coins}</span>
              </div>
              <div className="text-xs text-muted-foreground">Coins</div>
            </div>
          </div>
        </Card>

        {/* Progress Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressTracker />
          
          {/* Quick Stats Card */}
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Quick Stats</h3>
              
              {/* Experience Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Experience Progress</span>
                  <span className="text-xs text-muted-foreground">
                    {playerState.experience} / {playerState.level * 100} XP
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(playerState.experience / (playerState.level * 100)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Next Level Info */}
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-sm text-muted-foreground">Next Level</div>
                <div className="text-lg font-bold text-primary">Level {playerState.level + 1}</div>
                <div className="text-xs text-muted-foreground">
                  {Math.max(0, (playerState.level * 100) - playerState.experience)} XP needed
                </div>
              </div>

              {/* Achievement Summary */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Achievements</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Heroes Collected:</span>
                    <Badge variant="outline" className="text-xs">
                      {playerState.ownedHeroes.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Items:</span>
                    <Badge variant="outline" className="text-xs">
                      {playerState.inventory.reduce((total, item) => total + item.quantity, 0)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4">
          {mockLeaderboardData.slice(0, 3).map((player, index) => (
            <Card key={player.id} className={`p-4 text-center ${index === 0 ? 'border-2 border-yellow-500' : ''}`}>
              <div className="flex justify-center mb-2">
                {getRankIcon(index + 1)}
              </div>
              <div className="space-y-2">
                <div className="font-bold">{player.name}</div>
                {getRankBadge(index + 1)}
                <div className="text-sm text-muted-foreground">
                  {player.wins}W / {player.losses}L
                </div>
                <div className="text-xs text-muted-foreground">
                  {player.winRate}% win rate
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Full Leaderboard */}
        <Card className="p-4">
          <h2 className="font-bold text-lg mb-4">Full Rankings</h2>
          <div className="space-y-3">
            {mockLeaderboardData.map((player, index) => (
              <div key={player.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(index + 1)}
                    <span className="font-bold text-lg">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{player.name}</div>
                    <div className="text-sm text-muted-foreground">Level {player.level}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-500">{player.wins}</div>
                    <div className="text-xs text-muted-foreground">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-red-500">{player.losses}</div>
                    <div className="text-xs text-muted-foreground">Losses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-500">{player.winRate}%</div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center space-x-1">
                      <img src={goldCoin} alt="Coins" className="h-3 w-3" />
                      <span className="text-sm font-bold text-primary">{player.coins}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Coins</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <div className="text-xs text-muted-foreground">
            🏆 Rankings are updated in real-time after each battle
          </div>
          <div className="text-xs text-muted-foreground">
            Keep fighting to climb the leaderboard!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;