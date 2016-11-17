const fs = require('fs');
const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('appname', {
      desc: '项目名称，将创建一个新的目录',
      required: true,
      type: String,
      defaults: 'WebApplication'
    });
    this.config.set('appname', this.appname);
  },
  setupEnv: function() {
    fs.mkdirSync('app');
    fs.mkdirSync('app/web');
  },
  projectFile: function() {
    this.data = this.config.getAll();
    [
      'webpack.config.js',
      '.editorconfig',
      '.eslintrc',
      '.eslintignore',
      '.gitignore'
    ].forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.data
      );
    });
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.data
    );
  },
  write: function() {
    this.fs.copyTpl(
      this.templatePath('common.css'),
      this.destinationPath('app/common.css'),
      this.data
    );
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('app/index.html'),
      this.data
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('app/app.js'),
      this.data
    );
  }
});
