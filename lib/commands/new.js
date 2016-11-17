module.exports = function(cli, env) {
  cli.set('new', function (args) {
    let appName = args[0];
    env.run(`app:app ${appName}`, function() {
      env.run('app:router main', {views: []}, function() {
        env.run('app:view home', function() {
          env.run('app:model home', function() {
            env.run('npm:install');
          });
        });
      });
    });
  });
};
