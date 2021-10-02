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
      data: this.getRemappedTiles(),
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

  getRemappedTiles() {
    return this.level
      .map(row => row
        .map(tile => this.#spritesMap[tile]))
  }
}

export default DungeonSingleton
