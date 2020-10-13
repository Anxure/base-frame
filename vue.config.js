const { resolve } = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin// 打包文件分析
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const openGzip = false // 是否开启gzip压缩
const IS_ANALYZ = true // 是否开启打包分析
const productionGzipExtensions = ['js', 'css', 'json', 'txt', 'html', 'ico', 'svg']
module.exports = {
  // 项目部署的基本路径
  // 默认假设你的应用将会部署在域名的根部
  // 比如，https://www.vue-cli.com/
  // 如果你的应用是部署在一个子路径下，那么你需要在这里指定子路径，比如，如果你部署在 https://www.my-vue.com/my-app/; 那么将这个值改为 “/my-app/”
  publicPath: IS_PRODUCTION ? process.env.VUE_APP_SRC || './' : './', // 默认'/'，部署应用包时的基本 URL

  // 将构建好的文件输出到哪里 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: process.env.outputDir || 'dist', // 'dist',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: '',

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  // 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  // 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'error'。这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
  lintOnSave: IS_PRODUCTION ? true : 'error',

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  configureWebpack: config => {
    if (IS_PRODUCTION) {
      if (openGzip) {
        config.plugins = [
          ...config.plugins,
          new CompressionWebpackPlugin({
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false // 不删除源文件
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // 移除项目中的console,debugger
    config.optimization.minimizer('terser').tap(args => {
      args[0].terserOptions.compress.drop_console = true
      args[0].terserOptions.compress.drop_debugger = true
      return args
    })
    // 解决入口文件大于244KB打包报警告的问题
    config.performance.set('hints', false)
    // 添加文件别名
    config.resolve.alias.set('@', resolve('src'))
    config.when(IS_PRODUCTION, config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk('single');
    })
    // 是否开启打包分析
    if (IS_ANALYZ && IS_PRODUCTION) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
  },
  // 构建多页应用，单页应用的话使用默认的就可以
  //   pages: {
  //     index: {
  //         // 入口文件
  //         entry: './src/main.js',
  //         // 模版文件
  //         template: 'public/index.html',
  //         // 输出文件名
  //         filename: 'index.html'
  //     }
  // },
  css: {
    extract: IS_PRODUCTION,
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量
        prependData: '@import "@/assets/style/variables.scss";'
      },
      less: {
        javascriptEnabled: true
      }
      // rem转换 不需要的可以注释
      // postcss: {
      //   plugins: [
      //     require('postcss-px2rem')({ remUnit: 100 }) // 换算的基数
      //   ]
      // }
    }
  },
  devServer: {
    host: 'localhost',
    progress: true,
    port: 8089, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
    proxy: {
      '/api': {
        ws: false,
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: require('./mock/index.js')
  }
}
