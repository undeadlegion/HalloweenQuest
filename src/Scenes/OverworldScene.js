import Phaser from 'phaser';
import CharacterSprite from '../Sprites/CharacterSprite';
import annaAsset from '../assets/sprites/anna.png';
import tilesAsset from '../assets/tiles/spooky-tileset.png';
import mapAsset from '../assets/maps/spookyhousemap.json';
import starAsset from '../assets/items/star.png';
import coinAsset from '../assets/items/coin.png';

export default class OverworldScene extends Phaser.Scene {
  preload() {
    this.load.image('star', starAsset);
    this.load.image('coin', coinAsset);
    this.load.spritesheet('anna', annaAsset, { frameWidth: 64, frameHeight: 64 });

    this.load.image('spooky-tileset', tilesAsset);
    this.load.tilemapTiledJSON('map', mapAsset);
  }

  create() {
    this.map = this.make.tilemap({ key: 'map' });
    this.tiles = this.map.addTilesetImage('spooky-tileset', 'spooky-tileset');
    this.baseLayer = this.map.createStaticLayer('base', this.tiles, 0, 0);
    this.wallsLayer = this.map.createStaticLayer('walls', this.tiles, 0, 0);

    this.anna = new CharacterSprite(this, 400, 400, 'anna', 26);
    // this.anna.setSize(50, 50);
    // this.anna.setSize(40, 50).setOffset(10, 10);
    this.anna.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.cameras.main.startFollow(this.anna);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // this.keys = this.physics.add.group({
    //   key: 'star',
    //   repeat: 11,
    //   setXY: { x: 12, y: 300, stepX: 70 },
    // });
    // console.log('Keys', this.keys);

    this.physics.add.collider(this.anna, this.wallsLayer);
    this.wallsLayer.setCollisionByExclusion(-1);

    this.wallsLayer.renderDebug(this.add.graphics(), {
      tileColor: null, // non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles,
      faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Colliding face edges
    });

    // create star objects
    let items = this.map.createFromObjects('objects', 'Star', { key: 'star' }).map((sprite) => {
      sprite.setScale(2);
      sprite.setInteractive();
      return sprite;
    });
    console.log('stars', items);

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

    this.events.on('startBattle', () => {
      this.scene.start('FightScene');
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
