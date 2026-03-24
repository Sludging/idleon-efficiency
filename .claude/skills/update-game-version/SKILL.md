---
name: update-game-version
description: Update game data when a new Legends of Idleon version is released. Extracts game code from Steam, processes it through WikiBot, and syncs updated data back.
disable-model-invocation: true
user-invocable: true
---

# Update Game Version

Run this procedure when a new Legends of Idleon game version is released. Execute each step sequentially, verifying success before proceeding.

## Step 1: Extract game files from Steam

```bash
cd /home/sludge/Development/idleon-efficiency
npx asar extract "/mnt/d/Program Files/Steam/steamapps/common/Legends of Idleon/resources/app.asar" assets
```

Verify: `assets/distBuild/static/game/N.js` exists.

## Step 2: Copy N.js to WikiBot repo

```bash
cp assets/distBuild/static/game/N.js ../IdleonWikiBot/N.js
```

## Step 3: Detect the new version number

Run this to extract the version from the new N.js:

```bash
python3 -c "
import re
with open('../IdleonWikiBot/N.js', 'r') as f:
    text = f.read()
match = re.search(r'RANDOlist=function\(\)\{return\[(.*?)\]\}', text, re.DOTALL)
content = match.group(1)
patch_match = re.search(r'\"([^\"]*PATCH_NOTES[^\"]*)\"', content)
patch_str = patch_match.group(1)
first_entry = patch_str.split(';')[0]
ver_match = re.search(r'v([0-9]+\.[0-9]+[a-zA-Z]?)', first_entry)
print(f'Version: {ver_match.group(1)}')
"
```

**How it works:** The `RANDOlist` function in N.js contains an entry with `PATCH_NOTES` in it. The first semicolon-delimited value in that entry is the latest patch title (e.g. `Goldrush_Event_v1.09`, `World_7,_Part_II_v1.05`). The version is extracted via the `v<number>` pattern. The title format varies but the `v<number>` pattern is consistent.

Report the detected version to the user before proceeding.

## Step 4: Update and run pre_parsing.py

1. Edit `../IdleonWikiBot/pre_parsing.py`: update `ver = "<old>"` to the new version
2. Run:

```bash
cd ../IdleonWikiBot && python3 pre_parsing.py
```

Verify: `codefiles/idleon<ver>.txt` was created and is significantly larger than N.js (the beautifier expands it).

## Step 5: Update and run main.py

1. Edit `../IdleonWikiBot/main.py`: update `IdleonReader("<old>", steam = True)` to the new version
2. Run:

```bash
cd ../IdleonWikiBot && python3 main.py
```

Verify: All repos generate successfully with item counts logged (no errors).

## Step 6: Copy exported files back to idleon-efficiency

```bash
cp -r ../IdleonWikiBot/exported/ts/* /home/sludge/Development/idleon-efficiency/data/domain/
```

## Step 7: Verify synced files

### 7a: Type-check

```bash
cd /home/sludge/Development/idleon-efficiency && npx tsc --noEmit
```

If `tsc` fails, identify which auto-generated file caused the error. Suggest reverting that specific file with `git checkout -- <file>` and report the issue to the user before proceeding.

### 7b: Human review

Pause and ask the user to review the synced diffs themselves:

```bash
git diff --stat data/domain/
```

Share the diffstat so the user can see what changed at a glance. The user will review the diffs and flag any issues that need to be fixed upstream in WikiBot.

Any flagged issues should be appended to `.claude/UPSTREAM_FIXES.md` under the current version heading before proceeding.

## Step 8: Clean up

```bash
rm -rf /home/sludge/Development/idleon-efficiency/assets
```

## Step 9: Summary

Report to the user:
- Old version -> New version
- Patch title (from step 3)
- Number of repos generated
- Any errors encountered

Remind the user that follow-up work may be needed:
- Run tests to identify breakages from code/formula changes
- Check for new game features that need domain implementations
- Identify new repositories that can be handled/generated
