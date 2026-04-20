# Live Game Testing Infrastructure

Testing approach that validates domain calculations against live game data extracted from running game.

## Test Coverage Tracking

We use a **JSDoc-based annotation system** to track which domain methods are covered by tests.

### How It Works

1. **Annotate tests with `@testCovers`:**
   ```typescript
   /**
    * Cooking Domain - Meal Speed
    * 
    * Tests our cooking domain calculations against live game data.
    *
    * @testCovers Cooking.getTotalCookingSpeed
    * @testCovers Kitchen.getMealSpeed
    * @testCovers Kitchen.mealSpeed
    */
   describe('Cooking Domain - Meal Speed', () => {
     // test code...
   });
   ```

2. **Generate coverage report:**
   ```bash
   yarn coverage:report
   ```
   This creates `coverage-report.md` showing:
   - Which methods are tested (covered)
   - Which methods lack tests (gaps)
   - Coverage percentage
   - Ignored methods (utility functions, imports, etc.)

3. **Configure ignore list:**
   Edit `coverage-config.json` to exclude methods that don't need testing:
   ```json
   {
     "domains": ["starsigns", "voting"],
     "methods": ["*.getImageData", "*.init"],
     "patterns": ["*.*Image*"]
   }
   ```

### Current Coverage

Run `yarn coverage:report` to see the latest metrics.

## Documentation

See `docs/TESTING_IMPLEMENTATION.md` for comprehensive testing guide.
