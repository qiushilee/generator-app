const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function(arg) {
    generators.Base.apply(this, arguments);
    if (arg[0]) {
      this.options.name = arg[0];
    }
  },
  writing: function() {
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath(`${this.config.get('appname')}/app/routes/${this.options.name}.js`),
      this.options
    );
  }
});
