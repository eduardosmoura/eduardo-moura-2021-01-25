module.exports = {
  testEnvironment: "node",
  verbose: true,
  // registers babel.config.js with jest
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  // explicitly include any node libs using ESM modules
  transformIgnorePatterns: ["node_modules/"],
}