const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const package_json = require(path.resolve(__dirname, 'package.json'));

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: {
    kanariii: './src/main.tsx',
    'chrome-extension': './src/chrome-extension.ts',
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        // .ts or .tsx の場合
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        // xml は template string として読み込む
        test: /\.xml$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localsConvention: 'camelCaseOnly',
            },
          },
        ],
      },
    ],
  },
  // import 文で解決する
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'build'),
        },
        // Copy over media resources from the Blockly package
        {
          from: path.resolve(__dirname, './node_modules/blockly/media'),
          to: path.resolve(__dirname, 'build/media'),
        },
        {
          from: path.resolve(__dirname, 'src/manifest.json'),
          to: path.resolve(__dirname, 'build/manifest.json'),
          transform(content) {
            return content.toString().replace('$VERSION', package_json.version);
          },
        },
      ],
    }),
  ],
};
