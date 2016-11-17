module.exports = function(cli, env) {
  cli.set('build', function() {
    env.run('build');
  });
};
