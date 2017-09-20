function Demo01(options = {}) {
  // 参数启动插件实例
  this.options = options;
}

Demo01.prototype.apply = (compiler) => {
  compiler.plugin('done', () => {
    console.log(this.options);
  });
};

module.exports = Demo01;
