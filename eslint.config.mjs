import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
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
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        // Custom ignores:
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
