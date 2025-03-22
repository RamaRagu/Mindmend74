// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.assetExts.push("glb");

  return config;
})();
