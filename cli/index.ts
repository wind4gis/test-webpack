import { Command } from 'commander';
import { BuilderScriptFactory } from './buildScript';

const program = new Command();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

program.version(pkg.version).name(`cli`).usage('command [options]');


program
  .command('build <name...>')
  .description('Build component')
  .option('--node-env <node-env>', 'development or production')
  .option('--build-type <buildType>', 'run webpack build or run typescript define build')
  .action((name, options) => {
    new BuilderScriptFactory({ nameList: name, options }).start();
  });

program.parse(process.argv);
