// Generated by CoffeeScript 1.6.2
var CommandPool, R, RobotGame, RobotScene, RobotWorld, TurnSwitcher, ViewGroup,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

R = Config.R;

CommandPool = (function() {
  function CommandPool() {
    var end, getBulletQueueSize, getHp, map, moveDown, moveLeft, moveRight, moveUp, pickup, search, shot;

    map = Map.instance;
    this.game = Game.instance;
    end = new Instruction(Instruction.END, function() {
      return true;
    });
    this.end = new Command(end);
    moveUp = new Instruction(Instruction.MOVE_UP, function() {
      var ret, y;

      ret = true;
      this.frame = 1;
      y = this.y - Map.UNIT_SIZE;
      if (!this.map.isIntersect(this.x, y) && y >= 0) {
        this.tl.moveBy(0, -Map.UNIT_SIZE, PlayerRobot.UPDATE_FRAME).then(function() {
          return this.onAnimateComplete();
        });
        ret = this.map.getPos(this.x, this.y - Map.UNIT_SIZE);
      } else {
        ret = false;
      }
      return ret;
    });
    this.moveUp = new Command(moveUp);
    moveDown = new Instruction(Instruction.MOVE_DOWN, function() {
      var ret, y;

      ret = true;
      this.frame = 3;
      y = this.y + Map.UNIT_SIZE;
      if (!this.map.isIntersect(this.x, y) && y <= (Map.UNIT_SIZE * Map.HEIGHT)) {
        this.tl.moveBy(0, Map.UNIT_SIZE, PlayerRobot.UPDATE_FRAME).then(function() {
          return this.onAnimateComplete();
        });
        ret = this.map.getPos(this.x, this.y + Map.UNIT_SIZE);
      } else {
        ret = false;
      }
      return ret;
    });
    this.moveDown = new Command(moveDown);
    moveLeft = new Instruction(Instruction.MOVE_LEFT, function() {
      var ret, x;

      ret = true;
      this.frame = 2;
      x = this.x - Map.UNIT_SIZE;
      if (!this.map.isIntersect(x, this.y) && x >= 0) {
        this.tl.moveBy(-Map.UNIT_SIZE, 0, PlayerRobot.UPDATE_FRAME).then(function() {
          return this.onAnimateComplete();
        });
        ret = this.map.getPos(this.x - Map.UNIT_SIZE, this.y);
      } else {
        ret = false;
      }
      return ret;
    });
    this.moveLeft = new Command(moveLeft);
    moveRight = new Instruction(Instruction.MOVE_RIGHT, function() {
      var ret, x;

      ret = true;
      this.frame = 0;
      x = this.x + Map.UNIT_SIZE;
      if (!this.map.isIntersect(x, this.y) && x <= (Map.UNIT_SIZE * (Map.WIDTH - 1))) {
        this.tl.moveBy(Map.UNIT_SIZE, 0, PlayerRobot.UPDATE_FRAME).then(function() {
          return this.onAnimateComplete();
        });
        ret = this.map.getPos(this.x + Map.UNIT_SIZE, this.y);
      } else {
        ret = false;
      }
      return ret;
    });
    this.moveRight = new Command(moveRight);
    shot = new Instruction(Instruction.SHOT, function() {
      var b, scene, _i, _len, _ref;

      scene = Game.instance.scene;
      if (!this.bltQueue.empty()) {
        _ref = this.bltQueue.dequeue();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          b = _ref[_i];
          b.set(this.x, this.y, this.getDirect());
          scene.world.bullets.push(b);
          scene.world.addChild(b);
          scene.views.footer.statusBox.remainingBullets.decrement();
        }
        return true;
      }
      return false;
    });
    this.shot = new Command(shot);
    search = new Instruction(Instruction.SEARCH, function() {
      var robot, world;

      world = Game.instance.scene.world;
      robot = this === world.player ? world.enemy : this;
      return new Point(this.map.getPosX(robot.x - this.x), this.map.getPosY(robot.y - this.y));
    });
    this.search = new Command(search);
    pickup = new Instruction(Instruction.PICKUP, function() {
      var item, ret, scene;

      ret = this.bltQueue.enqueue(this.createBullet());
      if (ret !== false) {
        scene = Game.instance.scene;
        item = new BulletItem(this.x, this.y);
        scene.world.addChild(item);
        scene.world.items.push(item);
        scene.views.footer.statusBox.remainingBullets.increment();
      }
      return ret;
    });
    this.pickup = new Command(pickup);
    getHp = new Instruction(Instruction.GET_HP, function() {
      return this.hp;
    });
    this.getHp = new Command(getHp);
    getBulletQueueSize = new Instruction(Instruction.GET_BULLET_QUEUE_SIZE, function() {
      return this.bltQueue.size();
    });
    this.getBulletQueueSize = Command(getBulletQueueSize);
  }

  return CommandPool;

})();

