module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'data/domain/**/*.tsx',
    '!data/domain/data/**',     // Exclude auto-generated files
    '!data/domain/enum/**',     // Exclude auto-generated files  
    '!data/domain/model/**'     // Exclude auto-generated files
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
}; 