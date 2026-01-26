module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverageFrom: [
    'data/domain/**/*.tsx',
    '!data/domain/data/**',     // Exclude auto-generated files
    '!data/domain/enum/**',     // Exclude auto-generated files  
    '!data/domain/model/**'     // Exclude auto-generated files
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  // Our tests have very specific matchers so usually stacktrace is pointless.
  // Revisit this if we evolve our testing framework further.
  noStackTrace: true,
}; 
