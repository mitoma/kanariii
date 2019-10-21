const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/main.ts",

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.js']
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    // Copy over media resources from the Blockly package
    new CopyPlugin([
      {
        from: path.resolve(__dirname, './node_modules/blockly/media'),
        to: path.resolve(__dirname, 'dist/media')
      }
    ])
  ]
};
