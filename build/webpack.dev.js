const {merge} = require("webpack-merge");
const common = require("./webpack.common")

module.exports = merge(common, {
        mode: "development",
        output: {
            filename: "static/js/[name].js", // 将 js 文件输出到 static/js 目录中
            path: undefined,
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            // 用来匹配 .css 结尾的文件
                            test: /\.css$/,
                            // use 数组里面 Loader 执行顺序是从右到左
                            use: ["style-loader", "css-loader",
                                {
                                    loader: "postcss-loader",
                                    options: {
                                        postcssOptions: {
                                            plugins: [
                                                "postcss-preset-env", // 能解决大多数样式兼容性问题
                                            ],
                                        },
                                    },
                                },],
                        },
                        {
                            test: /\.less$/,
                            use: ["style-loader", "css-loader",
                                {
                                    loader: "postcss-loader",
                                    options: {
                                        postcssOptions: {
                                            plugins: [
                                                "postcss-preset-env", // 能解决大多数样式兼容性问题
                                            ],
                                        },
                                    },
                                }, "less-loader"],
                        },
                        {
                            test: /\.s[ac]ss$/,
                            use: ["style-loader", "css-loader",
                                {
                                    loader: "postcss-loader",
                                    options: {
                                        postcssOptions: {
                                            plugins: [
                                                "postcss-preset-env", // 能解决大多数样式兼容性问题
                                            ],
                                        },
                                    },
                                }, "sass-loader"],
                        },
                    ]
                }

            ]
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
