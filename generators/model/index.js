const generators = require('yeoman-generator');
const htmlWiring = require('html-wiring');

module.exports = generators.Base.extend({
  constructor: function(arg) {
    generators.Base.apply(this, arguments);
    if (arg[0]) {
      this.options.name = arg[0];
    }
    this.viewPath = `app/web/${this.options.name}`;
  },
  checkModel: function() {
    if (this.config.get(`${this.options.name}Model`)) {
      this.log('backbone:model\t\tModel 已存在，当前不允许覆盖或创建多个Model。');
      return false;
    }
  },
  model: function() {
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath(`${this.viewPath}/models/main.js`),
      { name: this.options.name }
    );
    this.config.set(`${this.options.name}Model`, true);

    if (this.options.skipChange) {
      return;
    }
  },
  updateView: function() {
    try {
      let viewFile = htmlWiring.readFileAsString(`${this.viewPath}/view.js`)
      .replace(/';\n\n/, `';\nimport Model from './models/main';\n\n`)
      .replace(/,\n\n  initialize/, ',\n\n  model: new Model(),\n\n  initialize')
      .replace(/destroy: function\(\) {/, 'destroy: function() {\n    this.model.destroy();');

      this.fs.write(`${this.viewPath}/view.js`, viewFile);
    } catch(e) {
      console.log('No view');
    }
  }
});
