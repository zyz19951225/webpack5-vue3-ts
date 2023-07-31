const {merge} = require("webpack-merge");
const common = require("./webpack.common")
const path = require("path"); // 引用path模块
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const os = require("os");
// cpu核数
const threads = os.cpus().length;
module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "../dist"),
        clean: true,
        filename: "static/js/[name].js", // 入口文件打包输出资源命名方式
        chunkFilename: "static/js/[name].chunk.js", // 动态导入输出资源命名方式
        assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    },
    module: {},
    plugins: [
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/[name].css",
            chunkFilename: "static/css/[name].chunk.css",
        }),
        // css压缩
        // new CssMinimizerPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            // css压缩也可以写到optimization.minimizer里面，效果一样的
            new CssMinimizerPlugin(),
            // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
            new TerserPlugin({
                parallel: threads // 开启多进程
            })
        ],
        // 代码分割配置
        splitChunks: {
            chunks: "all", // 对所有模块都进行分割
            // 以下是默认值
            // minSize: 20000, // 分割代码最小的大小
            // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
            // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
            // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
            // maxInitialRequests: 30, // 入口js文件最大并行请求数量
            // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
            // cacheGroups: { // 组，哪些模块要打包到一个组
            //   defaultVendors: { // 组名
            //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
            //     priority: -10, // 权重（越大越高）
            //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            //   },
            //   default: { // 其他没有写的配置会使用上面的默认值
            //     minChunks: 2, // 这里的minChunks权重更大
            //     priority: -20,
            //     reuseExistingChunk: true,
            //   },
            // },
            // 修改配置
            cacheGroups: {
                // 组，哪些模块要打包到一个组
                // defaultVendors: { // 组名
                //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
                //   priority: -10, // 权重（越大越高）
                //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
                // },
                default: {
                    // 其他没有写的配置会使用上面的默认值
                    minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    devtool: "source-map",
})
