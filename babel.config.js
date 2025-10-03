module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      require.resolve('nativewind/babel'),
      ['module-resolver', { alias: { '@': './src' } }],
      'react-native-reanimated/plugin'
    ]
  };
};
