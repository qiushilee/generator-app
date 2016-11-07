#!/usr/bin/env node
const fs = require('fs');
const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();
process.title = 'app';
let cli = new Map();
cli.set('new', function (args) {
  let appName = args[0];
  env.run(`app:app ${appName}`, function() {
    env.run('app:router main', {views: ['home']}, function() {
      env.run('app:view home', function() {
        env.run('app:model home');
      });
    });
  });
});
cli.set('g', function (args) {
  let blueprintName = args[0];
  let name = args[1];
  env.run(`app:${blueprintName} ${name}`);
});
cli.set('generate', cli.get('g'));
cli.set('help', function() {
  console.log(fs.readFileSync(require.resolve('./USAGE')).toString());
});
try {
  env.register(require.resolve('./generators/app'), 'app:app');
  env.register(require.resolve('./generators/router'), 'app:router');
  env.register(require.resolve('./generators/view'), 'app:view');
  env.register(require.resolve('./generators/model'), 'app:model');
  env.register(require.resolve('./'), 'app:app');
} catch (e) {
  console.error('请先运行 npm link.\n', e);
}
let args = process.argv.slice(2);
cli.get(args.shift())(args);
