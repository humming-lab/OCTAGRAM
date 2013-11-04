// Generated by CoffeeScript 1.6.3
var R, Random, RobotGame, RobotScene, RobotWorld, ViewWorld,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

R = Config.R;

Random = new MersenneTwister();

ViewWorld = (function(_super) {
  __extends(ViewWorld, _super);

  function ViewWorld(x, y, scene) {
    ViewWorld.__super__.constructor.call(this);
    scene.addChild(this);
    this.x = x;
    this.y = y;
    this.background = new Background(0, 0);
    this.header = new Header(16, 16);
    this.map = new Map(16, 68);
    this.footer = new Footer(25, this.map.y + this.map.height);
    this.addChild(this.background);
    this.addChild(this.header);
    this.addChild(this.map);
    this.addChild(this.footer);
  }

  ViewWorld.prototype.initEvent = function(world) {
    this.footer.initEvent(world);
    this.map.initEvent(world);
    return this.header.initEvent(world);
  };

  ViewWorld.prototype.update = function(world) {
    return this.map.update();
  };

  return ViewWorld;

})(Group);

RobotWorld = (function(_super) {
  __extends(RobotWorld, _super);

  function RobotWorld(x, y, scene) {
    var plate,
      _this = this;
    if (RobotWorld.instance != null) {
      return RobotWorld.instance;
    }
    RobotWorld.__super__.constructor.call(this);
    RobotWorld.instance = this;
    this._robots = [];
    this.setup("bullets", []);
    this.setup("items", []);
    this.addObserver("bullets", function(data, method) {
      if (method === "push") {
        return _this.insertBefore(data, _this._robots[0]);
      }
    });
    this.addObserver("items", function(data, method) {
      if (method === "push") {
        return _this.addChild(data);
      }
    });
    this._player = new PlayerRobot(this);
    plate = Map.instance.getPlate(6, 4);
    this._player.moveDirect(plate);
    this._enemy = new EnemyRobot(this);
    plate = Map.instance.getPlate(1, 1);
    this._enemy.moveDirect(plate);
    this._robots.push(this._player);
    this._robots.push(this._enemy);
    scene.addChild(this);
    this.addChild(this._player);
    this.addChild(this._enemy);
  }

  RobotWorld.prototype.initInstructions = function(octagram) {
    var enemyProgram, playerProgram;
    playerProgram = octagram.createProgramInstance();
    enemyProgram = octagram.createProgramInstance();
    this.playerProgramId = playerProgram.id;
    this.enemyProgramId = enemyProgram.id;
    playerProgram.addInstruction(new MoveInstruction(this._player));
    playerProgram.addInstruction(new RandomMoveInstruction(this._player));
    playerProgram.addInstruction(new ApproachInstruction(this._player, this._enemy));
    playerProgram.addInstruction(new LeaveInstruction(this._player, this._enemy));
    playerProgram.addInstruction(new ItemScanMoveInstruction(this._player, this._enemy));
    playerProgram.addInstruction(new ShotInstruction(this._player));
    playerProgram.addInstruction(new TurnEnemyScanInstruction(this._player, this._enemy));
    playerProgram.addInstruction(new HpBranchInstruction(this._player));
    playerProgram.addInstruction(new HoldBulletBranchInstruction(this._player));
    enemyProgram.addInstruction(new MoveInstruction(this._enemy));
    enemyProgram.addInstruction(new RandomMoveInstruction(this._enemy));
    enemyProgram.addInstruction(new ApproachInstruction(this._enemy, this._player));
    enemyProgram.addInstruction(new LeaveInstruction(this._enemy, this._player));
    enemyProgram.addInstruction(new ItemScanMoveInstruction(this._enemy, this._player));
    enemyProgram.addInstruction(new ShotInstruction(this._enemy));
    enemyProgram.addInstruction(new TurnEnemyScanInstruction(this._enemy, this._player));
    enemyProgram.addInstruction(new HpBranchInstruction(this._enemy));
    enemyProgram.addInstruction(new HoldBulletBranchInstruction(this._enemy));
    return octagram.showProgram(this.playerProgramId);
  };

  RobotWorld.prototype.properties = {
    player: {
      get: function() {
        return this._player;
      }
    },
    enemy: {
      get: function() {
        return this._enemy;
      }
    }
  };

  RobotWorld.prototype.initialize = function(views) {
    var plate;
    plate = Map.instance.getPlate(6, 4);
    this.player.moveDirect(plate);
    plate = Map.instance.getPlate(1, 1);
    return this.enemy.moveDirect(plate);
  };

  RobotWorld.prototype.collisionBullet = function(bullet, robot) {
    return bullet.holder !== robot && bullet.within(robot, 32);
  };

  RobotWorld.prototype.updateItems = function() {
    var del, i, v, _i, _len, _ref,
      _this = this;
    del = -1;
    _ref = this.items;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      v = _ref[i];
      if (v.animated === false) {
        del = i;
        this.items[i] = false;
      }
    }
    if (del !== -1) {
      return this.items.some(function(v, i) {
        if (v === false) {
          return _this.items.splice(i, 1);
        }
      });
    }
  };

  RobotWorld.prototype.updateBullets = function() {
    var del, i, robot, v, _i, _j, _len, _len1, _ref, _ref1,
      _this = this;
    del = -1;
    _ref = this._robots;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      robot = _ref[_i];
      _ref1 = this.bullets;
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        v = _ref1[i];
        if (v !== false) {
          if (this.collisionBullet(v, robot)) {
            del = i;
            v.hit(robot);
            this.bullets[i] = false;
          } else if (v.animated === false) {
            del = i;
            this.bullets[i] = false;
          }
        }
      }
    }
    if (del !== -1) {
      return this.bullets.some(function(v, i) {
        if (v === false) {
          return _this.bullets.splice(i, 1);
        }
      });
    }
  };

  RobotWorld.prototype._isAnimated = function(array, func) {
    var animated, i, _i, _len;
    animated = false;
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      i = array[_i];
      animated = func(i);
      if (animated === true) {
        break;
      }
    }
    return animated;
  };

  RobotWorld.prototype.updateRobots = function() {
    var i, _i, _len, _ref, _results;
    _ref = this._robots;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _results.push(i.update());
    }
    return _results;
  };

  RobotWorld.prototype.update = function(views) {
    this.updateItems();
    this.updateRobots();
    return this.updateBullets();
  };

  return RobotWorld;

})(GroupModel);

