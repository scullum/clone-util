var _ = require("lodash");
var github = require("github-request");
var clone = require('git-clone');
var rimraf = require('rimraf');
var clc = require('cli-color');

var targetDir = './repos/';


// remove directory
rimraf(targetDir, function(err) {
    if (err) console.log(err);
});

// clone all users repo
github.request({
    path: "/users/AKQADC/repos"
}, function(err, repos) {
    if (err) console.log(err);
    _.each(repos, function(data) {
        clone(data.clone_url, targetDir + data.name, {}, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(clc.red(data.name) + ' clone has completed');
            console.log('****************');
        });
    });
});