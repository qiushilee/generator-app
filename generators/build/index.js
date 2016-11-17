const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  run: function() {
    try {
      this.spawnCommand('webpack');
    } catch (err) {
      console.log(`\n\build: ${err}`);
    }
  }
});
