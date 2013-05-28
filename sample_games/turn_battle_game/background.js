// Generated by CoffeeScript 1.3.3
var Button, Header, HpBar, HpUnderBar, Map, MsgBox, NextButton, PlayerHp, R, Tile,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

R = Config.R;

Header = (function(_super) {

  __extends(Header, _super);

  Header.WIDTH = 640;

  Header.HEIGHT = 32;

  function Header(x, y) {
    Header.__super__.constructor.call(this, Header.WIDTH, Header.HEIGHT);
    this.x = x;
    this.y = y;
    this.image = Game.instance.assets[R.BACKGROUND_IMAGE.HEADER];
  }

  return Header;

})(Sprite);

HpBar = (function(_super) {

  __extends(HpBar, _super);

  function HpBar(x, y, resource) {
    if (resource == null) {
      resource = PlayerHp.YELLOW;
    }
    HpBar.__super__.constructor.call(this, x, y);
    this.height = Header.HEIGHT;
    this.value = Header.WIDTH / 2;
    this.maxValue = Header.WIDTH / 2;
    switch (resource) {
      case PlayerHp.BLUE:
        this.image = Game.instance.assets[R.BACKGROUND_IMAGE.HP_BULE];
        break;
      case PlayerHp.YELLOW:
        this.image = Game.instance.assets[R.BACKGROUND_IMAGE.HP_YELLOW];
    }
  }

  return HpBar;

})(Bar);

HpUnderBar = (function(_super) {

  __extends(HpUnderBar, _super);

  HpUnderBar.WIDTH = Header.WIDTH / 2;

  HpUnderBar.HEIGHT = Header.HEIGHT;

  function HpUnderBar(x, y) {
    HpUnderBar.__super__.constructor.call(this, HpUnderBar.WIDTH, HpUnderBar.HEIGHT);
    this.x = x;
    this.y = y;
    this.height = Header.HEIGHT;
    this.image = Game.instance.assets[R.BACKGROUND_IMAGE.HEADER_UNDER_BAR];
  }

  return HpUnderBar;

})(Sprite);

PlayerHp = (function(_super) {

  __extends(PlayerHp, _super);

  PlayerHp.YELLOW = 1;

  PlayerHp.BLUE = 2;

  PlayerHp.MAX_HP = 4;

  function PlayerHp(x, y, resource) {
    PlayerHp.__super__.constructor.apply(this, arguments);
    this.hp = new HpBar(x, y, resource);
    this.addChild(this.hp);
    this.underBar = new HpUnderBar(x, y);
    this.addChild(this.underBar);
  }

  PlayerHp.prototype.direct = function(direct) {
    this.underBar.scale(-1, 1);
    this.hp.direction = direct;
    return this.hp.x = Header.WIDTH;
  };

  PlayerHp.prototype.reduce = function() {
    if (this.hp.value > 0) {
      return this.hp.value -= this.hp.maxValue / PlayerHp.MAX_HP;
    }
  };

  return PlayerHp;

})(Group);

Tile = (function(_super) {

  __extends(Tile, _super);

  Tile.SIZE = 64;

  function Tile(x, y) {
    Tile.__super__.constructor.call(this, Tile.SIZE, Tile.SIZE);
    this.x = x;
    this.y = y;
    this.image = Game.instance.assets[R.BACKGROUND_IMAGE.TILE];
  }

  Tile.prototype.setSelected = function() {
    return this.frame = 1;
  };

  Tile.prototype.setNormal = function() {
    return this.frame = 0;
  };

  return Tile;

})(Sprite);

Button = (function(_super) {

  __extends(Button, _super);

  Button.WIDTH = 120;

  Button.HEIGHT = 50;

  function Button(x, y) {
    Button.__super__.constructor.call(this, Button.WIDTH, Button.HEIGHT);
    this.x = x;
    this.y = y;
  }

  Button.prototype.setOnClickEventListener = function(listener) {
    return this.on_click_event = listener;
  };

  Button.prototype.ontouchstart = function() {
    if (this.on_click_event != null) {
      this.on_click_event();
    }
    return this.frame = 1;
  };

  Button.prototype.ontouchend = function() {
    return this.frame = 0;
  };

  return Button;

})(Sprite);

NextButton = (function(_super) {

  __extends(NextButton, _super);

  function NextButton(x, y) {
    NextButton.__super__.constructor.call(this, x, y);
    this.image = Game.instance.assets[R.BACKGROUND_IMAGE.NEXT_BUTTON];
  }

  return NextButton;

})(Button);

Map = (function(_super) {

  __extends(Map, _super);

  Map.WIDTH = 10;

  Map.HEIGHT = 7;

  Map.UNIT_SIZE = Tile.SIZE;

  function Map(x, y) {
    var tile, tx, ty, _i, _j, _ref, _ref1;
    Map.__super__.constructor.apply(this, arguments);
    this.matrix = [];
    for (ty = _i = 0, _ref = Map.HEIGHT - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; ty = 0 <= _ref ? ++_i : --_i) {
      for (tx = _j = 0, _ref1 = Map.WIDTH - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; tx = 0 <= _ref1 ? ++_j : --_j) {
        tile = new Tile(tx * Map.UNIT_SIZE, ty * Map.UNIT_SIZE);
        this.matrix.push(tile);
        this.addChild(tile);
      }
    }
    this.x = x;
    this.y = y;
    this.width = Map.WIDTH * Map.UNIT_SIZE;
    this.height = Map.HEIGHT * Map.UNIT_SIZE;
    Map.instance = this;
  }

  Map.prototype.getTileByPos = function(posx, posy) {
    return this.matrix[posy * Map.WIDTH + posx];
  };

  Map.prototype.getTile = function(x, y) {
    return this.matrix[this.getPosY(y) * Map.WIDTH + this.getPosX(x)];
  };

  Map.prototype.getX = function(posX) {
    return posX * Map.UNIT_SIZE + this.x;
  };

  Map.prototype.getY = function(posY) {
    return posY * Map.UNIT_SIZE + this.y;
  };

  Map.prototype.getPosX = function(x) {
    var base, tmpx;
    x = parseInt(x);
    tmpx = x - this.x;
    base = tmpx - (tmpx % Map.UNIT_SIZE);
    if (tmpx > base + Map.UNIT_SIZE / 2) {
      return base / Map.UNIT_SIZE + 1;
    } else {
      return base / Map.UNIT_SIZE;
    }
  };

  Map.prototype.getPosY = function(y) {
    var base, tmpx;
    y = parseInt(y);
    tmpx = y - this.y;
    base = tmpx - (tmpx % Map.UNIT_SIZE);
    if (tmpx > base + Map.UNIT_SIZE / 2) {
      return base / Map.UNIT_SIZE + 1;
    } else {
      return base / Map.UNIT_SIZE;
    }
  };

  return Map;

})(Group);

MsgBox = (function(_super) {

  __extends(MsgBox, _super);

  MsgBox.WIDTH = 500;

  MsgBox.HEIGHT = 150;

  function MsgBox(x, y) {
    MsgBox.__super__.constructor.call(this, MsgBox.WIDTH, MsgBox.HEIGHT);
    this.x = x;
    this.y = y;
    this.image = Game.instance.assets[R.BACKGROUND_IMAGE.MSGBOX];
  }

  return MsgBox;

})(Sprite);
