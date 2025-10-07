const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...(config.resolver.alias || {}),
  'react-native$': 'react-native-web'
};

const defaultSourceExts = config.resolver.sourceExts || [];
const extraExts = ['mjs', 'cjs', 'jsx', 'tsx'];
config.resolver.sourceExts = Array.from(new Set([...defaultSourceExts, ...extraExts]));

module.exports = config;

