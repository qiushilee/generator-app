const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  npm: function() {
    try {
      this.installDependencies({ bower: false, npm: true });
    } catch (err) {
      console.log(`\n\nnpmInstall: ${err}`);
    }
  }
});
