module.exports = {
   preset: 'ts-jest',                          // Use ts-jest preset for TypeScript
   testEnvironment: 'jsdom',                   // Use jsdom for testing DOM elements
   moduleFileExtensions: ['ts', 'js', 'json'], // Specify file extensions Jest will look for
   transform: {
     '^.+\\.ts$': 'ts-jest',                  // Transform TypeScript files using ts-jest
   },
   testPathIgnorePatterns: ['/node_modules/'], // Ignore node_modules in test paths
 };
 