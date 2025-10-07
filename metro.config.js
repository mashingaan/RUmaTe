const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...(config.resolver.alias || {}),
  'react-native$': 'react-native-web'
};

const defaultExts = config.resolver.sourceExts || [];
config.resolver.sourceExts = Array.from(new Set([...defaultExts, 'mjs', 'cjs', 'jsx', 'tsx']));

module.exports = config;
