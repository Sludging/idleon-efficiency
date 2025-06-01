# GitHub Actions CI/CD Setup

This repository uses GitHub Actions for continuous integration and deployment. The workflows are configured to ensure code quality and prevent broken code from being merged.

## Workflows

### 1. CI Workflow (`ci.yml`)
- **Triggers**: Push to `main`, `master`, or `develop` branches, and all pull requests
- **Jobs**:
  - **Test**: Runs on Node.js 18.x and 20.x matrix
    - Installs dependencies with `yarn`
    - Runs ESLint for code quality
    - Executes Jest tests
    - Generates test coverage reports
    - Uploads coverage to Codecov (optional)
  - **Build**: Runs after tests pass
    - Builds the Next.js application to ensure it compiles successfully

### 2. Branch Protection Workflow (`branch-protection.yml`)
- **Triggers**: Pull requests to `main`, `master`, or `develop` branches
- **Purpose**: Provides a single required status check for branch protection
- **Jobs**: Combines linting, testing, and building into one required check

## Setting Up Branch Protection Rules

To enforce these checks before merging, configure branch protection rules in your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Branches**
3. Click **Add rule** or edit existing rules
4. For the branch name pattern, enter: `main` (or `master`/`develop` as appropriate)
5. Enable the following options:
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Require conversation resolution before merging**
6. In the **Status checks** section, add:
   - `Required CI Checks` (from branch-protection.yml)
   - `test (18.x)` and `test (20.x)` (from ci.yml)
   - `build` (from ci.yml)
7. Optionally enable:
   - ✅ **Restrict pushes that create files larger than 100 MB**
   - ✅ **Require signed commits**

## Test Commands

The following test commands are available:
- `yarn test` - Run all tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report
- `yarn test:domains` - Run domain-specific tests
- `yarn test:integration` - Run integration tests

## Coverage Reporting

The workflow includes optional Codecov integration. To enable:
1. Sign up at [codecov.io](https://codecov.io)
2. Add your repository
3. Get your repository token
4. Add `CODECOV_TOKEN` to your repository secrets

## Troubleshooting

### Tests failing in CI but passing locally
- Ensure you're using the same Node.js version locally
- Check that all dependencies are properly specified in `package.json`
- Verify that tests don't depend on local environment variables

### Build failures
- Check that all TypeScript types are properly defined
- Ensure all imports are correctly resolved
- Verify that environment variables needed for build are available

### Status checks not appearing
- Ensure the workflow files are on the default branch
- Check that the workflow names match exactly in branch protection settings
- Verify that the workflows have been triggered at least once 