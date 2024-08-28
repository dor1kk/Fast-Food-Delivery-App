module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
  ],
  setupTests: ['@testing-library/jest-dom/extend-expect'],
};
