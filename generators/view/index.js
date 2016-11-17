const generators = require('yeoman-generator');
const htmlWiring = require('html-wiring');
const fs = require('fs');

module.exports = generators.Base.extend({
  constructor: function(arg) {
    generators.Base.apply(this, arguments);
    if (arg[0]) {
      this.options.name = arg[0];
    }
    this.data = {
      name: this.options.name,
      model: this.config.get(`${this.options.name}Model`)
    };
  },
  setupEnv: function() {
    try {
      this.viewPath = `app/web/${this.options.name}`;
      fs.mkdirSync(this.viewPath);
      fs.mkdirSync(`${this.viewPath}/views`);
      fs.mkdirSync(`${this.viewPath}/models`);
      fs.mkdirSync(`${this.viewPath}/templates`);
      fs.mkdirSync(`${this.viewPath}/styles`);
    } catch(e) {}
  },
  templates: function() {
    this.fs.copyTpl(
      this.templatePath('main.hbs'),
      this.destinationPath(`${this.viewPath}/templates/main.hbs`),
      this.data
    );
  },
  scss: function() {
    this.fs.copyTpl(
      this.templatePath('main.scss'),
      this.destinationPath(`${this.viewPath}/styles/main.scss`)
    );
  },
  view: function() {
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath(`${this.viewPath}/view.js`),
      this.data
    );

    if (this.options.skipChange) {
      return;
    }
  },
  updateRouter: function() {
    try {
      const routerPath = 'app/router.js';
      let routerFile = htmlWiring.readFileAsString(routerPath);
      //Import view
      routerFile = routerFile.replace(/';\n\n/, `';\nimport ${this.options.name} from './web/${this.options.name}/view';\n\n`);
      //Add route
      if (routerFile.match(/}\);\n  }/)) {
        routerFile = routerFile.replace(/}\);\n  }/, `});\n
      this.route('${this.options.name}', '${this.options.name}', function() {
        this.view.destroy();
        this.view = new ${this.options.name}();
      });\n  }`);
      } else {
        //First
        routerFile = routerFile.replace(/\n  }\n/, `
      this.route('', '${this.options.name}', function() {
        this.view.destroy();
        this.view = new ${this.options.name}();
      });\n  }\n`);
      }
      this.fs.write(this.destinationPath(routerPath), routerFile);
    } catch(e) {}
  }
});
