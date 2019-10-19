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
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, platforms);

  cursors = this.input.keyboard.createCursorKeys();


  map = this.make.tilemap({ key: 'map' });
  tiles = map.addTilesetImage('cybernoid', 'tiles');
  layer = map.createStaticLayer(0, tiles, 0, 0);

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
