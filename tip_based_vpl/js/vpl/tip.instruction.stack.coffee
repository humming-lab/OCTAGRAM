class StackMachine 
  constructor : () ->
    @stack = []

  pop : () -> @stack.pop()
  push : (val) -> @stack.push(val)

  binaryOp : (op) ->
    if @stack.length > 1
      @push(op(@pop(), @pop()))

  unaryOp : (op) ->
    if @stack.length > 0
      @push(op(@pop()))

  # binary operations
  add : () -> @binaryOp((y, x) -> x + y)
  sub : () -> @binaryOp((y, x) -> x - y)
  mul : () -> @binaryOp((y, x) -> x * y)
  div : () -> @binaryOp((y, x) -> x / y)
  mod : () -> @binaryOp((y, x) -> x % y)
  xor : () -> @binaryOp((y, x) -> x ^ y)
  grt : () -> @binaryOp((y, x) -> if x > y then 1 else 0)
  swap : () -> 
    if @stack.length > 1
      x = @pop()
      y = @pop()
      @push(y)
      @push(x)

  # unary operations
  not : () -> @unaryOp(if @stack.pop() == 0 then 1 else 0) 
  dup : () ->
    if @stack.length > 0
      val = @pop()
      @push(val)
      @push(val)

  rot : () ->
    if @stack.length > 3
      x = @pop()
      y = @pop()
      z = @pop()
      @push(y)
      @push(z)
      @push(x)

  # branch operations
  bnz : () ->
    if @stack? then @pop() != 0
    else false

  # I/O operations
  input : () -> @push(window.prompt())
  toString : () ->
    str = ""
    while @stack?
      str += String.fromCharCode(@pop())
    str

class StackAddInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.add()
  clone : () -> new StackAddInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx, y$B$r%]%C%W$7$F(B, x+y$B$NCM$r%W%C%7%e$9$k!#(B"

class StackSubInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.sub()
  clone : () -> new StackSubInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx, y$B$r%]%C%W$7$F(B, x-y$B$NCM$r%W%C%7%e$9$k!#(B"

class StackMulInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.mul()
  clone : () -> new StackMulInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx, y$B$r%]%C%W$7$F(B, x+y$B$NCM$r%W%C%7%e$9$k!#(B"

class StackDivInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.div()
  clone : () -> new StackDivInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx, y$B$r%]%C%W$7$F(B, x/y$B$NCM$r%W%C%7%e$9$k!#(B"

class StackModInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.mod()
  clone : () -> new StackModInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx, y$B$r%]%C%W$7$F(B, x$B$r(By$B$G3d$C$?;~$NM>$j$r%W%C%7%e$9$k!#(B"

class StackXorInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.xor()
  clone : () -> new StackXorInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx, y$B$r%]%C%W$7$F(B, x$B$H(By$B$NGSB>E*O@M}OB$NCM$r%W%C%7%e$9$k!#(B"

class StackGrtInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.grt()
  clone : () -> new StackGrtInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx, y$B$r%]%C%W$7$F(B, x>y$B$J$i$P(B1$B$r%W%C%7%e$9$k!#(B<br>$B$=$&$G$J$1$l$P(B0$B$r%W%C%7%e$9$k!#(B"

class StackSwpInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.swap()
  clone : () -> new StackSwpInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx, y$B$r%]%C%W$7$F(B, y, x$B$N=g$G%W%C%7%e$9$k!#(B"

class StackNotInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.not()
  clone : () -> new StackNotInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx$B$r%]%C%W$7$F(B, x$B$,(B0$B$J$i$P(B1$B$r%W%C%7%e$9$k!#(B<br>$B$=$&$G$J$1$l$P(B0$B$r%W%C%7%e$9$k!#(B"

class StackDupInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.dup()
  clone : () -> new StackDupInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx$B$r%]%C%W$7$F(B, x$B$r(B2$B2s%W%C%7%e$9$k!#(B"

class StackRotInstruction extends ActionInstruction
  constructor : (@stack) ->
  action : () -> @stack.rot()
  clone : () -> new StackRotInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx, y, z$B$r%]%C%W$7$F(B, y, z, x$B$N=g$G%W%C%7%e$9$k!#(B"

class StackBnzInstruction extends BranchInstruction
  constructor : (@stack) ->
  action : () -> @stack.bnz()
  clone : () -> new StackBnzInstruction(@stack)
  getIcon : () ->  new Icon(Resources.get("iconRandom"))
  mkDescription : () -> "$B%9%?%C%/A`:nL?Na(B($B>e5i<T8~$1(B)<br>" + "$B%9%?%C%/$+$i(Bx$B$r%]%C%W$7$F(B, x$B$,(B1$B$J$i$P@DLp0u$K?J$`!#(B<br>$B$=$&$G$J$1$l$P@VLp0u$K?J$`!#(B" 
