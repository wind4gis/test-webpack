// Generated using webpack-cli https://github.com/webpack/webpack-cli
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
module.exports = {
  entry: { index: './index.ts' },
  output: {
    path: path.resolve(__dirname, '../..', 'dist/cjs'),
    filename: '[name].js',
    publicPath: '/',
    clean: true,
    library: {
      type: 'commonjs2',
    },
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.png|jpg|gif|jpeg|svg/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'images/[base]',
        },
      },
      {
        test: /\.txt|xlsx/,
        type: 'asset',
        generator: {
          filename: 'files/[base]',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@': 'src',
      packages: 'packages',
      cli: 'cli',
    },
    extensions: ['.tsx', '.ts', '.js', '.vue'],
  },
  externals: ['axios', 'vue', 'vue-property-decorator', 'vue-property-decorator', 'vue-template-compiler', 'people-ui'],
  plugins: [
    // new webpack.ProgressPlugin({ percentBy: "entries" }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        configFile: 'tsconfig.json',
      },
    }),
  ],
};
