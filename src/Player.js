class Player {
  constructor({ x, y, dungeon, scene }) {
    Object.assign(this, {
      x, y, dungeon, scene
    })

    this.movementsPoints = 5
    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.sprite = 29

    this.dungeon.map.putTileAt(this.sprite, this.x, this.y)
  }

  refresh() {
    this.movementsPoints = 5
  }

  isOver() {
    return this.movementsPoints === 0
  }

  turn() {
    let oldX = this.x
    let oldY = this.y
    let isMoved = false

    if (this.movementsPoints > 0) {
      if (this.cursors.left.isDown) {
        this.x -= 1
        isMoved = true
      }

      if (this.cursors.right.isDown) {
        this.x += 1
        isMoved = true
      }

      if (this.cursors.up.isDown) {
        this.y -= 1
        isMoved = true
      }

      if (this.cursors.down.isDown) {
        this.y += 1
        isMoved = true
      }

      if (isMoved) {
        this.movementsPoints -= 1
      }
    }

    const tileAtDestination = this.dungeon.map.getTileAt(this.x, this.y)
    if (tileAtDestination.index === this.dungeon.sprites.wall) {
      if (this.movementsPoints > 0) {
        this.dungeon.map.putTileAt(this.sprite, this.x, this.y)
        this.dungeon.map.putTileAt(this.dungeon.sprites.mud, oldX, oldY)

        this.movementsPoints -= 1
      } else {
        this.x = oldX
        this.y = oldY
      }

    }

    if (this.x !== oldX || this.y !== oldY) {
      this.dungeon.map.putTileAt(this.sprite, this.x, this.y)
      this.dungeon.map.putTileAt(this.dungeon.sprites.floor, oldX, oldY)
    }

  }

}

export default Player
