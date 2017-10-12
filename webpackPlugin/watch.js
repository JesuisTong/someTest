
const notifier = require('node-notifier');

function Watch() {
  this.callback = function (stats) {
    const { compilation } = stats;
    const { errors } = compilation;
    console.log(errors);
    if (errors.length !== 0) {
      notifier.notify({
        title: errors[0].name,
        message: errors[0].message,
        sound: 'Submarine',
      });
    } else {
      notifier.notify({
        title: 'webapack success',
        message: `cost ${stats.endTime - stats.startTime}ms`,
      });
    }
  };
}

Watch.prototype.apply = function (compiler) {
  compiler.plugin('done', this.callback);
};

module.exports = Watch;
