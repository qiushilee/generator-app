module.exports = function(cli, env) {
  cli.set('run', function() {
    env.run('npm:command start');
  });
};
