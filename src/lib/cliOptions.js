'use strict';

module.exports = {
  config: {
    alias: 'c',
    description:
      'The path to a jest config file specifying how to find and execute ' +
      'tests. If no rootDir is set in the config, the directory of the ' +
      'config file is assumed to be the rootDir for the project.',
    type: 'string'
  },
  coverage: {
    description:
      'Indicates that test coverage information should be collected and ' +
      'reported in the output.',
    type: 'boolean'
  },
  maxWorkers: {
    alias: 'w',
    description:
      'Specifies the maximum number of workers the worker-pool will spawn ' +
      'for running tests. This defaults to the number of the cores ' +
      'available on your machine. (its usually best not to override this ' +
      'default)',
    type: 'string' // no, optimist -- its a number.. :(
  },
  onlyChanged: {
    alias: 'o',
    description:
      'Attempts to identify which tests to run based on which files have ' +
      'changed in the current repository. Only works if you\'re running ' +
      'tests in a git repository at the moment.',
    type: 'boolean'
  },
  runInBand: {
    alias: 'i',
    description:
      'Run all tests serially in the current process (rather than creating ' +
      'a worker pool of child processes that run tests). This is sometimes ' +
      'useful for debugging, but such use cases are pretty rare.',
    type: 'boolean'
  },
  testEnvData: {
    description:
      'A JSON object (string) that specifies data that will be made ' +
      'available in the test environment (via jest.getEnvData())',
    type: 'string'
  },
  testPathPattern: {
    description:
      'A regexp pattern string that is matched against all tests ' +
      'paths before executing the test.',
    type: 'string'
  },
  version: {
    alias: 'v',
    description:
      'Print the version and exit',
    type: 'boolean'
  },
  noHighlight: {
    description:
      'Disables test results output highlighting',
    type: 'boolean'
  },
  verbose: {
    description:
      'Display individual test results with the test suite hierarchy.',
    type: 'boolean'
  },
  bail: {
    alias: 'b',
    description:
      'Exit the test suite immediately upon the first failing test.',
    type: 'boolean'
  }
};
