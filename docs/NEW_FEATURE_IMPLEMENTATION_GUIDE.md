# New Feature Implementation Guide

## Overview

This guide provides a systematic approach for implementing new game features in the IdleOn Efficiency codebase. Follow these steps to ensure proper integration with existing systems and maintain code quality standards.

## Planning a Page for a Calculation-Ready Domain

Use this plan for a page built on an existing domain. An existing domain does not need its
implementation repeated.

1. **Set the player goal and scope.** State what the player needs to do or learn, and what is
   out of scope. Establish the feature's player-facing game context using step 1 of the
   [UI work guide](agents/ui-patterns.md#workflow), even when calculations already exist.
2. **Check the data.** Identify existing domain values and any missing calculations or inputs.
   Verify game calculations only where you add, change, or cannot confirm them; see
   [testing guidance](TESTING_IMPLEMENTATION.md).
3. **Plan the UI.** Start with the [UI work guide](agents/ui-patterns.md), including its
   Impeccable requirement, for project context, selected composition patterns, and design
   scope. Record only page behavior choices the guide does not cover. For local browser
   verification and rendered previews, use the
   [UI verification guide](agents/ui-verification.md).
4. **Plan runtime checks.** Name important save states and interactions for the changed paths.
   Consult [asset guidance](runbooks/sync-game-assets.md) if needed.

Keep UI checks distinct from game-calculation verification. Continue to the implementation
steps below only where they apply.

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

### 1. Implement Domain Logic (`data/domain/`)

**Use only the selected aspects of existing examples.** The implementation patterns guide identifies applicable backend and UI examples and boundaries; do not treat a whole feature as a template or create a skeleton in place of resolving the required design.

**Implementation steps:**
- Select concept models using [MODEL-01](../CODING_STANDARDS.md#model-01--model-responsible-concepts); extend existing domain logic where it owns the feature.
- Create a `Domain` subclass only when the feature needs its own pipeline participant.
- Update the owning domain's `init` and `parse` functions as needed.
- Implement cost calculation methods (if applicable)
- Implement bonus calculation methods with cross-feature interactions
- Add update (not exact name, see examples in code base) function to handle cross-domain impacts.

### 2. Integrate with Data Pipeline

**Register changed processing where needed:**
- Add a new `Domain` instance to `domainList` in `idleonData.tsx` only when introducing a pipeline participant.
- Configure the owning domain's `getRawKeys()` with required save keys and translate them during `parse` according to [PARSE-01](../CODING_STANDARDS.md#parse-01--translate-at-the-boundary).
- Add any necessary post-processing functions to the processing maps.

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

### 6. Game Extraction Testing

Use the [testing implementation guide](TESTING_IMPLEMENTATION.md) for test design and the [canonical game-access policy](../tests/helpers/README.md#game-access) for offline defaults, readiness, version checks, and live exceptions.

## Implementation Guidelines

### Verify a page with a local save

Use the [UI verification guide](agents/ui-verification.md) for focused Docker Playwright
feature checks and screenshots during mockup planning. Keep UI checks separate from
game-calculation validation; read [testing guidance](TESTING_IMPLEMENTATION.md) for domain
tests and extraction.

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
