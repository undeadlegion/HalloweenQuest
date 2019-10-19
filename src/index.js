    import Phaser from 'phaser';
import sky from './assets/sky.png';
import platform from './assets/platform.png';
import dude from './assets/dude.png';
import tilesAsset from './assets/tiles/cybernoid.png';
import mapAsset from './assets/maps/cybernoid.json';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let platforms;
let player;
let cursors;
let tiles;
let layer;
let map;

function preload() {
  this.load.image('sky', sky);
  this.load.image('ground', platform);
  this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
  this.load.image('tiles', tilesAsset);
  this.load.tilemapTiledJSON('map', mapAsset);
}

function create() {
  map = this.make.tilemap({ key: 'map' });
  tiles = map.addTilesetImage('cybernoid', 'tiles');
  layer = map.createStaticLayer(0, tiles, 0, 0);

}

function update() {


}
