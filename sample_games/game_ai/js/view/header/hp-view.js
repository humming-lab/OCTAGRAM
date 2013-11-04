// Generated by CoffeeScript 1.6.3
var EnemyHp, PlayerHp,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PlayerHp = (function(_super) {
  var PART_WIDTH;

  __extends(PlayerHp, _super);

  PART_WIDTH = 48;

  function PlayerHp(x, y) {
    PlayerHp.__super__.constructor.call(this, {
      x: x,
      y: y,
      partWidth: PART_WIDTH,
      count: Robot.MAX_HP,
      height: 24,
      foregroundImage: R.BACKGROUND_IMAGE.HP_GREEN,
      backgroundImage: R.BACKGROUND_IMAGE.HP_ENCLOSE
    });
  }

  PlayerHp.prototype.initEvent = function(world) {
    var _this = this;
    return world.player.addObserver("hp", function(hp) {
      if (hp < world.player.hp) {
        return _this.decreaseForce(PART_WIDTH);
      }
    });
  };

  return PlayerHp;

})(MeterView);

EnemyHp = (function(_super) {
  var PART_WIDTH;

  __extends(EnemyHp, _super);

  PART_WIDTH = 48;

  function EnemyHp(x, y) {
    EnemyHp.__super__.constructor.call(this, {
      x: x,
      y: y,
      partWidth: PART_WIDTH,
      count: Robot.MAX_HP,
      height: 24,
      foregroundImage: R.BACKGROUND_IMAGE.HP_RED,
      backgroundImage: R.BACKGROUND_IMAGE.HP_ENCLOSE
    });
  }

  EnemyHp.prototype.initEvent = function(world) {
    var _this = this;
    return world.enemy.addObserver("hp", function(hp) {
      if (hp < world.enemy.hp) {
        return _this.decreaseForce(PART_WIDTH);
      }
    });
  };

  return EnemyHp;

})(MeterView);
