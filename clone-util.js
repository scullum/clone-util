var _ = require("lodash");
var github = require("github-request");
var clone = require('git-clone');
var rimraf = require('rimraf');
var clc = require('cli-color');

var targetDir = './output/';

//output colors;
var error = clc.red;
var notice = clc.blue;

// remove directory;
rimraf(targetDir, function(err) {
    if (err) console.log(error(err));
});

// clone all users repo
github.request({
    path: "/users/scullum/repos"
}, function(err, repos) {
    if (err) console.log(error(err));
    _.each(repos, function(data) {
    	var name = data.name;
        clone(data.clone_url, targetDir + name, {}, function(err) {
            if (err) {
                console.log(error(err));
                // return;
            }
            console.log(notice(name) + ' clone has completed');
            console.log('****************');
        });
    });
});