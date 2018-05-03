define("scripts/sound.js", function(exports, require, module) {
  "use strict";

  var buzz = require("scripts/lib/buzz");

  function ClassBuzz(src, opts) {
    var newOpts = {
      formats: ["mp3"],
      preload: true,
      autoload: true,
      loop: false
    };
    if (opts) {
      for (var name in opts) {
        newOpts[name] = opts[name];
      }
    }
    this.sound = new buzz.sound(src, newOpts);
  }

  ClassBuzz.prototype.play = function() {
    this.sound.setPercent(0);
    this.sound.setVolume(100);
    this.sound.play();
  };

  ClassBuzz.prototype.resume = function() {
    this.sound.setVolume(100);
    this.sound.play();
  };

  ClassBuzz.prototype.pause = function() {
    this.sound.fadeOut(1e3, function() {
      this.pause();
    });
  };

  exports.create = function(src, opts) {
    return new ClassBuzz(src, opts);
  };

});
