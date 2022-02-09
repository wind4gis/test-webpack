import { WebpackBuilder } from './webpackConfig/index';
new WebpackBuilder({ nameList: './', nodeEnv: 'production' }).start();