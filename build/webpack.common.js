const path = require("path"); // 引用path模块
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;

module.exports = {
     entry:path.resolve(__dirname,"../src/main.ts"),
    // entry: {
    //     main: path.resolve(__dirname,"../src/main.ts"),
    //     app: path.resolve(__dirname,"../src/app.js"),
    // },
    module: {
        rules: [
                    // vue-loader不支持oneOf
                    {
                        test: /\.vue$/,
                        loader: "vue-loader", // 内部会给vue文件注入HMR功能代码
                        options: {
                            // 开启缓存
                            cacheDirectory: path.resolve(
                                __dirname,
                                "node_modules/.cache/vue-loader"
                            ),
                        },
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                            }
                        },
                        // generator: {
                        //     // 将图片文件命名 [hash:8][ext][query]
                        //     // [hash:8]: hash值取8位
                        //     // [ext]: 使用之前的文件扩展名
                        //     // [query]: 添加之前的query参数
                        //     filename: "static/images/[hash:8][ext][query]",
                        // }
                    },
                    {
                        test: /\.(ttf|woff2?|map4|map3|avi)$/,
                        type: "asset/resource",
                        // generator: {
                        //     filename: "static/media/[hash:8][ext][query]",
                        // },
                    },
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/, // 排除node_modules代码不编译
                        include: path.resolve(__dirname, "../src"), // 也可以用包含
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    workers: threads, // 数量
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, // 开启babel编译缓存
                                    cacheCompression: false, // 缓存文件不要压缩
                                    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                                },
                            },
                        ],
                    },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },

        ],
    },
    resolve: {
        extensions: [".vue", ".js", ".json"], // 自动补全文件扩展名，让vue可以使用
    },
    plugins: [
        new DefinePlugin({
            __VUE_OPTIONS_API__: "true",
            __VUE_PROD_DEVTOOLS__: "false",
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,"../public/index.html"),
            filename: "index.html",
            favicon: path.resolve(__dirname,"../public/favicon.ico")
        }),
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules", // 默认值
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
            threads
        }),
    ]
}
