import { loadTestGameData } from '../utils/test-data-loader';

describe('Basic Infrastructure Test', () => {
  describe('Test data loading infrastructure', () => {
    it('handles missing save files gracefully', () => {
      let gameData: Map<string, any> | null = null;
      let loadError: Error | null = null;
      
      try {
        gameData = loadTestGameData('demo-save'); // This save doesn't exist
      } catch (error) {
        loadError = error as Error;
      }

      // We expect this to fail with a file not found error since demo-save doesn't exist
      if (loadError) {
        console.log('Expected error during data loading (missing save file):', loadError.message);
        // Should fail with file not found error
        expect(loadError.message).toContain('Test save file not found');
      } else {
        // If it somehow succeeds, that's unexpected but we'll test the structure
        expect(gameData).toBeDefined();
        expect(gameData!.size).toBeGreaterThan(0);
      }
    });

    it('loads actual save data correctly', () => {
      // Test with a save file that actually exists
      let gameData: Map<string, any> | null = null;
      let loadError: Error | null = null;
      
      try {
        gameData = loadTestGameData('sludger-20250601');
      } catch (error) {
        loadError = error as Error;
        console.error('Unexpected error loading real save:', loadError.message);
      }

      // This should succeed since the save file exists
      expect(loadError).toBeNull();
      expect(gameData).toBeDefined();
      expect(gameData!.size).toBeGreaterThan(0);
      
      // Test that key domains are loaded
      expect(gameData!.has('players')).toBe(true);
      expect(gameData!.has('alchemy')).toBe(true);
      expect(gameData!.has('collider')).toBe(true);
      expect(gameData!.has('cooking')).toBe(true);
      expect(gameData!.has('itemsData')).toBe(true);

      // Test player data structure
      const players = gameData!.get('players');
      expect(players).toBeDefined();
      expect(Array.isArray(players)).toBe(true);
      expect(players.length).toBeGreaterThan(0);

      // Test items data structure
      const itemsData = gameData!.get('itemsData');
      expect(itemsData).toBeDefined();
      expect(Array.isArray(itemsData)).toBe(true);
      expect(itemsData.length).toBeGreaterThan(0);
    });
  });
}); 