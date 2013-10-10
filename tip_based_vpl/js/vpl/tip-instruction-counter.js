var Counter, CounterBranchInstruction, CounterDecrementInstruction, CounterIncrementInstruction, CounterPopInstruction, CounterPushInstruction,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Counter = (function() {
  function Counter() {
    this.value = 0;
  }

  Counter.prototype.inc = function(amount) {
    if (amount == null) {
      amount = 1;
    }
    return this.value += amount;
  };

  Counter.prototype.dec = function(amount) {
    if (amount == null) {
      amount = -1;
    }
    return this.value -= amount;
  };

  Counter.prototype.clone = function() {
    var obj;
    obj = new Counter();
    obj.value = this.value;
    return obj;
  };

  return Counter;

})();

CounterIncrementInstruction = (function(_super) {
  __extends(CounterIncrementInstruction, _super);

  function CounterIncrementInstruction(counters) {
    var idParam, stepParam;
    this.counters = counters;
    CounterIncrementInstruction.__super__.constructor.call(this);
    this.id = 0;
    this.step = 1;
    idParam = new TipParameter("$B%+%&%s%?!<(BID", 0, 0, this.counters.length, 1);
    stepParam = new TipParameter("$BA}2CNL(B", 1, 1, 100, 1);
    idParam.id = "id";
    stepParam.id = "step";
    this.addParameter(idParam);
    this.addParameter(stepParam);
  }

  CounterIncrementInstruction.prototype.action = function() {
    return this.counters[this.id].inc(this.step);
  };

  CounterIncrementInstruction.prototype.onParameterChanged = function(parameter) {
    if (parameter.id === "id") {
      return this.id = parameter.value;
    } else if (parameter.id === "step") {
      return this.step = parameter.value;
    }
  };

  CounterIncrementInstruction.prototype.getIcon = function() {
    return new Icon(Resources.get("iconRandom"));
  };

  CounterIncrementInstruction.prototype.mkDescription = function() {
    return "$B%+%&%s%?!<(B" + this.id + "$B$r(B" + this.step + "$BA}2C$5$;$^$9!#(B";
  };

  CounterIncrementInstruction.prototype.clone = function() {
    return this.copy(new CounterIncrementInstruction(this.counters));
  };

  return CounterIncrementInstruction;

})(ActionInstruction);

CounterDecrementInstruction = (function(_super) {
  __extends(CounterDecrementInstruction, _super);

  function CounterDecrementInstruction(counters) {
    var idParam, stepParam;
    this.counters = counters;
    CounterDecrementInstruction.__super__.constructor.call(this);
    this.id = 0;
    this.step = 1;
    idParam = new TipParameter("$B%+%&%s%?!<(BID", 0, 0, this.counters.length, 1);
    stepParam = new TipParameter("$B8:>/NL(B", 1, 1, 100, 1);
    idParam.id = "id";
    stepParam.id = "step";
    this.addParameter(idParam);
    this.addParameter(stepParam);
  }

  CounterDecrementInstruction.prototype.action = function() {
    return this.counters[this.id].dec(this.step);
  };

  CounterDecrementInstruction.prototype.onParameterChanged = function(parameter) {
    if (parameter.id === "id") {
      return this.id = parameter.value;
    } else if (parameter.id === "step") {
      return this.step = parameter.value;
    }
  };

  CounterDecrementInstruction.prototype.getIcon = function() {
    return new Icon(Resources.get("iconRandom"));
  };

  CounterDecrementInstruction.prototype.mkDescription = function() {
    return "$B%+%&%s%?!<(B" + this.id + "$B$r(B" + this.step + "$B8:>/$5$;$^$9!#(B";
  };

  CounterDecrementInstruction.prototype.clone = function() {
    return this.copy(new CounterDecrementInstruction(this.counters));
  };

  return CounterDecrementInstruction;

})(ActionInstruction);

