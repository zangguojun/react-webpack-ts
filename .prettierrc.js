const { getPrettierConfig } = require('@iceworks/spec');

module.exports = getPrettierConfig('react', {
  rules: {
    semi: false,
  },
});
