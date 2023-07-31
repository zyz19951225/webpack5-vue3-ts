const {merge} = require("webpack-merge");
const common = require("./webpack.common")

module.exports = merge(common, {
        mode: "development",
        output: {
            filename: "static/js/[name].js", // 将 js 文件输出到 static/js 目录中
            path: undefined,
        },
        module: {

        },
        devServer: {
            host: "localhost", // 启动服务器域名
            port: "3000", // 启动服务器端口号
            open: true, // 是否自动打开浏览器
            hot: true,
            historyApiFallback: true, // 解决vue-router刷新404问题
        },
    devtool: "cheap-module-source-map",
    }
)
