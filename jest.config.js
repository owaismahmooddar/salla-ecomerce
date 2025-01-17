const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      statements: 90,
      lines: 90,
    },
  },
  collectCoverageFrom: [
    "pages/**/*.{js,jsx,ts,tsx}",
    "features/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/reportWebVitals.ts",
    "!**/node_modules/**",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => ({
  /**
   * Using ...(await createJestConfig(customJestConfig)()) to override transformIgnorePatterns
   * provided byt next/jest.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096635363
   */
  ...(await createJestConfig(customJestConfig)()),
  /**
   * Swiper use ECMAScript Modules (ESM) and Jest provides some experimental support for it
   * but "node_modules" are not transpiled by next/jest yet.
   *
   * The "transformIgnorePatterns" on "jest.config.js" prevents the Swiper files from being
   * transformed by Jest but it affects the CSS files that are provided by this package.
   * Mocking these CSS files is the solution that demands the smallest configuration.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096698456
   * @link https://jestjs.io/docs/ecmascript-modules
   */
  collectCoverageFrom: [
    "pages/**/*.{js,jsx,ts,tsx}",
    "features/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/reportWebVitals.ts",
    "!**/node_modules/**",
  ],
  transformIgnorePatterns: ["node_modules/(?!(swiper|ssr-window|dom7)/)"],
});
