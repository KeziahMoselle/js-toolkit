module.exports = {
  ...require('@studiometa/tailwind-config'),
  purge: ['src/index.html', 'src/**/*.js'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
