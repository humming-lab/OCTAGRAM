// Generated by CoffeeScript 1.6.2
var CounterBranchInstruction, CounterIncrementInstruction, MoveDownInstruction, MoveLeftInstruction, MoveUpInstruction, RandomBranchInstruction, counter, executeTestCode, generateTestCode, initializeTester, sprite,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

counter = 0;

sprite = null;

initializeTester = function(sx, sy) {
  sprite = new Sprite(48, 48);
  sprite.image = Resources.get("testObject");
  sprite.x = 640 - 48;
  sprite.y = 240;
  return LayerUtil.setOrder(sprite, 31);
  /*
  action = new CustomInstructionActionTip(new CounterIncrementInstruction())
  branch = new CustomInstructionBranchTip(new CounterBranchInstruction())
  actionTip = TipFactory.createActionTip(action)
  branchTip = TipFactory.createBranchTip(branch)
  returnTip = TipFactory.createReturnTip(sx, sy)
  stopTip   = TipFactory.createStopTip() 
  
  actionTip.description = "カウンタを1進めます。"
  branchTip.description = "カウンタが10未満であれば青矢印に進みます。</br>カウンタが10以上であれば赤矢印に進みます。"
  
  TipTable.addInstruction(new MoveUpInstruction(), "オブジェクトを上に動かします。", Resources.get("iconUp"))
  TipTable.addInstruction(new MoveDownInstruction(), "オブジェクトを下に動かします。", Resources.get("iconDown"))
  TipTable.addTip(actionTip)
  TipTable.addTip(branchTip)
  TipTable.addInstruction(new RandomBranchInstruction(), "50%の確率で青矢印に進みます。</br>50%の確率で赤矢印に進みます。", Resources.get("iconRandom"))
  TipTable.addTip(returnTip)
  TipTable.addTip(stopTip)
  
  for i in [0...5] then TipTable.addTip(stopTip)
  */

};

generateTestCode = function() {
  var action, actionTip, branch, branchTip, stopTip;

  action = new CustomInstructionActionTip(new CounterIncrementInstruction());
  branch = new CustomInstructionBranchTip(new CounterBranchInstruction());
  actionTip = new SingleTransitionCodeTip(action);
  actionTip.description = "カウンタを1進めます";
  branchTip = new BranchTransitionCodeTip(branch);
  branchTip.description = "カウンタが10未満であれば青矢印に進みます。</br>カウンタが10以上であれば赤矢印に進みます。";
  stopTip = new CodeTip(new StopTip());
  board.putTip(4, 0, Direction.right, actionTip);
  board.putBranchTip(5, 0, Direction.up, Direction.right, branchTip);
  return board.putSingleTip(6, 0, stopTip);
};

executeTestCode = function() {
  return executer.execute();
};

CounterIncrementInstruction = (function(_super) {
  __extends(CounterIncrementInstruction, _super);

  function CounterIncrementInstruction() {
    CounterIncrementInstruction.__super__.constructor.call(this);
    this.setAsynchronous(true);
  }

  CounterIncrementInstruction.prototype.action = function() {
    counter++;
    console.log("increment : " + counter);
    return setTimeout(this.onComplete, 100);
  };

  CounterIncrementInstruction.prototype.clone = function() {
    return new CounterIncrementInstruction();
  };

  return CounterIncrementInstruction;

})(ActionInstruction);

MoveUpInstruction = (function(_super) {
  __extends(MoveUpInstruction, _super);

  function MoveUpInstruction() {
    MoveUpInstruction.__super__.constructor.call(this);
    this.setAsynchronous(true);
  }

  MoveUpInstruction.prototype.action = function() {
    var _this = this;

    console.log("moveup ");
    sprite.tl.setTimeBased();
    return sprite.tl.moveBy(0, -100, 1000).then(function() {
      return _this.onComplete();
    });
  };

  MoveUpInstruction.prototype.clone = function() {
    return new MoveUpInstruction();
  };

  return MoveUpInstruction;

})(ActionInstruction);

MoveLeftInstruction = (function(_super) {
  __extends(MoveLeftInstruction, _super);

  function MoveLeftInstruction() {
    MoveLeftInstruction.__super__.constructor.call(this);
    this.setAsynchronous(true);
  }

  MoveLeftInstruction.prototype.action = function() {
    var _this = this;

    console.log("moveleft ");
    sprite.tl.setTimeBased();
    return sprite.tl.moveBy(-100, 0, 1000).then(function() {
      return _this.onComplete();
    });
  };

  MoveLeftInstruction.prototype.clone = function() {
    return new MoveLeftInstruction();
  };

  return MoveLeftInstruction;

})(ActionInstruction);

MoveDownInstruction = (function(_super) {
  __extends(MoveDownInstruction, _super);

  function MoveDownInstruction() {
    MoveDownInstruction.__super__.constructor.call(this);
    this.setAsynchronous(true);
  }

  MoveDownInstruction.prototype.action = function() {
    var _this = this;

    console.log("moveleft ");
    sprite.tl.setTimeBased();
    return sprite.tl.moveBy(0, 100, 1000).then(function() {
      return _this.onComplete();
    });
  };

  MoveDownInstruction.prototype.clone = function() {
    return new MoveDownInstruction();
  };

  return MoveDownInstruction;

})(ActionInstruction);

CounterBranchInstruction = (function(_super) {
  __extends(CounterBranchInstruction, _super);

  function CounterBranchInstruction() {
    CounterBranchInstruction.__super__.constructor.call(this);
  }

  CounterBranchInstruction.prototype.action = function() {
    console.log("if counter < 10 : ", counter < 10);
    return counter < 10;
  };

  CounterBranchInstruction.prototype.clone = function() {
    return new CounterBranchInstruction();
  };

  return CounterBranchInstruction;

})(BranchInstruction);

RandomBranchInstruction = (function(_super) {
  __extends(RandomBranchInstruction, _super);

  function RandomBranchInstruction() {
    var parameter;

    RandomBranchInstruction.__super__.constructor.call(this);
    this.threthold = 50;
    parameter = new TipParameter("確率", 50, 0, 100, 1);
    this.addParameter(parameter);
  }

  RandomBranchInstruction.prototype.action = function() {
    var r;

    r = Math.random();
    console.log("if random val < " + this.threthold, r * 100 < this.threthold);
    return r * 100 < this.threthold;
  };

  RandomBranchInstruction.prototype.clone = function() {
    var obj;

    obj = this.copy(new RandomBranchInstruction());
    obj.threthold = this.threthold;
    return obj;
  };

  RandomBranchInstruction.prototype.onParameterChanged = function(parameter) {
    return this.threthold = parameter.value;
  };

  RandomBranchInstruction.prototype.mkDescription = function() {
    return this.threthold + "%の確率で青矢印に進みます。</ br>" + (100 - this.threthold) + "%の確率で赤矢印に進みます。";
  };

  return RandomBranchInstruction;

})(BranchInstruction);