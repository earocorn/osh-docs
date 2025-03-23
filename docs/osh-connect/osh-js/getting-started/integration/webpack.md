---
title: Webpack
sidebar_position: 2
---

# Webpack

[Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

You can build your project that depends on OSH using Webpack. To do this, you will need to specify some properties for it to work.


## Recommended Loaders
Webpack uses loaders depending on the type of files used. Here are the recommended ones:

- [file-loader](https://webpack.js.org/loaders/file-loader): for images
- [style-loader](https://webpack.js.org/loaders/style-loader/) and [css-loader](https://webpack.js.org/loaders/css-loader/): for styles
- [worker-loader](https://webpack.js.org/loaders/worker-loader): for WebWorkers (`*.worker.js`)

You can find the full list of loaders [here](https://webpack.js.org/loaders/).

Depending on your framework (like React or Vue.js), you may need to use `babel-loader`.

## Example Configurations

You can find examples of webpack configurations in the following demo projects:

- [React App](https://github.com/opensensorhub/osh-js/blob/master/demos/3dr-solo-uav/3dr-solo-uav-react/webpack.config.js)
- [Vue.js App 1](https://github.com/opensensorhub/osh-js/blob/master/demos/3dr-solo-uav/3dr-solo-uav-vuejs/webpack.config.js)
- [Vue.js App 2](https://github.com/opensensorhub/osh-js/blob/master/demos/dynamic-android/webpack.config.js)
- [Vue.js App 3](https://github.com/opensensorhub/osh-js/blob/master/demos/video-display/video-display-advanced-vuejs/webpack.config.js)
- [Vue.js App 4](https://github.com/opensensorhub/osh-js/blob/master/demos/video-display/video-display-vuejs/webpack.config.js)

Some dependencies like Cesium require more advanced configuration. You can find more showcase examples [here](https://github.com/opensensorhub/osh-js/tree/master/showcase/examples).

## Simple Example

```js title="webpack.config.js"
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'myLib.js'),
  output: {
    filename: 'bundle.myLib.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      'osh-js': path.resolve(__dirname, '../source')
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { name: 'WorkerName.[hash].js' }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    index: 'index.html'
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html')
    })
  ]
};
```

```json title="package.json"
{
  "name": "osh-js",
  "version": "1.3.3",
  "description": "OSH javascript Toolkit",
  "main": "osh.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/opensensorhub/osh-js.git"
  },
  "keywords": [
    "OSH", "Sensors", "Toolkit", "Javascript", "GIS", "Spatial", "OGC", "SensorML"
  ],
  "author": "OSH community",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/opensensorhub/osh-js/issues"
  },
  "homepage": "https://github.com/opensensorhub/osh-js#readme",
  "scripts": {
    "dev": "webpack-dev-server --config webpack.config.js --host 127.0.0.1 --mode development --watch",
    "prod": "webpack --config webpack.config.js --mode production"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "copy-webpack-plugin": "^5.1.1",
    "css-loader": "^3.4.2",
    "file-loader": "^5.1.0",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^1.1.3",
    "webpack": "^4.42.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3",
    "worker-loader": "^2.0.0"
  },
  "dependencies": {}
}

```


### Install Dependencies
Use either `yarn` or `npm` to isntall the dependecies

```bash
yarn install

# or

npm install
```


### Start Dev Server
Start the build command to run the webpack [dev-server](https://webpack.js.org/configuration/dev-server/):

```bash
yarn dev
```


### Build for Production
Run the production to generate static final files:

```bash
yarn prod
```