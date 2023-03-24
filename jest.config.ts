export default {
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: [
    "**/__tests__/integration/**/*.spec.ts",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};
