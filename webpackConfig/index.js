import path from 'path';
import config from './config';
import webpack from 'webpack'

export class WebpackBuilder {
  compiler;
  constructor() {
    this.init();
  }

  init() {
    this.compiler = webpack(config);
  }

  run() {
    this.compiler.run((err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      if (stats?.hasErrors()) {
        const json = stats.toJson();
        if (json.errors) {
          json.errors.forEach((item) => {
            console.error(item.message);
          });
        } else {
          console.error(err);
        }
        return;
      }
      this.compiler.close(() => {
        console.log(err);
      });
    });
  }

  start() {
    this.run();
  }
}
