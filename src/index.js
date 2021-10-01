import Phaser from "phaser";
import arcadePng from 'font/arcade.png'
import arcadeXml from 'font/arcade.xml'

import 'styles/main.scss'

const scene = {
  preload() {
    this.load.bitmapFont('arcade', arcadePng, arcadeXml)
  },
  create() {
    this.add.bitmapText(400, 300, 'arcade', 'Hello Phaser').setOrigin(0.5)
  },
}

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
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

const game = new Phaser.Game(config)
