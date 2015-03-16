/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getActiveElement
 * @typechecks
 */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document body is not yet defined.
 */
// TODO: Need to get the current window object from callers. Block errors for now.
function getActiveElement() /*?DOMElement*/ {
  try {
    return window.document.activeElement || window.document.body;
  } catch (e) {
    return window.document.body;
  }
}

module.exports = getActiveElement;
