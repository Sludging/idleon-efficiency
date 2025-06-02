# IdleOn Efficiency - Technical Codebase Overview

## **Project Overview**
**IdleOn Efficiency** (https://www.idleonefficiency.com) is a companion website for the popular idle MMO game "Legends of Idleon" developed by LavaFlame2. This is a NextJS-based web application that provides efficiency tools and calculators to help players optimize their gameplay in the idle MMO.

## **Technical Stack**
- **Framework**: Next.js 15.1.0 with App Router architecture
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
- **Data Flow**: Game save → Parse → Calculate cross-impacts → Display
- **Real-time Updates**: Firebase integration for live game data sync
- **Modular Processing**: Post-processing pipeline for complex calculations

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
5. **Visual Testing**: Compare website output with running game client
6. **Enhancement**: Add value-added features beyond basic game data display

### **Testing Strategy**
- **Visual Comparison**: Primary validation method using side-by-side game client inspection
- **Manual Verification**: Direct comparison of calculated results with in-game values
- **No Automated Testing**: Relies on visual validation and manual verification

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
- Consider shadcn/ui components for new UI elements
- Never assume or guess game mechanics - always verify against the actual game 