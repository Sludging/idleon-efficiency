---
name: architecture
description: Understanding data flow, domain patterns, cross-domain dependencies, and architectural constraints
---

# Architecture Guide

For comprehensive architecture documentation, read [docs/CODEBASE_OVERVIEW.md](docs/CODEBASE_OVERVIEW.md).

## Key Reminders

**Three-phase data pipeline:**
1. **Init** - One-time setup of domain instances and static game data
2. **Parse** - Extract raw data from cloud save (NO cross-domain access, NO calculations)
3. **Calculate** - Compute values in strict dependency order (cross-domain access allowed)

**Critical architectural rules:**
- Calculate phase requires strict ordering due to cross-domain dependencies
- Parse phase must NEVER access other domains or perform calculations
- Auto-generated directories MUST NOT be modified: `data/domain/data/`, `data/domain/enum/`, `data/domain/model/`

**Finding correct calculation order:**
1. Identify what domains your feature reads from (dependencies)
2. Place your feature AFTER its dependencies
3. Identify what domains might read from your feature (dependents)
4. Place your feature BEFORE its dependents
5. Test thoroughly - wrong order breaks everything

**Data sync command:**
```bash
cp -r ../IdleonWikiBot/exported/ts/* data/domain/
```

**Known fragility:**
- Order maintained manually (no dependency graph)
- Mixed patterns from learning TS/React over time
- Hard to parallelize due to sequential pipeline
