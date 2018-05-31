module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: true
  },
  babel: {
    plugins: ['inline-dotenv']
  }
};