RobotScene = (function(_super) {
  __extends(RobotScene, _super);

  function RobotScene(game) {
    this.game = game;
    RobotScene.__super__.constructor.call(this, this);
    this.views = new ViewWorld(Config.GAME_OFFSET_X, Config.GAME_OFFSET_Y, this);
    this.world = new RobotWorld(Config.GAME_OFFSET_X, Config.GAME_OFFSET_Y, this);
    this.views.initEvent(this.world);
    this.world.initialize();
  }

  RobotScene.prototype.onenterframe = function() {
    return this.update();
  };

  RobotScene.prototype.update = function() {
    this.world.update(this.views);
    return this.views.update(this.world);
  };

  return RobotScene;

})(Scene);

RobotGame = (function(_super) {
  __extends(RobotGame, _super);

  function RobotGame(width, height) {
    RobotGame.__super__.constructor.call(this, width, height);
    this._assetPreload();
    this.keybind(87, 'w');
    this.keybind(65, 'a');
    this.keybind(88, 'x');
    this.keybind(68, 'd');
    this.keybind(83, 's');
    this.keybind(81, 'q');
    this.keybind(69, 'e');
    this.keybind(67, 'c');
    this.keybind(80, 'p');
    this.keybind(76, 'l');
    this.keybind(77, 'm');
    this.keybind(78, 'n');
    this.keybind(74, 'j');
    this.keybind(73, 'i');
    this.keybind(75, 'k');
    this.keybind(79, 'o');
  }

  RobotGame.prototype._assetPreload = function() {
    var load,
      _this = this;
    load = function(hash) {
      var k, path, _results;
      _results = [];
      for (k in hash) {
        path = hash[k];
        Debug.log("load image " + path);
        _results.push(_this.preload(path));
      }
      return _results;
    };
    load(R.CHAR);
    load(R.BACKGROUND_IMAGE);
    load(R.UI);
    load(R.EFFECT);
    load(R.BULLET);
    load(R.ITEM);
    return load(R.TIP);
  };

  RobotGame.prototype.onload = function() {
    var _this = this;
    this.scene = new RobotScene(this);
    this.pushScene(this.scene);
    this.octagram = new Octagram('./js/octagram');
    this.octagram.onload = function() {
      return _this.scene.world.initInstructions(_this.octagram);
    };
    this.assets["font0.png"] = this.assets['resources/ui/font0.png'];
    this.assets["apad.png"] = this.assets['resources/ui/apad.png'];
    this.assets["icon0.png"] = this.assets['resources/ui/icon0.png'];
    return this.assets["pad.png"] = this.assets['resources/ui/pad.png'];
  };

  return RobotGame;

})(Core);

window.onload = function() {
  var game;
  game = new RobotGame(Config.GAME_WIDTH, Config.GAME_HEIGHT);
  return game.start();
};
