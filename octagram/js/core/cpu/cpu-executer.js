// Generated by CoffeeScript 1.6.3
var Executer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Executer = (function(_super) {
  __extends(Executer, _super);

  Executer.latency = 30;

  function Executer(cpu) {
    this.cpu = cpu;
    this.execNext = __bind(this.execNext, this);
    this.next = null;
    this.current = null;
    this.end = false;
    this.running = false;
  }

  Executer.prototype.getNext = function() {
    if (this.next != null) {
      return this.cpu.getTip(this.next.x, this.next.y);
    } else {
      return null;
    }
  };

  Executer.prototype._execute = function(tip) {
    if (this.current != null) {
      this.current.hideExecutionEffect();
    }
    this.current = tip;
    this.current.showExecutionEffect();
    if (this.current.isAsynchronous()) {
      this.current.code.instruction.removeEventListener('completeExecution', this.execNext);
      this.current.code.instruction.addEventListener('completeExecution', this.execNext);
    }
    this.next = this.current.execute();
    if (this.next == null) {
      this.current.hideExecutionEffect();
      this.current = null;
    }
    if (!tip.isAsynchronous()) {
      return setTimeout(this.execNext, Executer.latency);
    }
  };

  Executer.prototype.waitWhileRunning = function(callback) {
    var wait,
      _this = this;
    if (this.isRunning()) {
      this.stop();
      wait = function() {
        return _this.waitWhileRunning(callback);
      };
      return setTimeout(wait, 100);
    } else {
      return callback();
    }
  };

  Executer.prototype.execute = function() {
    var _this = this;
    return this.waitWhileRunning(function() {
      var tip;
      _this.onStart();
      tip = _this.cpu.getStartTip();
      return _this._execute(tip);
    });
  };

  Executer.prototype.execNext = function(e) {
    var nextTip;
    if (this.end) {
      if (this.current) {
        this.current.hideExecutionEffect();
      }
      nextTip = null;
      this.current = null;
    } else {
      nextTip = this.getNext();
    }
    if ((this.current != null) && this.current.isAsynchronous() && e && (e.params.result != null) && this.current instanceof BranchTransitionCodeTip) {
      this.next = e.params.result ? this.current.code.getConseq() : this.current.code.getAlter();
      nextTip = this.getNext();
    }
    if (nextTip != null) {
      if (nextTip === this.current) {
        console.log("error : invalid execution timing.");
        this.next = this.current.code.getNext();
        nextTip = this.getNext();
      }
      return this._execute(nextTip);
    } else {
      return this.onStop();
    }
  };

  Executer.prototype.stop = function() {
    return this.end = true;
  };

  Executer.prototype.onStart = function() {
    console.log("start");
    this.running = true;
    return this.end = false;
  };

  Executer.prototype.onStop = function() {
    console.log("stop");
    this.running = false;
    return this.end = false;
  };

  Executer.prototype.isRunning = function() {
    return this.running;
  };

  return Executer;

})(EventTarget);

octagram.Executer = Executer;
