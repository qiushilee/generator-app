#!/usr/bin/env node
const Command = require('./lib/commands');
process.title = 'webapp';
let args = process.argv.slice(2);
Command.get(args.shift())(args);
