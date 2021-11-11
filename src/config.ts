import cli from "./lib/cli"

const app_port = cli.args.APP_PORT ? parseInt(cli.args.APP_PORT, 10) : 3000;

export default {
  app_port,
  env: cli.env,
}
