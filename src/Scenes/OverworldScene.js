import Phaser from 'phaser';
import CharacterSprite from '../Sprites/CharacterSprite';
import annaAsset from '../assets/sprites/anna.png';
import starAsset from '../assets/star.png';

export default class OverworldScene extends Phaser.Scene {
  preload() {
    this.load.image('star', starAsset);
    this.load.spritesheet('anna', annaAsset, { frameWidth: 64, frameHeight: 64 });
  }

  create() {
    this.map = this.make.tilemap({ key: 'map' });
    this.tiles = this.map.addTilesetImage('cybernoid', 'tiles');
    this.layer = this.map.createStaticLayer(0, this.tiles, 0, 0);

    this.anna = new CharacterSprite(this, 400, 400, 'anna', 26);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.cameras.main.startFollow(this.anna);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.keys = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 300, stepX: 70 },
    });
    console.log('Keys', this.keys);

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

    // pick up keys
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.keys.children.entries.forEach((key) => {
        if (this.physics.world.intersects(this.anna.body, key.body)) {
          key.disableBody(true, true);
        }
      });
    }
  }

  collectKey(player, key) {
    console.log('Collected Key')
    key.disableBody(true, true);
  }
}
