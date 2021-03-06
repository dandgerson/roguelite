import Phaser from "phaser";
import tiles from 'assets/colored.png'

import 'styles/main.scss'

import level from "level"

import DungeonSingleton from 'Dungeon'
import TurnManagerSingleton from 'TurnManager'
import Player from 'Player'

const turnManager = new TurnManagerSingleton()

const phaserConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#000',
  parent: 'root',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload() {
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
      const dungeon = new DungeonSingleton()
      dungeon.initialize({ scene: this, level })

      const player = new Player({
        x: 15,
        y: 15,
        dungeon,
        scene: this,
      })
      turnManager.addEntity(player)
    },

    update() {
      if (turnManager.isOver()) {
        turnManager.refresh()
      }

      turnManager.turn()
    }
  },
}

const game = new Phaser.Game(phaserConfig)
