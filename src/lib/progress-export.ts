import { PlayerState } from '@/hooks/use-player-persistence';

export interface ExportedProgress {
  version: string;
  exportDate: string;
  playerData: PlayerState;
  checksum: string;
}

export class ProgressExport {
  private static VERSION = '1.0.0';

  /**
   * Export player progress to a downloadable file
   */
  static exportProgress(playerState: PlayerState): void {
    const exportData: ExportedProgress = {
      version: this.VERSION,
      exportDate: new Date().toISOString(),
      playerData: playerState,
      checksum: this.generateChecksum(playerState),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `epic-clash-progress-${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  /**
   * Import player progress from a file
   */
  static async importProgress(file: File): Promise<{ success: boolean; data?: PlayerState; error?: string }> {
    try {
      const text = await file.text();
      const importData: ExportedProgress = JSON.parse(text);

      // Validate version compatibility
      if (importData.version !== this.VERSION) {
        return {
          success: false,
          error: `Version mismatch. Expected ${this.VERSION}, got ${importData.version}`
        };
      }

      // Validate checksum
      const expectedChecksum = this.generateChecksum(importData.playerData);
      if (importData.checksum !== expectedChecksum) {
        return {
          success: false,
          error: 'Data integrity check failed. File may be corrupted.'
        };
      }

      // Validate data structure
      if (!this.validatePlayerState(importData.playerData)) {
        return {
          success: false,
          error: 'Invalid data structure in import file.'
        };
      }

      return {
        success: true,
        data: importData.playerData
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to parse import file.'
      };
    }
  }

  /**
   * Generate a simple checksum for data integrity
   */
  private static generateChecksum(data: PlayerState): string {
    const dataStr = JSON.stringify(data);
    let hash = 0;
    
    for (let i = 0; i < dataStr.length; i++) {
      const char = dataStr.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(16);
  }

  /**
   * Validate that the imported data has the correct structure
   */
  private static validatePlayerState(data: any): data is PlayerState {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof data.name === 'string' &&
      typeof data.level === 'number' &&
      typeof data.experience === 'number' &&
      typeof data.coins === 'number' &&
      typeof data.wins === 'number' &&
      typeof data.losses === 'number' &&
      Array.isArray(data.inventory) &&
      Array.isArray(data.ownedHeroes)
    );
  }

  /**
   * Get progress summary for display
   */
  static getProgressSummary(playerState: PlayerState): {
    totalBattles: number;
    winRate: number;
    totalCoins: number;
    heroCount: number;
    itemCount: number;
  } {
    const totalBattles = playerState.wins + playerState.losses;
    const winRate = totalBattles > 0 ? Math.round((playerState.wins / totalBattles) * 100) : 0;
    const totalCoins = playerState.coins;
    const heroCount = playerState.ownedHeroes.length;
    const itemCount = playerState.inventory.reduce((total, item) => total + item.quantity, 0);

    return {
      totalBattles,
      winRate,
      totalCoins,
      heroCount,
      itemCount,
    };
  }

  /**
   * Format progress data for display
   */
  static formatProgressData(playerState: PlayerState): string {
    const summary = this.getProgressSummary(playerState);
    
    return `
Epic Clash Legends - Progress Summary
=====================================
Player: ${playerState.name}
Level: ${playerState.level}
Experience: ${playerState.experience}/${playerState.level * 100} XP
Total Battles: ${summary.totalBattles}
Win Rate: ${summary.winRate}%
Coins: ${summary.totalCoins}
Heroes Owned: ${summary.heroCount}
Inventory Items: ${summary.itemCount}
Export Date: ${new Date().toISOString()}
    `.trim();
  }
}
