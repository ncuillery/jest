/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RegularModule
 */

'use strict';

// For some reason thinks it's a strict violation.
if (exports !== this) {
  throw new Error('Invalid module context');
}

var moduleStateValue = 'default';

function setModuleStateValue(value) {
  moduleStateValue = value;
}

function getModuleStateValue() {
  return moduleStateValue;
}

exports.getModuleStateValue = getModuleStateValue;
exports.isRealModule = true;
exports.setModuleStateValue = setModuleStateValue;
exports.parent = module.parent;
