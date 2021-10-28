const cli = require('./lib/cli');

const app_port = cli.args.APP_PORT ? parseInt(cli.args.APP_PORT, 10) : 3000;

const config = {
  app_port,
  env: cli.env,
};

module.exports = config;
