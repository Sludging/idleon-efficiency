# IdleOn Efficiency - Technical Codebase Overview

## **Project Overview**
**IdleOn Efficiency** (https://www.idleonefficiency.com) is a companion website for the popular idle MMO game "Legends of Idleon" developed by LavaFlame2. This is a NextJS-based web application that provides efficiency tools and calculators to help players optimize their gameplay in the idle MMO.

## **Technical Stack**
- **Framework**: Next.js 16 with App Router architecture
- **Language**: TypeScript throughout
- **UI Libraries**: Grommet UI, styled-components, some custom components
- **State Management**: Zustand for app-wide state
- **Database**: Firebase (Firestore) for user data storage
- **Error Tracking**: Sentry for monitoring
- **Build Tool**: Yarn as package manager
- **Hosting**: Vercel with automatic GitHub integration
- **Deployment**: Continuous deployment via GitHub pushes

## **Core Functionality**
The website provides comprehensive tracking and optimization tools for virtually every game system in Legends of Idleon:

### **Player Management Systems**
- Multi-character management (players can have 10+ characters)
- Character statistics, equipment, talents, and skill progression
- Class specializations and talent builds

### **Key Features**
- Real-time cloud save parsing and data synchronization
- Efficiency calculators for all several systems
- Progress tracking and optimization recommendations
- Public profile sharing system
- Cross-character impact calculations (family bonuses, account-wide upgrades)

## **Architecture Patterns**
- **Domain-Driven Design**: Each game system has its own domain class in `data/domain/`
- **Three-Phase Data Pipeline** (see `idleonData.tsx`):
  1. **Init** — One-time setup of domain instances and static game data
  2. **Parse** — Extract raw data from cloud save (no cross-domain access, no calculations)
  3. **Calculate** — Compute values in strict dependency order (cross-domain access allowed)
- **Real-time Updates**: Firebase integration for live game data sync
- **Order Sensitivity**: Calculate phase ordering is manual and fragile — wrong order produces incorrect results

## **Data Sources & External Dependencies**

### **IdleOn WikBot Integration**
- **Primary Dependency**: External IdleOn WikBot project handles parsing of minified/obfuscated game code
- **Sync Command**: `cp -r ../IdleonWikiBot/exported/ts/* data/domain/`
- **Generated Files**: Creates TypeScript definitions for game data, enums, and models

### **Immutable Data Directories**
These directories are auto-generated from WikBot and should **NEVER** be manually modified:
- `data/domain/data/` - Game data repositories (items, enemies, NPCs, etc.)
- `data/domain/enum/` - Game enumerations and constants  
- `data/domain/model/` - TypeScript interfaces and data models

### **User Data Sources**
- **Game Assets**: Extracted from actual game APK/client files
- **User Data**: Cloud saves uploaded by users through Firebase
- **Real-time Sync**: Live game data synchronization

## **Development Workflow**

### **Adding New Features**
1. **Data Sync**: Pull latest game data from WikBot project using sync command
2. **Code Analysis**: Manually inspect minified game source code for target feature
3. **Reverse Engineering**: Implement game calculations in relevant domain files
4. **UI Development**: Create components to display the calculated information
5. **Automated Testing**: Add live game extraction tests for domain calculations (see `docs/TESTING_IMPLEMENTATION.md`)
6. **Visual Testing**: Compare website output with running game client
7. **Enhancement**: Add value-added features beyond basic game data display

### **Testing Strategy**

- **Live Game Extraction Tests**: Jest suite in `tests/` validates domain calculations against values extracted from the running game client via a debug server
- **Parameter-First**: Individual calculation inputs are tested before final composite calculations
- **Visual Comparison**: Still required for UI and features not covered by automated tests
- **Class Reference Inventory**: `scripts/domain-class-references.ts` inventories class declarations in editable `data/domain/**` and symbol references from `app/**`, `components/**`, and test files. A class counts when its class symbol or a declared member symbol is referenced; it does not classify core or parameter calculations.

The top-level `excludedDomainDirectories` set near the top of
`scripts/domain-class-references.ts` controls exclusions under `data/domain`.
It currently contains `data`, `enum`, `model`, `base`, and `login`; maintainers
add or remove top-level directory names there when exclusions change.

All formats group classes into **both**, **UI-only**, **tests-only**, and
**neither**, with entries grouped by implementation path:

```bash
yarn coverage:report                         # Markdown: coverage-report.md
yarn coverage:report --format=markdown       # Markdown: coverage-report.md
yarn coverage:report --format=html           # HTML: coverage-report.html
yarn coverage:report --format=json           # JSON: coverage-report.json
```

The space-separated form is also accepted, for example
`yarn coverage:report --format markdown`. HTML is standalone and human-readable,
with collapsed references and search; JSON is machine-readable.

See `docs/TESTING_IMPLEMENTATION.md` and `tests/README.md` for details.

### **Deployment Process**
- **Continuous Integration**: Vercel automatically builds and deploys on GitHub pushes
- **No Manual Steps**: Fully automated pipeline from commit to production

## **Key Technical Challenges**

### **Game Update Management**
- **Critical Challenge**: Obfuscated/minified game code makes change detection extremely difficult
- **Version Tracking**: Nearly impossible to create meaningful diffs between game versions
- **Breaking Changes**: Minor game updates can break calculations without clear indication
- **Manual Monitoring**: Requires constant vigilance for unexpected game mechanic changes

### **Code Architecture Constraints**
- **External Dependencies**: Core game data completely dependent on WikBot project
- **Immutable Boundaries**: Clear separation between generated and custom code
- **Calculation Accuracy**: Must reverse-engineer complex, interdependent game formulas
- **Data Synchronization**: Managing real-time updates while maintaining calculation integrity

### **Performance Considerations**
- **Current State**: Data processing performs adequately but lacks instrumentation
- **Unknown Bottlenecks**: No metrics on processing speed or resource usage
- **Complex Calculations**: Heavy cross-system dependency calculations
- **Real-time Processing**: Firebase sync and calculation pipeline efficiency

## **File Structure Guidelines**

### **Editable Areas**
- `data/domain/*.tsx` - Custom domain logic and calculations
- `app/` - Next.js pages and routing
- `components/` - UI components
- `lib/` - Utility libraries and stores

### **Read-Only Areas (Auto-Generated)**
- `data/domain/data/` - **DO NOT MODIFY** - Game data from WikBot
- `data/domain/enum/` - **DO NOT MODIFY** - Game enumerations from WikBot  
- `data/domain/model/` - **DO NOT MODIFY** - TypeScript models from WikBot

## **Development Environment Requirements**
- **Adjacent Repository**: Requires IdleOn WikBot project in parallel directory
- **Game Client Access**: Needs running game instance for visual validation
- **Manual Sync Process**: Regular syncing of WikBot generated files
- **TypeScript Expertise**: Heavy reliance on complex TypeScript domain modeling

## **Important Notes for Developers**
- This codebase represents a sophisticated reverse-engineering effort that recreates game mechanics outside the official client
- The primary technical challenge is maintaining accuracy despite constantly changing, obfuscated source material
- Always use TypeScript for new code
- Prefer NextJS App Router patterns for new pages
- Use Yarn instead of npm for package management
- Use Grommet UI components for new UI elements (existing convention)
- Never assume or guess game mechanics - always verify against the actual game 