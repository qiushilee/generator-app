const fs = require('fs');
const generators = require('yeoman-generator');

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
    this.config.set('skipInstall', this.options['skip-install']);
  },
  prompting: function () {
    return this.prompt([{
      type    : 'checkbox',
      name    : 'echarts',
      message : '需要 Echarts 图表吗？',
      choices: [
        {
          name: '折线图',
          value: 'line',
        },
        {
          name: '圆饼',
          value: 'pie',
        },
        {
          name: '柱状图',
          value: 'bar',
        },
      ]
    }]).then(function (answers) {
      this.config.set('appname', this.appname);
      this.config.set('echarts', answers.echarts);
      this.config.set('router', 'main');
    }.bind(this));
  },
  setupEnv: function() {
    fs.mkdirSync(this.config.get('appname'));
    fs.mkdirSync(`${this.config.get('appname')}/app`);
    fs.mkdirSync(`${this.config.get('appname')}/app/routes`);
    fs.mkdirSync(`${this.config.get('appname')}/app/web`);
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
        this.destinationPath(`${this.config.get('appname')}/${file}`),
        data
      );
    });

    this.fs.copyTpl(
      this.templatePath('common.css'),
      this.destinationPath(`${this.config.get('appname')}/app/common.css`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(`${this.config.get('appname')}/app/index.html`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(`${this.config.get('appname')}/package.json`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`${this.config.get('appname')}/app/app.js`),
      data
    );
  },
  npm: function() {
    try {
      process.chdir(this.config.get('appname'));
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
  },
  install: function() {
    this.composeWith('backbone:router', {
      options: {
        name: this.config.get('router'),
        views: ['home']
      }
    });
    this.composeWith('backbone:view', { options: { name: 'home', skipChange: true } });
    this.composeWith('backbone:model', { options: { name: 'home', skipChange: true } });
  }
});
