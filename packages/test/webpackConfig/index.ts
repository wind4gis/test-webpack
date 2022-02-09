import path from 'path';
import config from './config';
import webpack from 'webpack'

export class WebpackBuilder {
  showName = '';
  ctxDir = process.cwd();
  args!: any;
  compiler!: any;
  constructor(props: any) {
    this.init(props);
  }
  getEntry(name: string) {
    return {
      'test': {
        name: 'test',
        path: path.join(this.ctxDir, name, 'index.ts'),
        originalName: 'test',
      }
    }
  }
  init(props: any) {
    const entry = this.getEntry(props.nameList);
    this.args = {
      ...props.options,
      entry,
      ctxDir: this.ctxDir,
    };
    if (entry) {
      this.compiler = webpack(config);
    }
  }

  run() {
    this.compiler.run((err, stats) => {
      if (err) {
        console.error(`${this.showName}`);
        return;
      }
      if (stats?.hasErrors()) {
        const json = stats.toJson();
        if (json.errors) {
          json.errors.forEach((item) => {
            console.error(item.message);
          });
        } else {
          console.error(`${this.showName}`);
        }
        return;
      }
      this.compiler.close(() => {
        console.log(`${this.showName}`);
      });
    });
  }

  start() {
    this.run();
  }
}
