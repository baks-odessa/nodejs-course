const env = process.env;
const cliArgs = process.argv.slice(2);

interface ArgsExtractor {
  [key: string]: string;
}

const argsExtractor = (args: string[]): ArgsExtractor => {
  return args.reduce((acc, item) => {
    const [name, value] = item.split('=');
    return {
      ...acc,
      [name]: value,
    }
  }, {});
}

export default {
  env,
  args: argsExtractor(cliArgs),
}
