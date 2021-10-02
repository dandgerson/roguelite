class Player {
  constructor({ x, y, dungeon, scene }) {
    Object.assign(this, {
      x, y, dungeon, scene
    })

    this.movementsPoints = 1
    this.cursors = this.scene.input.keyboard.createCursorKeys()
    const self = this

    console.log({
      cursors: self.cursors
    })
    this.sprite = 29

    this.dungeon.map.putTileAt(this.sprite, this.x, this.y)
  }

  refresh() {
    this.movementsPoints = 1
  }

  isOver() {
    return this.movementsPoints === 0
  }

  turn() {
    let oldX = this.x
    let oldY = this.y
    let isMoved = false

    const self = this

    if (this.movementsPoints > 0) {
      if (this.cursors.left.isDown) {
        this.x -= 1
        isMoved = true

        console.log('left', {
          x: self.x,
        })
      }

      if (this.cursors.right.isDown) {
        this.x += 1
        isMoved = true

        console.log('right', {
          x: self.x,
        })
      }

      if (this.cursors.up.isDown) {
        this.y -= 1
        isMoved = true

        console.log('up', {
          y: self.y,
        })
      }

      if (this.cursors.down.isDown) {
        this.y += 1
        isMoved = true

        console.log('down', {
          y: self.y,
        })
      }

      if (isMoved) {
        this.movementsPoints -= 1
      }
    }

    const tileAtDestination = this.dungeon.map.getTileAt(this.x, this.y)
    console.log({ tileAtDestination })
    if (tileAtDestination.index === this.dungeon.sprites.wall) {
      this.x = oldX
      this.y = oldY
    }

    if (this.x !== oldX || this.y !== oldY) {
      this.dungeon.map.putTileAt(this.sprite, this.x, this.y)
      this.dungeon.map.putTileAt(this.dungeon.sprites.floor, oldX, oldY)
    }

  }

}

export default Player
