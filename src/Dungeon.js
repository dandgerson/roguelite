import level from 'level'

class DungeonSingleton {
  constructor() {
    if (DungeonSingleton.instance) {
      console.warn('inappropriate instance of', DungeonSingleton.name)
      return DungeonSingleton.instance
    }

    DungeonSingleton.instance = this
  }

  #tileSize = 16
  sprites = {
    floor: 0,
    mud: 3,
    wall: 554,
    skeleton: 221,
    pillar: 424,
  }
  #spritesMap = {
    0: this.sprites.floor,
    1: this.sprites.wall,
    'S': this.sprites.skeleton,
    'I': this.sprites.pillar,
  }

  initialize({ scene, level }) {
    this.scene = scene
    this.level = level

    const map = this.scene.make.tilemap({
      data: this.getMappedTiles(),
      tileWidth: this.#tileSize,
      tileHeight: this.#tileSize,
    })

    const tileset = map.addTilesetImage(
      'tiles',
      'tiles',
      this.#tileSize,
      this.#tileSize,
      0,
      1,
    )

    this.map = map.createLayer(0, tileset, 0, 0)
  }

  getMappedTiles() {
    return this.level
      .map(row => row
        .map(tile => this.#spritesMap[tile]))
  }

  initializeEntity(entity) {
    const x = this.map.tileToWorldX(entity.x)
    const y = this.map.tileToWorldY(entity.y)
    entity.sprite = this.scene.add.sprite(x, y, 'tiles', entity.tile)
    entity.sprite.setOrigin(0)
  }

  moveEntityTo(entity, x, y) {
    entity.moving = true

    this.scene.tweens.add({
      targets: entity.sprite,
      onComplete: () => {
        entity.moving = false
        entity.x = x
        entity.y = y
      },
      x: this.map.tileToWorldX(x),
      y: this.map.tileToWorldY(y),
      ease: 'Power2',
      duration: 200,
    })
  }

  isWalkableTile(x, y) {
    return this.level[y][x] !== 1
  }
}

export default DungeonSingleton
