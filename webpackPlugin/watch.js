function Watch(callback = null) {
  this.callback = callback;
}

Watch.prototype.apply = function (compiler) {
  compiler.plugin('done', this.callback);
};

module.exports = Watch;