CounterBranchInstruction = (function(_super) {
  __extends(CounterBranchInstruction, _super);

  function CounterBranchInstruction(counters) {
    var idParam, thretholdParam;
    this.counters = counters;
    CounterBranchInstruction.__super__.constructor.call(this);
    this.id = 0;
    this.threthold = 0;
    idParam = new TipParameter("$B%+%&%s%?!<(BID", 0, 0, this.counters.length, 1);
    thretholdParam = new TipParameter("$BogCM(B", 0, -100, 100, 1);
    idParam.id = "id";
    thretholdParam.id = "threthold";
    this.addParameter(idParam);
    this.addParameter(thretholdParam);
  }

  CounterBranchInstruction.prototype.action = function() {
    return this.counters[this.id].value >= this.threthold;
  };

  CounterBranchInstruction.prototype.onParameterChanged = function(parameter) {
    if (parameter.id === "id") {
      return this.id = parameter.value;
    } else if (parameter.id === "threthold") {
      return this.threthold = parameter.value;
    }
  };

  CounterBranchInstruction.prototype.getIcon = function() {
    return new Icon(Resources.get("iconRandom"));
  };

  CounterBranchInstruction.prototype.mkDescription = function() {
    return "$B%+%&%s%?!<(B" + this.id + "$B$,(B" + this.threthold + "$B0J>e$J$i$P@DLp0u$K?J$_$^$9!#(B<br>" + "$B%+%&%s%?!<(B" + this.id + "$B$,(B" + this.threthold + "$BL$K~$J$i$P@VLp0u$K?J$_$^$9!#(B";
  };

  CounterBranchInstruction.prototype.clone = function() {
    return this.copy(new CounterBranchInstruction(this.counters));
  };

  return CounterBranchInstruction;

})(BranchInstruction);

CounterPushInstruction = (function(_super) {
  __extends(CounterPushInstruction, _super);

  function CounterPushInstruction(counters, stack) {
    var idParam;
    this.counters = counters;
    this.stack = stack;
    CounterPushInstruction.__super__.constructor.call(this);
    this.id = 0;
    idParam = new TipParameter("$B%+%&%s%?!<(BID", 0, 0, this.counters.length, 1);
    this.addParameter(idParam);
  }

  CounterPushInstruction.prototype.action = function() {
    return this.stack.push(this.counters[this.id]);
  };

  CounterPushInstruction.prototype.onParameterChanged = function(parameter) {
    return this.id = parameter.value;
  };

  CounterPushInstruction.prototype.getIcon = function() {
    return new Icon(Resources.get("iconRandom"));
  };

  CounterPushInstruction.prototype.mkDescription = function() {
    return "$B%+%&%s%?!<(B" + this.id + "$B$NCM$r(B" + "$B%9%?%C%/$K%W%C%7%e$7$^$9!#(B";
  };

  CounterPushInstruction.prototype.clone = function() {
    return this.copy(new CounterPushInstruction(this.counters));
  };

  return CounterPushInstruction;

})(ActionInstruction);

CounterPopInstruction = (function(_super) {
  __extends(CounterPopInstruction, _super);

  function CounterPopInstruction(counters, stack) {
    var idParam;
    this.counters = counters;
    this.stack = stack;
    CounterPopInstruction.__super__.constructor.call(this);
    this.id = 0;
    idParam = new TipParameter("$B%+%&%s%?!<(BID", 0, 0, this.counters.length, 1);
    this.addParameter(idParam);
  }

  CounterPopInstruction.prototype.action = function() {
    return this.counters[this.id] = this.stack.pop();
  };

  CounterPopInstruction.prototype.onParameterChanged = function(parameter) {
    return this.id = parameter.value;
  };

  CounterPopInstruction.prototype.getIcon = function() {
    return new Icon(Resources.get("iconRandom"));
  };

  CounterPopInstruction.prototype.mkDescription = function() {
    return "$B%9%?%C%/$+$i(Bx$B$r%]%C%W$7$F(B, $B%+%&%s%?!<(B" + this.id + "$B$KBeF~$7$^$9!#(B";
  };

  CounterPopInstruction.prototype.clone = function() {
    return this.copy(new CounterPushInstruction(this.counters));
  };

  return CounterPopInstruction;

})(ActionInstruction);
