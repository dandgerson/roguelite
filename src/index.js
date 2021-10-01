import Phaser from "phaser";
import arcadePng from 'font/arcade.png'
import arcadeXml from 'font/arcade.xml'
import tiles from 'assets/colored.png'

import 'styles/main.scss'

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = {
  preload() {
    this.load.bitmapFont('arcade', arcadePng, arcadeXml)

    this.load.spritesheet(
      'tiles',
      tiles,
      {
        frameWidth: 16,
        frameHeight: 16,
        spacing: 1,
      }
    )
  },

  create() {
    this.helloText = this.add.bitmapText(
      config.width / 2,
      config.height / 2,
      'arcade',
      'Hello Phaser'
    ).setOrigin(0.5)

    this.cursors = this.input.keyboard.createCursorKeys()

    const tileMap = {
      0: {
        text: 'floor',
        num: 0,
      },
      1: {
        text: 'wall',
        num: 554,
      },
      'S': {
        text: 'skeleton',
        num: 221,
      },
      'I': {
        text: 'pillar',
        num: 424,
      }
    }

    const level = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 'I', 0, 0, 0, 0, 'I', 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 'S', 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 'I', 0, 0, 0, 0, 'I', 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ].map(row => row.map(tile => tileMap[tile].num))



    const tileSize = 16
    const tileConfig = {
      data: level,
      tileWidth: tileSize,
      tileHeight: tileSize,
    }

    const map = this.make.tilemap(tileConfig)
    const tileset = map.addTilesetImage(
      'tiles',
      'tiles',
      tileSize,
      tileSize,
      0,
      1,
    )

    console.log({ tileset })

    const ground = map.createLayer(0, tileset, 0, 0)
  },

  update() {
    switch (true) {
      case this.cursors.left.isDown: {
        this.helloText.x -= 10
        break
      }
      case this.cursors.right.isDown: {
        this.helloText.x += 10
        break
      }
      case this.cursors.up.isDown: {
        this.helloText.y -= 10
        break
      }
      case this.cursors.down.isDown: {
        this.helloText.y += 10
      }
      default: break
    }

    if (this.helloText.x > config.width + this.helloText.width / 2) {
      this.helloText.x = -this.helloText.width / 2
    }
    if (this.helloText.x < -this.helloText.width / 2) {
      this.helloText.x = config.width + this.helloText.width / 2
    }
    if (this.helloText.y > config.height + this.helloText.height / 2) {
      this.helloText.y = -this.helloText.height / 2
    }
    if (this.helloText.y < -this.helloText.height / 2) {
      this.helloText.y = config.height + this.helloText.height / 2
    }


  }
}

const phaserConfig = {
  type: Phaser.AUTO,
  width: config.width,
  height: config.height,
  backgroundColor: '#000',
  parent: 'root',
  pixelArt: true,
  scene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
}

const game = new Phaser.Game(phaserConfig)
