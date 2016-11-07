const generators = require('yeoman-generator');
const htmlWiring = require('html-wiring');

module.exports = generators.Base.extend({
  constructor: function(arg) {
    generators.Base.apply(this, arguments);
    if (arg[0]) {
      this.options.name = arg[0];
    }
  },
  writing: function() {
    if (this.config.get(`${this.options.name}Model`)) {
      this.log('backbone:model\t\tModel 已存在，当前不允许覆盖或创建多个Model。')
      return false;
    }
    const pagePath = `${this.config.get('basePath')}/app/web/${this.options.name}`;
    const modelPath = this.destinationPath(`${pagePath}/model.js`);
    this.fs.copyTpl(this.templatePath('main.js'), modelPath, { name: this.options.name });
    this.config.set(`${this.options.name}Model`, true);

    if (this.options.skipChange) {
      return;
    }

    //Update view
    try {
      let viewFile = htmlWiring.readFileAsString(`${pagePath}/view.js`);
      viewFile = viewFile
      .replace(/';\n\n/, `';\nimport Model from './model';\n\n`)
      .replace(/,\n\n  initialize/, ',\n\n  model: new Model(),\n\n  initialize')
      .replace(/destroy: function\(\) {/, 'destroy: function() {\n    this.model.destroy();');
      this.fs.write(`${pagePath}/view.js`, viewFile);
    } catch(e) {
      console.log('No view');
    }
  }
});
