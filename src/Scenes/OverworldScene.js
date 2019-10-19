import Phaser from 'phaser';
import CharacterSprite from '../Sprites/CharacterSprite';
import annaAsset from '../assets/sprites/anna.png';

export default class OverworldScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet('anna', annaAsset, { frameWidth: 64, frameHeight: 64 });
  }

  create() {
    this.map = this.make.tilemap({ key: 'map' });
    this.tiles = this.map.addTilesetImage('cybernoid', 'tiles');
    this.layer = this.map.createStaticLayer(0, this.tiles, 0, 0);

    this.anna = new CharacterSprite(this, 400, 400, 'anna', 26);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'left',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('anna', {
        start: 9,
        end: 17,
      }),
    });
    this.anims.create({
      key: 'down',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('anna', {
        start: 18,
        end: 26,
      }),
    });
    this.anims.create({
      key: 'up',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('anna', {
        start: 0,
        end: 8,
      }),
    });
    this.anims.create({
      key: 'right',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('anna', {
        start: 27,
        end: 35,
      }),
    });
  }

  update() {
    this.anna.update(this.cursors);
  }
}
