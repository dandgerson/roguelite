import Phaser from "phaser";
import arcadePng from 'font/arcade.png'
import arcadeXml from 'font/arcade.xml'

import 'styles/main.scss'

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = {
  preload() {
    this.load.bitmapFont('arcade', arcadePng, arcadeXml)
  },
  create() {
    this.add.bitmapText(config.width / 2, config.height / 2, 'arcade', 'Hello Phaser').setOrigin(0.5)
  },
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
