const env = process.env;
const cliArgs = process.argv.slice(2);

const argsExtractor = (args) => {
  return args.reduce((acc, item) => {
    const [name, value] = item.split('=');
    return {
      ...acc,
      [name]: value,
    }
  }, {});
}

module.exports = {
  env,
  args: argsExtractor(cliArgs),
}
