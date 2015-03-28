/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactMultiWindowHelper
 */

'use strict';

var ReactMount = require('./ReactMount');
var NwGuiWindow;
var curWindowKey = 'curWindow' + (+new Date);

var renderNewWindow;

if (window.nwDispatcher) {
  NwGuiWindow = window.nwDispatcher.requireNwGui().Window;
  renderNewWindow = function(element, config, callback) {
    var newWin = NwGuiWindow.open('about://', config);
    newWin.on('loaded', function() {
      element.props.currentWindow = newWin.window;
      newWin.window.document[curWindowKey] = newWin.window;
      var component = ReactMount.render(element, newWin.window.document.body, function() {
        setTimeout(function() {
          callback && callback(component);
        }, 0);
      });
    });
    newWin.on('close', function() {
      ReactMount.unmountComponentAtNode(newWin.window.document.body);
      this.close(true);
    });
  };
}
else {
  renderNewWindow = function() {
    throw new Error('TODO: Only supports nw.js for now');
  }
}

// TODO: Only supports nw.js for now,
// we will add better normal-browser support in the future.
var ReactMultiWindowHelper = {
  renderNewWindow: renderNewWindow,
  getContainWindowOfNode: function(node) {
    return node.ownerDocument[curWindowKey] || window;
  }
};

module.exports = ReactMultiWindowHelper;