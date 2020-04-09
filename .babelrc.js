module.exports = {
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-export-default-from'],
  parserOpts: {
    plugins: ['dynamicImport', 'classProperties'],
  },
};
