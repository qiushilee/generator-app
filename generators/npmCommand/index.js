const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function(arg) {
    generators.Base.apply(this, arguments);
    this.command = arg[0];
  },
  run: function() {
    try {
      this.spawnCommand('npm', [this.command]);
    } catch (err) {
      console.log(`\n\nnpmCommand: ${err}`);
    }
  }
});
