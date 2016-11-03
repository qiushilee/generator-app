const path = require('path');
const webpack = require('webpack');
const WebpackBrowserPlugin = require('webpack-browser-plugin');

module.exports = {
  cache: true,
  entry: {
    main: ['webpack/hot/dev-server', path.join(__dirname, 'app') + '/app.js'],
    vendor: [
      'jquery',
      'backbone',
      'lodash',
<% if (echarts.length > 0) { -%>
      'echarts/lib/echarts',
<% } -%>
<% echarts.forEach((chart) => { -%>
      'echarts/lib/chart/<%= chart %>',
<% }); -%>
<% if (echarts.length > 0) { -%>
      'echarts/lib/component/axis',
      'echarts/lib/component/legend',
      'echarts/lib/component/tooltip',
      'echarts/lib/component/title'
<% } -%>
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/tmp') + '/scripts',
    publicPath: 'dist/tmp/scripts',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader?presets[]=es2015', 'eslint-loader'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.hbs$/, loader: 'handlebars-template-loader', query: { prependFilenameComment: __dirname } },
      { test: /\.png/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url-loader?limit=8192' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.otf$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  resolve: {
    // Absolute path that contains modules
    root: './',

    // Directory names to be searched for modules
    modulesDirectories: ['app/utils', 'node_modules'],
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "vendor", /* filename= */ "vendor.bundle.js"),
    new WebpackBrowserPlugin({
      port: 9000,
      url: 'http://localhost'
    })
  ],
  node: {
    fs: 'empty' // avoids error messages(handlebars-template-loader)
  },
  devServer: {
    hot: true,
    contentBase: 'app',
    publicPath: '/tmp/scripts',
    stats: {
      colors: true
    }
  }
};
