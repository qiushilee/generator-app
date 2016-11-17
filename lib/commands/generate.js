module.exports = function(cli, env) {
  function generate(args) {
    let blueprintName = args[0];
    let name = args[1];
    env.run(`app:${blueprintName} ${name}`);
  }
  cli.set('g', generate);
  cli.set('generate', generate);
};
