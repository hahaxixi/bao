define("scripts/control.js", function(exports, require, module) {
  "use strict";

  var tools = require("scripts/tools");
  var drag = require("scripts/drag");
  var knife = require("scripts/knife");
  var layout = require("scripts/layout");

  exports.bindDrag = function(callback) {
    var dragger = drag.create();

    var ret;
    dragger.on("returnValue", function(dx, dy, x, y) {
      if (ret = knife.through(x - layout.x(), y - layout.y()))
        callback(ret);
    });

    dragger.on("startDrag", function() {
      knife.newKnife();
    });

    dragger.init(document.documentElement);
  };

  exports.bindClick = function(callback) {
    var isTouch = "ontouchstart" in window;
    var CLICK = isTouch ? "touchend" : "click";
    tools.addEvent(document, CLICK, callback);
  };

});
