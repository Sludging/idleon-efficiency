# New Feature Implementation Guide

## Overview

This guide provides a systematic approach for implementing new game features in the IdleOn Efficiency codebase. Follow these steps to ensure proper integration with existing systems and maintain code quality standards.

## Prerequisites (Information Required from Developer)

Before beginning implementation, gather the following information from the developer:

### 1. Game Data Requirements
- **Raw data keys**: What are the save file keys for this feature's data?
- **Obfuscated Game Code**: Relevant code pieces we need to reverse engineer. (break down into smaller files / sections.)
- **Special data**: Any server variables or unique data locations?

### 2. External Data Source Requirements
- **WikBot availability**: Are data models/repositories available in the WikBot export?
- **Timeline**: If not available, when will external data be provided?
- **Asset names**: What are the correct image location names for UI assets?

### 3. Feature Similarity and UI Requirements
- **Similar features**: Is there an existing feature this should be modeled after?
- **Navigation placement**: Under which main navigation section should this appear?
- **Route structure**: What should the page URL/routing structure be?

### 4. Reference Implementation
- **Check reference repos**: Has this feature been implemented in `reference-repos/IdleonToolbox/`?
- **Domain logic validation**: Use their parser/domain code to validate reverse-engineering assumptions
- **Calculation verification**: Cross-reference formulas and game mechanics
- **Note**: Only domain/parser logic is relevant - ignore their UI implementation

## Implementation Tasks

### 1. Create Domain Class (`data/domain/[feature].tsx`)

**Key considerations based on feature similarity:**
- If modeling after an existing feature, copy the pattern from that domain
- If not, create a skeleton as a starting point we can iterate on.

**Implementation steps:**
- Create main feature class extending `Domain`
- Create item/upgrade classes if applicable
- Update `init` function
- Update `parse` function to handle parsing phase
- Implement cost calculation methods (if applicable)
- Implement bonus calculation methods with cross-feature interactions
- Add update (not exact name, see examples in code base) function to handle cross-domain impacts.

### 2. Integrate with Data Pipeline

**Add to data processing:**
- Add new domain to `domainList` in `idleonData.tsx`
- Configure `getRawKeys()` method with provided save file keys
- Add any necessary post-processing functions to the processing maps

### 3. UI Development

**Create page structure:**
- **Main page**: `app/[route]/page.tsx` using Next.js App Router
- **Components**: `components/[world]/[feature]/` directory structure
- **Follow patterns**: Use TypeScript throughout, follow existing page structures

**Component hierarchy:**
- Main feature display component
- Individual item/upgrade components (if applicable)
- Interactive elements (level controls, calculators, etc.)

### 4. Navigation Integration

**Update navigation:**
- Update navigation components with new route (`navigation.tsx`)
- Add to appropriate world/section as specified by developer
- Follow existing navigation patterns

### 5. Asset Integration

**Image data support:**
- Update image data mappings using provided asset names
- Ensure proper dimensions and locations following `ImageData` patterns
- Ask developer for specific asset names rather than guessing

## Testing Implementation

### 6. Live Game Extraction Testing

**See:** `docs/TESTING_IMPLEMENTATION.md` for complete testing guide

## Implementation Guidelines

### Development Workflow
1. **Confirm prerequisites**: Ensure all required information is available
2. **Identify similar features**: Use existing patterns when possible
3. **Implement domain logic**: Start with core calculations and data parsing
4. **Create UI components**: Build user interface following existing patterns
5. **Add automated tests**: Implement snapshot-based testing for regression protection

### Blocked Dependencies

**Cannot proceed without:**
- WikBot export data for upgrade repositories and models
- Exact calculation formulas from game data structures
- Asset names and image locations from developer
- Save file data key locations

**Communicate blockers clearly:**
- List specific missing information
- Suggest alternative approaches if available

## Success Criteria

### Implementation Complete When:
1. **Domain calculations** match game client behavior
2. **UI components** display correctly across different save states
3. **Automated tests** pass with real save data
4. **Navigation integration** works seamlessly

### Quality Checklist:
- [ ] TypeScript types are properly defined
- [ ] Error handling for edge cases
- [ ] Automated test coverage
- [ ] Navigation integration tested
- [ ] Cross-feature interactions verified
