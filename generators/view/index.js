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
    const destPath = `${this.config.get('appname')}/app/web/${this.options.name}`;
    const data = {
      name: this.options.name,
      model: this.config.get(`${this.options.name}Model`)
    };

    [
      'main.hbs',
      'main.scss'
    ].forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(`${destPath}/${file}`),
        data
      );
    });

    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath(`${destPath}/view.js`),
      data
    );

    if (this.options.skipChange) {
      return;
    }

    //Update router
    const routerPath = `${this.config.get('appname')}/app/routes/${this.config.get('router')}.js`;
    let routerFile = htmlWiring.readFileAsString(routerPath);
    routerFile = routerFile
    .replace(/';\n\n/, `';\nimport ${this.options.name} from '../web/${this.options.name}/view';\n\n`)
    .replace(/}\);\n  }/, `});\n
    this.route('${this.options.name}', '${this.options.name}', function() {
      this.view.destroy();
      this.view = new ${this.options.name}();
    });\n  }`);
    this.fs.write(this.destinationPath(routerPath), routerFile);
  }
});
