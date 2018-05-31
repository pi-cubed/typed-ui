module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'TypedUI',
      externals: {
        react: 'React'
      }
    }
  },
  babel: {
    plugins: ['inline-dotenv']
  }
};
