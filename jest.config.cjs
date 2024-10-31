// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy" // To mock CSS imports
  },
  testMatch: ["**/tests/**/*.test.jsx"], // Look for tests in 'tests' folder
  roots: ["<rootDir>/src", "<rootDir>/tests"], // Specify root directories for Jest
};
