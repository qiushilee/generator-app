const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();
const cNew = require('./new');
const cRun = require('./run');
const cBuild = require('./build');
const cGenerate = require('./generate');
const cHelp = require('./help');
try {
  env.register(require.resolve('../../generators/app'), 'app:app');
  env.register(require.resolve('../../generators/router'), 'app:router');
  env.register(require.resolve('../../generators/view'), 'app:view');
  env.register(require.resolve('../../generators/model'), 'app:model');
  //env.register(require.resolve('./'), 'app:app');
  env.registerStub(require('../../generators/npmInstall'), 'npm:install');
  env.registerStub(require('../../generators/npmCommand'), 'npm:command');
  env.registerStub(require('../../generators/build'), 'build');
} catch (e) {
  console.error('请先运行 npm link.\n', e);
}
let cli = new Map();
cNew(cli, env);
cRun(cli, env);
cBuild(cli, env);
cGenerate(cli, env);
cHelp(cli);
module.exports = cli;
