const { createProxyMiddleware } = require('http-proxy-middleware');

var target = null;
const dev_target = 'http://127.0.0.1:5000'
const dev_docker_target = 'http://flask_dev:7000'
const docker_target = 'http://flask:7000'

switch(process.env.REACT_APP_ENV) {
  case 'docker':
    target = docker_target
    break;
  case 'dev-docker':
    target = dev_docker_target
    break;
  case 'prod':
    throw new Error('Not implemented.')
  case 'dev':
  default: // fall through switch case
    target = dev_target
    break;
}

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
    })
  );
};
