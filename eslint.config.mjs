import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        files: ['**/*.cjs'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            'react/no-unescaped-entities': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            // Consider undoing this at some point
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        files: ['app/**/*.tsx', 'components/**/*.tsx'],
        rules: {
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'JSXAttribute[name.type="JSXIdentifier"][name.name="data-testid"]',
                    message: 'Do not add test-only attributes to production UI.',
                },
            ],
        },
    },
    {
        files: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
        // Exceptions own account entry, authentication, status, or profile mode.
        ignores: ['components/header/dataStatus.tsx', 'components/header/profile.tsx', 'components/home.tsx', 'components/welcome.tsx', 'components/dashboard/dashboard.tsx'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['**/stores/appDataStore', '**/stores/appDataStore.tsx'],
                            importNames: ['DataStatus'],
                            message: 'Use shared account loading. Do not import DataStatus in feature UI.',
                        },
                    ],
                },
            ],
        },
    },
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        // Custom ignores:
        '.ui-verification/**',
        'reference-repos/**',
        '**/*.js',
        'tests/**',
        'scripts/**',
        // Imported from WikiBot:
        'data/domain/model/**',
        'data/domain/enum/**',
        'data/domain/data/**',
    ]),
])

export default eslintConfig
