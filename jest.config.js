/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@useCases/(.*)$': '<rootDir>/src/useCases/$1',
    '^@test/(.*)$': '<rootDir>/src/test/$1',
    '^@enums/(.*)$': '<rootDir>/src/enums/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@dto/(.*)$': '<rootDir>/src/dto/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
  }
};