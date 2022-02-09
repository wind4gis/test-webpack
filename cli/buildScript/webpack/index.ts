import webpack, { Compiler } from 'webpack';
import fs from 'fs';
import path from 'path';
import config from './config';

export class WebpackBuilder {
  showName = '';
  ctxDir = process.cwd();
  args!: any;
  compiler!: Compiler;
  constructor(props: any) {
    this.init(props);
  }
  getEntry(nameList: string[]) {
    const resolvePathName = (dirName: string) => {
      if (dirName?.length && dirName[0] === '.') {
        const curDir = process.cwd();
        return path.basename(path.join(curDir, dirName));
      }
      return dirName;
    };

    return nameList.reduce<Record<string, Record<string, string>>>((result, curName) => {
      const name = path.basename(this.ctxDir)
      console.log(name, 'name')
      result[name] = {
        name,
        path: path.join(this.ctxDir, curName, 'index.ts'),
        originalName: curName || '',
      };
      return result;
    }, {});
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
