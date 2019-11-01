const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/main.tsx",

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        // .ts or .tsx の場合
        test: /\.tsx?$/,
        use: "ts-loader"
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
            }
          }
        ]
      }
    ]
  },
  // import 文で解決する
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'build')
      }
    ]),
    // Copy over media resources from the Blockly package
    // kintone プラグインでは media ファイルをどこかCDNから取り込む必要があると思うので
    // Copy するのはやめてデフォルトの https://blockly-demo.appspot.com/static/media/ から取り込む。
    /*
    new CopyPlugin([
      {
        from: path.resolve(__dirname, './node_modules/blockly/media'),
        to: path.resolve(__dirname, 'dist/media')
      }
    ])
     */
  ]
};
