---
id: cli
title: CLI Reference
layout: docs
category: Reference
permalink: docs/cli.html
---

Jest comes with a CLI accessible by installing the package globally. Type
`jest --help` in your terminal to show the options.

#### Usage

The general usage is `jest [options] [TestPathRegExp]`. *Options* are detailed
below. *TestPathRegExp* is a string matched against each test files to
decide to run it or not.

Note that the pattern is evaluated against the absolute paths of test files.
It makes easy launch all tests within a directory:

`jest modules/user`

or all tests of a kind:

`jest .controller.spec.js`

#### Options

<generated_toc_start />

  - [`--bail`](#bail-boolean)
  - [`--config`](#config-string)
  - [`--coverage`](#coverage-boolean)
  - [`--maxWorkers`](#maxworkers-string)
  - [`--noHighlight`](#nohighlight-boolean)
  - [`--onlyChanged`](#onlychanged-boolean)
  - [`--runInBand`](#runinband-boolean)
  - [`--testEnvData`](#testenvdata-string)
  - [`--testPathPattern`](#testpathpattern-string)
  - [`--verbose`](#verbose-boolean)
  - [`--version`](#version-boolean)

<generated_toc_end />

-----


<generated_content_start />

### `bail` [boolean]
(alias `b`)

Exit the test suite immediately upon the first failing test.

### `config` [string]
(alias `c`)

The path to a jest config file specifying how to find and execute tests. If no rootDir is set in the config, the directory of the config file is assumed to be the rootDir for the project.

### `coverage` [boolean]

Indicates that test coverage information should be collected and reported in the output.

### `maxWorkers` [string]
(alias `w`)

Specifies the maximum number of workers the worker-pool will spawn for running tests. This defaults to the number of the cores available on your machine. (its usually best not to override this default)

### `noHighlight` [boolean]

Disables test results output highlighting

### `onlyChanged` [boolean]
(alias `o`)

Attempts to identify which tests to run based on which files have changed in the current repository. Only works if you're running tests in a git repository at the moment.

### `runInBand` [boolean]
(alias `i`)

Run all tests serially in the current process (rather than creating a worker pool of child processes that run tests). This is sometimes useful for debugging, but such use cases are pretty rare.

### `testEnvData` [string]

A JSON object (string) that specifies data that will be made available in the test environment (via jest.getEnvData())

### `testPathPattern` [string]

A regexp pattern string that is matched against all tests paths before executing the test.

### `verbose` [boolean]

Display individual test results with the test suite hierarchy.

### `version` [boolean]
(alias `v`)

Print the version and exit


<generated_content_end />
