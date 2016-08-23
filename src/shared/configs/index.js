module.exports = {
  development: {
    isProduction: false,
    host: 'localhost',
    port: 3000,
    wdsPort: 3001,
    apiHost: 'localhost',
    apiPort: 3002
  },
  production: {
    isProduction: true,
    host: 'reactjs-bangkok-universal.herokuapp.com', // use localhost to test in local machine
    port: process.env.PORT || 3000,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT || 3002
  }
}[process.env.NODE_ENV || 'development'];