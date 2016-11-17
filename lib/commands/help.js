const fs = require('fs');

module.exports = function(cli) {
  cli.set('help', function() {
    console.log(fs.readFileSync(require.resolve('./USAGE')).toString());
  });
};
