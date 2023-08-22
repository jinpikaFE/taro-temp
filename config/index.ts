const path = require("path");

const config = {
  projectName: "fd-project-h5",
  date: "2023-8-22",
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  alias: {
    "@": path.resolve(__dirname, "..", "src"),
  },
  plugins: ["@tarojs/plugin-html"],
  defineConstants: {},
  copy: {
    patterns: [
      // {
      //   from: 'src/MP_verify_6GakszzXVRv1b32R.txt',
      //   to: 'dist/MP_verify_6GakszzXVRv1b32R.txt',
      // },
      // {
      //   from: 'src/MP_verify_AURjVTOzCe8AhsxM.txt',
      //   to: 'dist/MP_verify_AURjVTOzCe8AhsxM.txt',
      // },
      // {
      //   from: 'src/MP_verify_6GakszzXVRv1b32R.txt',
      //   to: 'dist-pro/MP_verify_6GakszzXVRv1b32R.txt',
      // },
      // {
      //   from: 'src/MP_verify_AURjVTOzCe8AhsxM.txt',
      //   to: 'dist-pro/MP_verify_AURjVTOzCe8AhsxM.txt',
      // },
    ],
    options: {},
  },
  framework: "react",
  compiler: "webpack5",
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ["nut-"],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    // esnextModules: ['nutui-react'],
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ["nut-"],
        },
      },
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  /** APP_ENV 必须前置在 NODE_ENV 逻辑前 */
  if (process.env.APP_ENV === "pro") {
    return merge({}, config, require("./pro"));
  }
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
