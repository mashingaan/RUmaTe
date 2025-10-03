
module.exports = function (api) {
  const isJest = api.env('test') || process.env.JEST_WORKER_ID !== undefined;
  api.cache(() => (isJest ? 'test' : 'default'));
  const plugins = [
    ['module-resolver', { alias: { '@': './src' } }],
    'react-native-reanimated/plugin'
  ];
  if (!isJest) {
    plugins.unshift(require.resolve('nativewind/babel'));
  }
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins
  };
};
