/* eslint-disable */
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css')

const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
);

module.exports = withBundleAnalyzer(withCSS(withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  distDir: 'build',
  compress: false,
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  },
})));
