const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver = {
    ...config.resolver,
    sourceExts: [...config.resolver.sourceExts, "cjs"], // Ensure CJS files work
  };

  return withNativeWind(config, { input: './global.css' });
})();
