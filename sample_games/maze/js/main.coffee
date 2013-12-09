R = Config.R

class MazeWorld extends Group

  constructor: () ->
    super
    @maze = new Maze 64, 128
    @addChild @maze
    
  initInstructions: (@octagram) ->
    playerProgram = @octagram.createProgramInstance()
    @playerProgramId = playerProgram.id
    playerProgram.addEventListener 'onstart', () =>

    # dummy
    enemyProgram = @octagram.createProgramInstance()
    @enemyProgramId = enemyProgram.id

    playerProgram.addInstruction(new StraightMoveInstruction(@maze.player))
    playerProgram.addInstruction(new TurnInstruction(@maze.player))
    @octagram.showProgram(@playerProgramId)

class MazeScene extends Scene
  constructor: (@game) ->
    super
    @world = new MazeWorld
    @addChild @world

  onenterframe: ->
    @update()

  restart: () =>

  update: ->

class MazeGame extends Core
  constructor: (width, height, @options) ->
    super width, height
    @_assetPreload()

  _assetPreload: ->
    load = (hash) =>
      for k,path of hash
        #Debug.log "load image #{path}"
        @preload path

    load R.MAP
    load R.CHAR
    load R.TIP

  onload: ->
    @scene = new MazeScene @
    @pushScene @scene

    @octagram = new Octagram(Config.OCTAGRAM_DIR)
    @octagram.onload = () =>
      @scene.world.initInstructions(@octagram)
      if @options and @options.onload then @options.onload()
      @scene.addEventListener "gameend", (evt) =>
        if @options and @options.onend then @options.onend(evt.params)

    @assets["font0.png"] = @assets['resources/ui/font0.png']
    @assets["apad.png"] = @assets['resources/ui/apad.png']
    @assets["icon0.png"] = @assets['resources/ui/icon0.png']
    @assets["pad.png"] = @assets['resources/ui/pad.png']

runGame = (options) ->
  game = new MazeGame Config.GAME_WIDTH, Config.GAME_HEIGHT, options
  game.start()