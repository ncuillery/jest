#!/usr/bin/env node
/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
/* jshint node: true */
'use strict';

var fs = require('fs');
var harmonize = require('harmonize');
var optimist = require('optimist');
var path = require('path');
var cliOptions = require('../src/lib/cliOptions');

/**
 * Takes a description string, puts it on the next line, indents it, and makes
 * sure it wraps without exceeding 80chars
 */
function _wrapDesc(desc) {
  var indent = '\n      ';
  return indent + desc.split(' ').reduce(function(wrappedDesc, word) {
    var lastLineIdx = wrappedDesc.length - 1;
    var lastLine = wrappedDesc[lastLineIdx];

    var appendedLastLine = lastLine === '' ? word : (lastLine + ' ' + word);

    if (appendedLastLine.length > 80) {
      wrappedDesc.push(word);
    } else {
      wrappedDesc[lastLineIdx] = appendedLastLine;
    }

    return wrappedDesc;
  }, ['']).join(indent);
}

harmonize();

Object.keys(cliOptions).forEach(function (key) {
  cliOptions[key].description = _wrapDesc(cliOptions[key].description);
});

var argv = optimist
  .usage('Usage: $0 [--config=<pathToConfigFile>] [TestPathRegExp]')
  .options(cliOptions)
  .check(function(argv) {
    if (argv.runInBand && argv.hasOwnProperty('maxWorkers')) {
      throw (
        'Both --runInBand and --maxWorkers were specified, but these two ' +
        'options do not make sense together. Which is it?'
      );
    }

    if (argv.onlyChanged && argv._.length > 0) {
      throw (
        'Both --onlyChanged and a path pattern were specified, but these two ' +
        'options do not make sense together. Which is it? Do you want to run ' +
        'tests for changed files? Or for a specific set of files?'
      );
    }

    if (argv.testEnvData) {
      argv.testEnvData = JSON.parse(argv.testEnvData);
    }
  })
  .argv;

if (argv.help) {
  optimist.showHelp();

  process.on('exit', function(){
    process.exit(1);
  });

  return;
}

var cwd = process.cwd();

// Is the cwd somewhere within an npm package?
var cwdPackageRoot = cwd;
while (!fs.existsSync(path.join(cwdPackageRoot, 'package.json'))) {
  if (cwdPackageRoot === '/') {
    cwdPackageRoot = cwd;
    break;
  }
  cwdPackageRoot = path.resolve(cwdPackageRoot, '..');
}

// Is there a package.json at our cwdPackageRoot that indicates that there
// should be a version of Jest installed?
var cwdPkgJsonPath = path.join(cwdPackageRoot, 'package.json');

// Is there a version of Jest installed at our cwdPackageRoot?
var cwdJestBinPath = path.join(cwdPackageRoot, 'node_modules/jest-cli');

// Get a jest instance
var jest;

if (fs.existsSync(cwdJestBinPath)) {
  // If a version of Jest was found installed in the CWD package, use that.
  jest = require(cwdJestBinPath);

  if (!jest.runCLI) {
    console.error(
      'This project requires an older version of Jest than what you have ' +
      'installed globally.\n' +
      'Please upgrade this project past Jest version 0.1.5'
    );

    process.on('exit', function(){
       process.exit(1);
    });

    return;
  }
} else {
  // Otherwise, load this version of Jest.
  jest = require('../');

  // If a package.json was found in the CWD package indicating a specific
  // version of Jest to be used, bail out and ask the user to `npm install`
  // first
  if (fs.existsSync(cwdPkgJsonPath)) {
    var cwdPkgJson = require(cwdPkgJsonPath);
    var cwdPkgDeps = cwdPkgJson.dependencies;
    var cwdPkgDevDeps = cwdPkgJson.devDependencies;

    if (cwdPkgDeps && cwdPkgDeps['jest-cli']
        || cwdPkgDevDeps && cwdPkgDevDeps['jest-cli']) {
      console.error(
        'Please run `npm install` to use the version of Jest intended for ' +
        'this project.'
      );

      process.on('exit', function(){
        process.exit(1);
      });

      return;
    }
  }
}

if (!argv.version) {
  console.log('Using Jest CLI v' + jest.getVersion());
}

jest.runCLI(argv, cwdPackageRoot, function (success) {
  process.on('exit', function(){
    process.exit(success ? 0 : 1);
  });
});

module.exports = argv;
