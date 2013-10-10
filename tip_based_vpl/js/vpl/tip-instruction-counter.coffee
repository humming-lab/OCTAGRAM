class Counter
  constructor : () -> @value = 0
  inc : (amount = 1)  -> @value += amount
  dec : (amount = -1) -> @value -= amount
  clone : () -> 
    obj = new Counter()
    obj.value = @value
    obj

class CounterIncrementInstruction extends ActionInstruction
  constructor : (@counters) ->
    super()
    @id = 0 
    @step = 1
    idParam = new TipParameter("$B%+%&%s%?!<(BID", 0, 0, @counters.length, 1)
    stepParam = new TipParameter("$BA}2CNL(B", 1, 1, 100, 1)
    
    idParam.id = "id"
    stepParam.id = "step"

    @addParameter(idParam)
    @addParameter(stepParam)

  action : () -> @counters[@id].inc(@step)

  onParameterChanged : (parameter) -> 
    if parameter.id == "id" then @id = parameter.value
    else if parameter.id == "step" then @step =  parameter.value

  getIcon : () -> new Icon(Resources.get("iconRandom"))
  mkDescription : () ->
    "$B%+%&%s%?!<(B" + @id + "$B$r(B" + @step + "$BA}2C$5$;$^$9!#(B"

  clone : () -> @copy(new CounterIncrementInstruction(@counters))

class CounterDecrementInstruction extends ActionInstruction
  constructor : (@counters) ->
    super()
    @id = 0
    @step = 1
    idParam = new TipParameter("$B%+%&%s%?!<(BID", 0, 0, @counters.length, 1)
    stepParam = new TipParameter("$B8:>/NL(B", 1, 1, 100, 1)
    
    idParam.id = "id"
    stepParam.id = "step"

    @addParameter(idParam)
    @addParameter(stepParam)

  action : () -> @counters[@id].dec(@step)

  onParameterChanged : (parameter) -> 
    if parameter.id == "id" then @id = parameter.value
    else if parameter.id == "step" then @step =  parameter.value

  getIcon : () -> new Icon(Resources.get("iconRandom"))
  mkDescription : () ->
    "$B%+%&%s%?!<(B" + @id + "$B$r(B" + @step + "$B8:>/$5$;$^$9!#(B"

  clone : () -> @copy(new CounterDecrementInstruction(@counters))

class CounterBranchInstruction extends BranchInstruction
  constructor : (@counters) ->
    super()
    @id = 0
    @threthold = 0
    idParam = new TipParameter("$B%+%&%s%?!<(BID", 0, 0, @counters.length, 1)
    thretholdParam = new TipParameter("$BogCM(B", 0, -100, 100, 1)
    
    idParam.id = "id"
    thretholdParam.id = "threthold"

    @addParameter(idParam)
    @addParameter(thretholdParam)

  action : () -> @counters[@id].value >= @threthold

  onParameterChanged : (parameter) -> 
    if parameter.id == "id" then @id = parameter.value
    else if parameter.id == "threthold" then @threthold =  parameter.value

  getIcon : () -> new Icon(Resources.get("iconRandom"))
  mkDescription : () ->
    "$B%+%&%s%?!<(B" + @id + "$B$,(B" + @threthold + "$B0J>e$J$i$P@DLp0u$K?J$_$^$9!#(B<br>" +  
    "$B%+%&%s%?!<(B" + @id + "$B$,(B" + @threthold + "$BL$K~$J$i$P@VLp0u$K?J$_$^$9!#(B" 

  clone : () -> @copy(new CounterBranchInstruction(@counters))

class CounterPushInstruction extends ActionInstruction
  constructor : (@counters, @stack) ->
    super()
    @id = 0
    idParam = new TipParameter("$B%+%&%s%?!<(BID", 0, 0, @counters.length, 1)
    
    @addParameter(idParam)

  action : () -> @stack.push(@counters[@id])

  onParameterChanged : (parameter) ->  @id = parameter.value

  getIcon : () -> new Icon(Resources.get("iconRandom"))
  mkDescription : () ->
    "$B%+%&%s%?!<(B" + @id + "$B$NCM$r(B" + "$B%9%?%C%/$K%W%C%7%e$7$^$9!#(B"

  clone : () -> @copy(new CounterPushInstruction(@counters))

class CounterPopInstruction extends ActionInstruction
  constructor : (@counters, @stack) ->
    super()
    @id = 0 
    idParam = new TipParameter("$B%+%&%s%?!<(BID", 0, 0, @counters.length, 1)
    
    @addParameter(idParam)

  action : () -> @counters[@id] = @stack.pop()

  onParameterChanged : (parameter) ->  @id = parameter.value

  getIcon : () -> new Icon(Resources.get("iconRandom"))
  mkDescription : () ->
    "$B%9%?%C%/$+$i(Bx$B$r%]%C%W$7$F(B, $B%+%&%s%?!<(B" + @id + "$B$KBeF~$7$^$9!#(B"

  clone : () -> @copy(new CounterPushInstruction(@counters))
