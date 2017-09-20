const WebpackWatcher = require('webpack-watcher');
const webpack = require('webpack');
const notifier = require('node-notifier');
// const process = require('process');
const config = require('./webpack.config.js');

const compiler = webpack(config);

// console.log(webpack);
// console.log('===============================');

// console.log(compiler);
const watcher = new WebpackWatcher(compiler, {
  watch: true,
  watchDelay: 200,
  useMemoryFS: true,
});

const autoWatcher = (err, stats) => {
  // stats: {
  //   compilation, hash, startTime, endTime,
  // }
  // err: {
  //   name, message, details, module, error, origin, dependencies
  // }
  if (err) {
    const { name, message, error, origin, dependencies } = err;
    notifier.notify({
      title: name,
      message,
    });
    console.log(`
      error: ${error},
      ${origin ? `origin: ${origin},` : ''}
      ${dependencies ? `dependencies: ${dependencies},` : ''}
    `);
  } else {
    const { compilation, hash, startTime, endTime } = stats;
    notifier.notify({
      title: 'webpack done success',
      message: `
        cost: ${endTime - startTime} ms
        idk wtf is hashNum but print it: ${hash}
      `,
    });
    console.log(compilation.warnings);
  }
};

watcher.onDone((err, stats) => {
  autoWatcher(err, stats);
});

watcher.watch();

// console.log(process.args);
