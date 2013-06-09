// Generated by CoffeeScript 1.6.2
var SideSelectorArrow, SideTipSelector,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SideSelectorArrow = (function(_super) {
  __extends(SideSelectorArrow, _super);

  function SideSelectorArrow(parent) {
    var image;

    this.parent = parent;
    image = Resources.get("arrow");
    SideSelectorArrow.__super__.constructor.call(this, image.width, image.height);
    this.image = image;
  }

  return SideSelectorArrow;

})(GroupedSprite);

SideTipSelector = (function(_super) {
  __extends(SideTipSelector, _super);

  function SideTipSelector(x, y, parent) {
    var _this = this;

    this.parent = parent;
    SideTipSelector.__super__.constructor.call(this, Resources.get("sidebar"));
    this.tipGroup = new Group();
    this.moveTo(x, y);
    this.padding = 56;
    this.capacity = 8;
    this.scrollPosition = 0;
    this.topArrow = new SideSelectorArrow();
    this.bottomArrow = new SideSelectorArrow();
    this.topArrow.rotate(-90);
    this.bottomArrow.rotate(90);
    this.topArrow.moveTo(this.sprite.width / 2 - this.topArrow.width / 2, 0);
    this.bottomArrow.moveTo(this.sprite.width / 2 - this.bottomArrow.width / 2, this.sprite.height - this.bottomArrow.height);
    this.addChild(this.sprite);
    this.addChild(this.tipGroup);
    this.addChild(this.topArrow);
    this.addChild(this.bottomArrow);
    this.topArrow.addEventListener('touchstart', function() {
      return _this.scrollDown();
    });
    this.bottomArrow.addEventListener('touchstart', function() {
      return _this.scrollUp();
    });
  }

  SideTipSelector.prototype.addTip = function(tip) {
    var uiTip;

    uiTip = tip.clone();
    uiTip.moveTo(this.padding, this.padding + this.getTipNum() * tip.getHeight());
    uiTip.setVisible(false);
    this.tipGroup.addChild(uiTip);
    return this.updateVisibility();
  };

  SideTipSelector.prototype.hideOuter = function(tip) {
    var opacity;

    opacity = this.isOut(tip) ? 0 : 1;
    tip.opacity = opacity;
    if (tip.icon != null) {
      return tip.icon.opacity = opacity;
    }
  };

  SideTipSelector.prototype.updateVisibility = function() {
    var i, tip, _i, _len, _ref, _results;

    _ref = this.tipGroup.childNodes;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      tip = _ref[i];
      _results.push(tip.setVisible(!this.isOuterIndex(i)));
    }
    return _results;
  };

  SideTipSelector.prototype.isOuterIndex = function(index) {
    return index < this.scrollPosition || index >= (this.capacity + this.scrollPosition);
  };

  SideTipSelector.prototype.getTipNum = function() {
    return this.tipGroup.childNodes.length;
  };

  SideTipSelector.prototype.isUpScrollable = function() {
    var rest;

    rest = this.getTipNum() - this.scrollPosition;
    return rest > this.capacity;
  };

  SideTipSelector.prototype.isDownScrollable = function() {
    return this.scrollPosition > 0;
  };

  SideTipSelector.prototype.scrollUp = function() {
    if (this.isUpScrollable()) {
      this.scrollPosition += 1;
      this.tipGroup.moveBy(0, -Resources.get("emptyTip").height);
      return this.updateVisibility();
    }
  };

  SideTipSelector.prototype.scrollDown = function() {
    if (this.isDownScrollable()) {
      this.scrollPosition -= 1;
      this.tipGroup.moveBy(0, Resources.get("emptyTip").height);
      return this.updateVisibility();
    }
  };

  return SideTipSelector;

})(SpriteGroup);
