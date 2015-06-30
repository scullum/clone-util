'use strict';

var _ = require('lodash');
var github = require('github-request');
var clone = require('git-clone');
var rimraf = require('rimraf');
var chalk = require('chalk');
var opts = require('nomnom').parse();

//output colors;
var error = chalk.bgRed;
var notice = chalk.bgBlue;

var targetDir = './output/';
var user = opts.user;

if (!user) {
  console.log(error('No user specified'));
  return;
}

// remove directory;
rimraf(targetDir, function(err) {
  if (err) {
    console.log(error(err));
    return;
  } else {
    console.log(notice('Removing old clones!') + '\n');
  }
});

// clone all users repo
github.request({
  path: '/users/' + user + '/repos'
}, function(err, repos) {
  if (err) {
    console.log(error(err));
  }
  _.each(repos, function(data) {
    var name = data.name;
    clone(data.clone_url, targetDir + name, {}, function(err) {
      if (err) {
        console.log(error(err));
        return;
      }
      console.log(notice(name) + ' clone has completed \n ');
    });
  });
});
