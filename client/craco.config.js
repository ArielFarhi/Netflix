const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        alias: {
          '@': path.resolve(__dirname, 'src'),  
        },
      };
      webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
        if (
          rule.use &&
          rule.use.find((u) => u.loader && u.loader.includes("source-map-loader"))
        ) {
          rule.exclude = /node_modules/;
        }
        return rule;
      });
      return webpackConfig;
    },
  },
};
