# New Feature Implementation Guide

## Overview

This guide provides a systematic approach for implementing new game features in the IdleOn Efficiency codebase. Follow these steps to ensure proper integration with existing systems and maintain code quality standards.

## Planning a Page for a Calculation-Ready Domain

Use this plan for a page built on an existing domain. An existing domain does not need its implementation repeated.

1. **Set the player goal and scope.** State what the player needs to do or learn, and what is out of scope.
2. **Check the data.** Identify existing domain values that support the page and any missing calculations or inputs. Investigate game evidence only for calculations you add, change, or cannot confirm; see [testing guidance](TESTING_IMPLEMENTATION.md).
3. **Choose the presentation.** Use applicable examples from the [implementation patterns guide](agents/implementation-patterns.md). Record page behavior choices those examples do not cover.
4. **Plan runtime checks.** Name the important save states and interactions to verify in the running page, including a narrow screen. Consult [asset guidance](runbooks/sync-game-assets.md) if needed.

Continue to the implementation steps below only where they apply to the planned work. Keep UI checks distinct from game-calculation verification.

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
- **Pattern selection**: Use the implementation patterns guide to choose applicable examples and name the aspects that fit; record any uncovered choices or conflicts for resolution as described there.
- **Navigation placement**: Under which main navigation section should this appear?
- **Route structure**: What should the page URL/routing structure be?

### 4. Reference Implementation
- **Check reference repos**: Has this feature been implemented in `reference-repos/IdleonToolbox/`?
- **Domain logic validation**: Use their parser/domain code to validate reverse-engineering assumptions
- **Calculation verification**: Cross-reference formulas and game mechanics
- **Note**: Only domain/parser logic is relevant - ignore their UI implementation

## Implementation Tasks

### 1. Create Domain Class (`data/domain/[feature].tsx`)

**Use only the selected aspects of existing examples.** The implementation patterns guide identifies applicable backend and UI examples and boundaries; do not treat a whole feature as a template or create a skeleton in place of resolving the required design.

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
1. **Confirm prerequisites**: Verify repository and game evidence needed for the scoped work.
2. **Select applicable examples**: Use the implementation patterns guide and name relevant aspects.
3. **Implement domain logic**: Start with core calculations and data parsing.
4. **Create UI components**: Follow the selected UI aspects when UI work is in scope.
5. **Add automated tests**: Implement live game extraction tests for domain calculations (see `docs/TESTING_IMPLEMENTATION.md`)

### Verify a page with your IdleOn save

Use OMP’s browser in JavaScript Eval when verification needs the save loaded in Chrome. The headless browser has separate browser data.

The relay uses existing Chrome tabs; it does not create a new one. Open or duplicate an IdleOn tab in Chrome and load the save. Use a dedicated tab so verification does not change your working tab. The feature route does not need to be open yet.

Attach to the existing tab using a unique part of its current URL or title. `app.target` matches existing tabs, so leave out `url` when opening:

```js
const tab = await browser.open({
  name: "idleon-check",
  app: { relay: true, target: "<unique part of the tab's URL or title>" },
});

try {
  await tab.goto("https://localhost:3000/<feature-route>");
  // Verify the page in the running app.
} finally {
  await tab.close();
}
```

`tab.close()` releases OMP’s attachment but leaves the Chrome tab open. If the relay cannot connect, run `omp browser-relay` in WSL and confirm the Chrome extension is connected.

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
