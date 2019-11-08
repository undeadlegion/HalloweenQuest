import Phaser from 'phaser';
import CharacterSprite from '../Sprites/CharacterSprite';
import annaAsset from '../assets/sprites/anna.png';
import playerAsset from '../assets/sprites/player.png';
import tilesAsset from '../assets/tiles/spooky-tileset.png';
import mapAsset from '../assets/maps/spookyhousemap.json';
import starAsset from '../assets/items/star.png';
import coinAsset from '../assets/items/coin.png';
import cauldronFullAsset from '../assets/items/cauldron-full.png';
import cauldronEmptyAsset from '../assets/items/cauldron-empty.png';

// import WebpackLoader from 'phaser-webpack-loader';
// import AssetManifest from '../assets/AssetManifest';
import themeAudio from '../assets/audio/SpookyJam1.wav';

export default class OverworldScene extends Phaser.Scene {
    constructor(key){
        super(key);
        this.audioFlag = true;
        this.startFlag = true;
    }
  preload() {
    this.load.image('star', starAsset);
    this.load.image('coin', coinAsset);
    this.load.image('cauldron-full', cauldronFullAsset);
    this.load.image('cauldron-empty', cauldronEmptyAsset);
    this.load.spritesheet('anna', annaAsset, { frameWidth: 64, frameHeight: 64 });

    this.load.spritesheet('player', playerAsset, { frameWidth: 50, frameHeight: 50 });

    this.load.image('spooky-tileset', tilesAsset);
    this.load.tilemapTiledJSON('map', mapAsset);

    this.load.audio('theme', themeAudio);
    // this.load.scenePlugin('WebpackLoader', WebpackLoader, 'loader', 'loader');
    // this.load.audio('theme', ['assets/audio/SpookyJam1.wav']);
  }

  create() {
    // create the map
    this.map = this.make.tilemap({ key: 'map' });
    this.tiles = this.map.addTilesetImage('spooky-tileset', 'spooky-tileset');
    this.baseLayer = this.map.createStaticLayer('base', [this.tiles], 0, 0);
    this.wallsLayer = this.map.createStaticLayer('walls', [this.tiles], 0, 0);


    // create the player
    if(this.startFlag){
        this.map.findObject('objects', (obj) => {
          if (obj.name === 'Start') {
            console.log(obj);
            this.player = new CharacterSprite(this, obj.x, obj.y, 'player');
            this.player.setCollideWorldBounds(true);
            this.createPlayerAnimations();
          }
        });        
        this.startFlag = false;
    } else {
        let playerx = game.playerStats["overworldX"];
        let playery = game.playerStats["overworldY"];
        this.player = new CharacterSprite(this, playerx, playery, 'player');
        this.player.setCollideWorldBounds(true);
        this.createPlayerAnimations();
    }


    // create the camera
    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


    // create the controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    // this.keys = this.physics.add.group({
    //   key: 'star',
    //   repeat: 11,
    //   setXY: { x: 12, y: 300, stepX: 70 },
    // });
    // console.log('Keys', this.keys);

    // doors == 5,6,7,10
    this.wallsLayer.setCollision([1, 2, 3, 4, 8, 9, 12, 14, 15, 16, 17, 18, 19]);

    // open doors
    this.wallsLayer.setCollision([5, 6, 7, 10], false);

    this.physics.add.collider(this.player, this.wallsLayer);

    // this.wallsLayer.renderDebug(this.add.graphics(), {
    //   tileColor: null, // non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles,
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Colliding face edges
    // });
    // this.baseLayer.renderDebug(this.add.graphics(), {
    //   tileColor: null, // non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles,
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Colliding face edges
    // });

    // create star objects
    this.items = this.map.createFromObjects('objects', 'Star', { key: 'star' }).map((sprite) => {
      sprite.setScale(1);
      sprite.setDepth(1);
      this.physics.world.enableBody(sprite);
      return sprite;
    });
    console.log('stars', this.items);

    // create cauldrons
    this.cauldrons = this.map.createFromObjects('objects', 'Cauldron', { key: 'cauldron-full' }).map((sprite) => {
      sprite.setScale(1);
      sprite.setDepth(2);
      this.physics.world.enableBody(sprite);
      return sprite;
    });
    this.collectedKeys = [];
    // this.physics.add.collider(this.player, this.cauldrons);

    //prevent duplicate event listeners
    this.events.off('startBattle');
    this.events.on('startBattle', () => {
        game.playerStats["overworldX"] = this.player.x;
        game.playerStats["overworldY"] = this.player.y;
        this.scene.start('FightScene');
    });

    this.events.off('showStatsWindow');
    this.events.on('showStatsWindow', () => {
        game.playerStats["launchSource"] = 'overworld';
      this.scene.launch('StatsPopUp');
      this.scene.pause();
    });

    // play the music - check the audio flag to avoid duplicate
    if(this.audioFlag){
        const music = this.sound.add('theme');
        music.play();
        this.audioFlag = false;
    // this.loader.start(AssetManifest);
    // this.loader.load().then(() => {
    //   const music = this.sound.add('SpookyJam1.wav');
    //   music.play();
    // });        
    }

  }

  update() {
    this.player.update(this.cursors);

    if (Phaser.Input.Keyboard.JustDown(this.aKey)) {
      this.cauldrons.forEach((cauldron) => {
        if (this.physics.world.intersects(this.player.body, cauldron.body)) {
          cauldron.setTexture('cauldron-empty');
          // get the key number property
          // console.log(cauldron);
          // this.collectedKeys.append[keyNumber];
        }
      });
    }

    // pick up keys
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.items.forEach((item) => {
        if (this.physics.world.intersects(this.player.body, item.body)) {
          item.setActive(false).setVisible(false);
        }
      });
      // this.keys.children.entries.forEach((key) => {
      //   if (this.physics.world.intersects(this.player.body, key.body)) {
      //     key.disableBody(true, true);
      //   }
      // });
    }
  }

  createPlayerAnimations() {
    this.anims.create({
      key: 'down',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 3,
      }),
    });
    this.anims.create({
      key: 'right',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('player', {
        start: 4,
        end: 7,
      }),
    });
    this.anims.create({
      key: 'left',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('player', {
        start: 8,
        end: 11,
      }),
    });
    this.anims.create({
      key: 'up',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('player', {
        start: 12,
        end: 15,
      }),
    });
  }

  collectKey(player, key) {
    console.log('Collected Key')
    key.disableBody(true, true);
  }
}
