// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  //sourceMap 原映射
  devtool: "inline-source-map",
  // 打包环境 默认是生产环境 production
  // 如果是开发环境 这里需要换成 development
  // 接下来为了观察打包后的文件，使用 development
  mode: "development",
  entry: {
    //入口文件
    app: "/src/index.tsx",
  },
  output: {
    //出口文件
    publicPath: "/",
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.[hash].js",
  },
  devServer: {
    // historyApiFallback: true,
    // contentBase: path.join(__dirname, "./dist"),
    // quiet: true,
    open: true, //项目启动直接打开
    hot: true, //开启热更新
    port: 8888, //端口号
    static: "./public", //指向静态文件
  },
  module: {
    rules: [
      {
        // es5转换es5
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node-modules/",
      },
      {
        // Images
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        //解析字体文件
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      {
        // CSS, PostCSS, and Sass
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    //插件
    new HtmlWebpackPlugin({
      title: "react-antd-admin", //对应html文件 title
      template: path.resolve(__dirname, "./public/index.html"), //html配置路径
      filename: "index.html",
    }),
    //打包前清除上次打包
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": require("path").resolve(__dirname, "./src"),
    },
  },
};
