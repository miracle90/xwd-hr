const path = require("path")

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // devServer: {
  //   port: 8888
  // },
  // productionSourceMap: false
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      // .set("assets", resolve("src/assets"))
      // .set("components", resolve("src/components"))
      // .set("base", resolve("baseConfig"))
      // .set("public", resolve("public"));
  }
}