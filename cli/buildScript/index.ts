import { WebpackBuilder } from './webpack';

export class BuilderScriptFactory {
  private builder: any;
  constructor(props: any) {
    this.builder = new WebpackBuilder(props);
  }
  start() {
    this.builder.start();
  }
}
