// Generated by CoffeeScript 1.6.3
(function() {
  var arg, d, s, _i, _len, _results;
  s = document.getElementsByTagName("script");
  d = s[s.length - 1].src.substring(0, s[s.length - 1].src.lastIndexOf("/") + 1);
  _results = [];
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    arg = arguments[_i];
    _results.push(document.write('<script type="text/javascript" src="' + d + arg + '"></script>'));
  }
  return _results;
})("third_party/underscore-min.js", "third_party/mt.js", "config.js", "utility/util.js", "utility/debug.js", "effect.js", "bullet.js", "item.js", "robot.js", "enchantAI/instr.js", "view.js", "main.js");

(function() {
  var classes, cls, _i, _len, _results;
  classes = [enchant.model.SpriteModel, enchant.model.GroupModel];
  _results = [];
  for (_i = 0, _len = classes.length; _i < _len; _i++) {
    cls = classes[_i];
    cls.prototype.__constructor = cls.prototype.constructor;
    _results.push(cls.prototype.constructor = function() {
      Object.defineProperties(this, this.properties);
      return this.__constructor.apply(this, arguments);
    });
  }
  return _results;
})();
