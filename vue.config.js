const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 9999
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      // .set("assets", resolve("src/assets"))
      // .set("components", resolve("src/components"))
      // .set("base", resolve("baseConfig"))
      // .set("public", resolve("public"));
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          }),
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
          // new webpack.ContextReplacementPlugin(
          //   /moment[/\\]locale$/,
          //   /zh-cn/,
          // ),
        ],
        resolve: {
          alias: {
            '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.js')
          }
        }
      }
    }
  }
}
