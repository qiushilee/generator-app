const fs = require('fs');
const generators = require('yeoman-generator');
const path = require('path');

module.exports = generators.Base.extend({
  initialize: function() {
    this.config.save();
  },
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('appname', {
      desc: '项目名称，将创建一个新的目录',
      required: true,
      type: String,
      defaults: 'WebApplication'
    });
    this.basePath = path.resolve(`./${this.appname}`);
    this.config.set('basePath', this.basePath);
    this.config.set('appname', this.appname);
  },
  prompting: function () {
    return this.prompt([{
      type    : 'checkbox',
      name    : 'echarts',
      message : '需要 Echarts 图表吗？',
      choices: [
        {
          name: '折线图',
          value: 'line'
        },
        {
          name: '圆饼',
          value: 'pie'
        },
        {
          name: '柱状图',
          value: 'bar'
        }
      ]
    }]).then(function (answers) {
      this.config.set('echarts', answers.echarts);
    }.bind(this));
  },
  setupEnv: function() {
    fs.mkdirSync(this.basePath);
    fs.mkdirSync(`${this.basePath}/app`);
    fs.mkdirSync(`${this.basePath}/app/routes`);
    fs.mkdirSync(`${this.basePath}/app/web`);
  },
  write: function() {
    const data = this.config.getAll();
    //Project files
    [
      'webpack.config.js',
      '.editorconfig',
      '.eslintrc',
      '.eslintignore',
      '.gitignore'
    ].forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(`${this.config.get('basePath')}/${file}`),
        data
      );
    });

    this.fs.copyTpl(
      this.templatePath('common.css'),
      this.destinationPath(`${this.config.get('basePath')}/app/common.css`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(`${this.config.get('basePath')}/app/index.html`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(`${this.config.get('basePath')}/package.json`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`${this.config.get('basePath')}/app/app.js`),
      data
    );
  },
  npm: function() {
    try {
      process.chdir(this.config.get('basePath'));
      this.installDependencies({
        bower: false,
        npm: true,
        skipInstall: this.options['skip-install'],
        //TODO check npm installed
        callback: (() => this.spawnCommand('npm', ['start']))
      });
    } catch (err) {
      console.log(`chdir: ${err}`);
    }
  }
});
