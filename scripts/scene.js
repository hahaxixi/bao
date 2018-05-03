define("scripts/scene.js", function(exports, require, module) {
  "use strict";

  var soundManager = require("scripts/sound-manager");
  var fruitManager = require("scripts/fruit-manager");
  var control = require("scripts/control");
  var layout = require("scripts/layout");
  var layer = require("scripts/layer");
  var tools = require("scripts/tools");

  var background = require("scripts/object/background");
  var logo = require("scripts/object/logo");
  var newGame = require("scripts/object/new-game");
  var score = require("scripts/object/score");
  var mistake = require("scripts/object/mistake");
  var gameOver = require("scripts/object/game-over");

  var game = require("scripts/game");

  var newGameIcon;
  var gameOverState;
  var curScene;

  var _sceneHomeMenu = {
    enter: function() {
      logo.show();
      newGame.setIcon("winnie", 96, 96, function(){
        soundManager.play("winnie");
        switchScene("game-body");
      });
      setTimeout(newGame.show, 2000);
    },

    exit: function() {
      newGame.hide();
      logo.hide();
    }
  };

  var _sceneGameBody = {
    enter: function() {
      score.show();
      mistake.show();
      game.start(function() {
        switchScene("game-over");
      });
    },

    exit: function() {}
  };

  var _sceneGameOver = {
    enter: function() {
      soundManager.play("gameover");
      gameOver.show();
      setTimeout(function() {
        gameOverState = true;
      }, 1000);
    },

    exit: function() {
      gameOverState = false;
      score.hide();
      mistake.hide();
      gameOver.hide();
    }
  };

  var sceneList = {
    "home-menu": _sceneHomeMenu,
    "game-body": _sceneGameBody,
    "game-over": _sceneGameOver
  };

  function switchScene(name, delay) {
    if (curScene === name)
      return;
    if (curScene)
      sceneList[curScene].exit();
    curScene = name;

    if (delay) {
      setTimeout(sceneList[name].enter, delay);
    } else {
      sceneList[name].enter();
    }
  }

  var inited = false;
  function init() {
    if (inited) return;

    logo.set();
    newGame.set();
    mistake.set();
    score.set();
    gameOver.set();

    control.bindDrag(function(knife) {
      fruitManager.checkCollision(knife);
    });

    control.bindClick(function() {
      if (gameOverState)
        switchScene("home-menu", 1000);
    });

    resize();
    inited = true;
  }

  function resize() {
    layer.resize();
    background.resize();
    if (inited) {
      logo.resize();
      newGame.resize();
      mistake.resize();
      score.resize();
      gameOver.resize();
    }
  }

  background.set();
  tools.addEvent(window, "resize", resize);

  exports.init = init;
  exports.switchScene = switchScene;

});
