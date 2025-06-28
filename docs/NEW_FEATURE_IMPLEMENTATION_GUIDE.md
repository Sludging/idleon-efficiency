# New Feature Implementation Guide

## Overview

This guide provides a systematic approach for implementing new game features in the IdleOn Efficiency codebase. Follow these steps to ensure proper integration with existing systems and maintain code quality standards.

## Prerequisites (Information Required from Developer)

Before beginning implementation, gather the following information from the developer:

### 1. Game Data Requirements
- **Raw data keys**: What are the save file keys for this feature's data?
- **Resource storage**: Where are resource counts stored (OptLacc indices, etc.)?
- **State persistence**: How are upgrade levels/states stored in save data?
- **Special data**: Any server variables or unique data locations?

### 2. External Data Source Requirements
- **WikBot availability**: Are data models/repositories available in the WikBot export?
- **Timeline**: If not available, when will external data be provided?
- **Asset names**: What are the correct image location names for UI assets?

### 3. Feature Similarity and UI Requirements
- **Similar features**: Is there an existing feature this should be modeled after?
- **Navigation placement**: Under which main navigation section should this appear?
- **Route structure**: What should the page URL/routing structure be?

## Implementation Tasks

### 1. Create Domain Class (`data/domain/[feature].tsx`)

**Key considerations based on feature similarity:**
- If modeling after an existing feature, copy the pattern from that domain
- If not, create a skeleton as a starting point we can iterate on.

**Implementation steps:**
- Create main feature class extending `Domain`
- Create item/upgrade classes if applicable
- Implement cost calculation methods (if applicable)
- Implement bonus calculation methods with cross-feature interactions
- Add unlock/progression logic (if applicable)
- Handle resource management (if applicable)

### 2. Integrate with Data Pipeline

**Add to data processing:**
- Add new domain to `domainList` in `idleonData.tsx`
- Configure `getRawKeys()` method with provided save file keys
- Add any necessary post-processing functions to the processing maps
- Handle resource parsing from provided data locations

### 3. UI Development

**Create page structure:**
- **Main page**: `app/[route]/page.tsx` using Next.js App Router
- **Components**: `components/[world]/[feature]/` directory structure
- **Follow patterns**: Use TypeScript throughout, follow existing page structures

**Component hierarchy:**
- Main feature display component
- Individual item/upgrade components (if applicable)
- Resource counter components (if applicable)
- Interactive elements (level controls, calculators, etc.)

### 4. Navigation Integration

**Update navigation:**
- Update navigation components with new route
- Add to appropriate world/section as specified by developer
- Follow existing navigation patterns

### 5. Asset Integration

**Image data support:**
- Update image data mappings using provided asset names
- Ensure proper dimensions and locations following `ImageData` patterns
- Ask developer for specific asset names rather than guessing

## Testing Implementation

### 6. Automated Testing Setup

**For new features with available save data:**
1. **Copy test template**: Use `__tests__/domains/_domain-template.test.ts.template`
2. **Create snapshot script**: Copy and customize from `scripts/generate-alchemy-snapshot.ts`
3. **Generate expected results**: Run script to capture current calculations
4. **Developer verification**: Developer confirms values match in-game behavior
5. **Regression protection**: Tests catch future calculation changes

**For new features without save data (test-driven development):**
1. **Start with structure tests**: Basic data loading and method existence
2. **Add known calculations**: Tests with manually provided expected values
3. **Build implementation**: Develop domain code to pass the tests
4. **Generate snapshots**: Once working, use scripts for regression baselines

**Testing commands:**
```bash
# Generate snapshot data
cd scripts
npx ts-node --project ./tsconfig.json ./generate-[feature]-snapshot.ts [save-name]

# Run feature tests
yarn test __tests__/domains/[feature]-calculations.test.ts
```

### 7. Visual Validation

**Primary validation method:**
- Compare calculated values with actual game client
- Verify cost calculations match game behavior
- Test with various save file states
- Validate all interactive elements work correctly

## Implementation Guidelines

### Code Standards
- **Never modify** auto-generated files: `data/domain/data/`, `data/domain/enum/`, `data/domain/model/`
- **Always use TypeScript** for all new code
- **Follow Next.js App Router** patterns for new pages
- **Use yarn** instead of npm for package operations

### Development Workflow
1. **Confirm prerequisites**: Ensure all required information is available
2. **Identify similar features**: Use existing patterns when possible
3. **Implement domain logic**: Start with core calculations and data parsing
4. **Create UI components**: Build user interface following existing patterns
5. **Add automated tests**: Implement snapshot-based testing for regression protection
6. **Visual validation**: Compare with game client behavior
7. **Integration testing**: Verify navigation and cross-feature interactions

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
5. **Visual validation** confirms accuracy with game client
6. **Regression protection** in place through snapshot testing

### Quality Checklist:
- [ ] TypeScript types are properly defined
- [ ] Error handling for edge cases
- [ ] Automated test coverage
- [ ] Visual validation completed
- [ ] Navigation integration tested
- [ ] Cross-feature interactions verified

## Templates and Examples

### Available Templates:
- **Domain test**: `__tests__/domains/_domain-template.test.ts.template`
- **Snapshot script**: `scripts/generate-alchemy-snapshot.ts`
- **Testing patterns**: Any domain in `__tests__/domains/`

This guide ensures consistent, high-quality implementations while maintaining the codebase's architectural patterns and testing standards. 