ViewGroup = (function(_super) {
  __extends(ViewGroup, _super);

  function ViewGroup(scene) {
    this.scene = scene;
    ViewGroup.__super__.constructor.apply(this, arguments);
    this.background = new Background(0, 0);
    this.addChild(this.background);
    this.header = new Header(0, 0);
    this.addChild(this.header);
    this.map = new Map(0, 32);
    this.addChild(this.map);
    this.footer = new Footer(5, this.map.y + this.map.height + 5);
    this.msgbox = this.footer.msgbox;
    this.addChild(this.footer);
    this.playerHpBar = new PlayerHp(0, 0, PlayerHp.YELLOW);
    this.addChild(this.playerHpBar);
    this.enemyHpBar = new PlayerHp(Header.WIDTH / 2, 0, PlayerHp.BLUE);
    this.enemyHpBar.direct("left");
    this.addChild(this.enemyHpBar);
  }

  ViewGroup.prototype.update = function(world) {
    var i, _i, _len, _ref, _results;

    _ref = world.robots;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _results.push(i.onViewUpdate(this));
    }
    return _results;
  };

  return ViewGroup;

})(Group);

TurnSwitcher = (function() {
  function TurnSwitcher(world) {
    this.world = world;
    this.i = 0;
  }

  TurnSwitcher.prototype.update = function() {
    var animated, bullet, i, _i, _j, _len, _len1, _ref, _ref1;

    animated = bullet = false;
    _ref = this.world.bullets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      bullet = i.animated;
      if (bullet === true) {
        break;
      }
    }
    _ref1 = this.world.robots;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      i = _ref1[_j];
      animated = i.isAnimated();
      if (animated === true) {
        break;
      }
    }
    if (bullet === false && animated === false) {
      if (this.world.robots[this.i].update()) {
        this.i++;
        if (this.i === this.world.robots.length) {
          return this.i = 0;
        }
      }
    }
  };

  return TurnSwitcher;

})();

RobotWorld = (function(_super) {
  __extends(RobotWorld, _super);

  function RobotWorld(scene) {
    this.scene = scene;
    RobotWorld.__super__.constructor.apply(this, arguments);
    this.game = Game.instance;
    this.map = Map.instance;
    this.robots = [];
    this.bullets = [];
    this.items = [];
    this.player = new PlayerRobot;
    this.player.x = this.map.getX(3);
    this.player.y = this.map.getY(4);
    this.addChild(this.player);
    this.robots.push(this.player);
    this.enemy = new EnemyRobot;
    this.enemy.x = this.map.getX(8);
    this.enemy.y = this.map.getY(4);
    this.addChild(this.enemy);
    this.robots.push(this.enemy);
    this.swicher = new TurnSwitcher(this);
  }

  RobotWorld.prototype.initialize = function(views) {};

  RobotWorld.prototype.collisionBullet = function(bullet, robot) {
    return robot.within(bullet, 32);
  };

  RobotWorld.prototype.updateItems = function() {
    var del, i, v, _i, _len, _ref;

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
      return this.items = _.compact(this.items);
    }
  };

  RobotWorld.prototype.updateBullets = function() {
    var del, i, v, _i, _len, _ref;

    del = -1;
    _ref = this.bullets;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      v = _ref[i];
      if (this.collisionBullet(v, this.enemy)) {
        del = i;
        v.hit(this.enemy);
        this.bullets[i] = false;
      } else if (v.animated === false) {
        del = i;
        this.bullets[i] = false;
      }
      v.update();
    }
    if (del !== -1) {
      return this.bullets = _.compact(this.bullets);
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
    var animated, i, _i, _j, _len, _len1, _ref, _ref1, _results;

    animated = false;
    _ref = [this.bullets, this.robots, this.items];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      animated = this._isAnimated(i, function(x) {
        return x.animated;
      });
      if (animated === true) {
        break;
      }
    }
    if (animated === false) {
      _ref1 = this.robots;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        i = _ref1[_j];
        _results.push(i.update());
      }
      return _results;
    }
  };

  RobotWorld.prototype.update = function(views) {
    this.updateItems();
    this.updateRobots();
    return this.updateBullets();
  };

  return RobotWorld;

})(Group);

RobotScene = (function(_super) {
  __extends(RobotScene, _super);

  function RobotScene(game) {
    this.game = game;
    RobotScene.__super__.constructor.call(this, this);
    this.backgroundColor = "#c0c0c0";
    this.views = new ViewGroup(this);
    this.world = new RobotWorld(this);
    this.addChild(this.views);
    this.addChild(this.world);
    this.world.initialize(this.views);
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
    this.keybind(76, 'l');
    this.keybind(77, 'm');
    this.keybind(74, 'j');
    this.keybind(73, 'i');
    this.keybind(75, 'k');
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
    return load(R.ITEM);
  };

  RobotGame.prototype.onload = function() {
    this.scene = new RobotScene(this);
    return this.pushScene(this.scene);
  };

  return RobotGame;

})(Game);

window.onload = function() {
  var game;

  game = new RobotGame(Config.GAME_WIDTH, Config.GAME_WIDTH);
  return game.start();
};
