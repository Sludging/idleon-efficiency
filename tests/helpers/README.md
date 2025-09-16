# Game Data Extraction Helpers

Tools for extracting live game data to validate domain code calculations.

## Game Data Extractor

Generic script that reads configuration files and extracts values from the running game.

### Usage

```bash
# Run with a config file
node tests/helpers/game-data-extractor.js <config-file> <output-file>

# Example
node tests/helpers/game-data-extractor.js \
  tests/helpers/configs/cooking-speed-example.json \
  tests/results/cooking-speed-data.json
```

### Prerequisites

1. **Game running** with debug port:
   ```powershell
   # Windows PowerShell
   Start-Process -FilePath "path\to\LegendsOfIdleon.exe" -ArgumentList "--remote-debugging-port=9223"
   ```

2. **Debug server running**:
   ```bash
   cd sub-projects/game-debug-tool
   node idleon-debug-server.js
   ```

### Configuration Format

Create JSON config files in `tests/helpers/configs/`:

```json
{
  "description": "What this extraction is for",
  "target": "Specific function or calculation being tested", 
  "extractions": [
    {
      "label": "unique_identifier",
      "expression": "game.function.call.or.attribute.access",
      "description": "What this value represents"
    }
  ]
}
```

### Output Format

Results are saved as JSON with timestamps and metadata:

```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "extractions": {
    "label": {
      "expression": "...",
      "result": "...",
      "description": "...",
      "extractedAt": "..."
    }
  },
  "errors": {
    "failed_label": {
      "expression": "...",
      "error": "Error message",
      "failedAt": "..."
    }
  },
  "metadata": {
    "serverStatus": {...}
  }
}
```

#### Special Result Handling

- **Large numbers**: Numbers exceeding JavaScript's safe integer range are stored as:
  ```json
  {
    "type": "large_number",
    "value": "2.033960867763364e+107",
    "original": 2.033960867763364e+107
  }
  ```
- **Empty objects**: Converted to `null` for cleaner output
- **Null/undefined**: Preserved as `null`

## Configuration Examples

- `cooking-speed-example.json` - Template for cooking speed testing
- Add more configs as needed for different domain functions

## Integration with Tests

The extracted data files are meant to be consumed by test files that:
1. Load the extraction results
2. Map values to domain function parameters  
3. Compare domain function output to game results
4. Assert exact equality (or acceptable precision)
