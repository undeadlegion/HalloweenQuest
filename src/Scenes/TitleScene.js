import Phaser from 'phaser';
import tilesAsset from '../assets/tiles/cybernoid.png';
import mapAsset from '../assets/maps/cybernoid.json';
import titleScreen from '../assets/title/title-page.png';
import startButton from '../assets/title/start.png';


export default class TitleScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.load.image('titlescreen', titleScreen);
    this.load.image('startbutton', startButton);
    this.load.image('tiles', tilesAsset);
    this.load.tilemapTiledJSON('map', mapAsset);
  }

  create() {
    const story_text = [
      'Once upon a time, in a town not too different from your',
      'own, there was a special festival called Halloween.',
      'During this wonderful time of year, kids would celebrate',
      'by going on adventures dressed as their favorite ',
      'characters and receiving candies from all of their ',
      'friends and neighbors. It was a time filled with joy ',
      'and excitement.',
      '',
      'That is... until one day when all the candy and joy ',
      'in the town was stolen by the infamous Sugar Daddy. ',
      '',
      'He challenged everyone to go through his mansion of ',
      'traps and horrors if they wanted their precious candy ',
      'back. Everyone in town was terrified and wouldn’t ',
      'dare go near the dreaded mansion. ',
      '',
      'All hope seemed lost. ',
      '',
      'But then one small brave youth stepped forward. ',
      '',
      "With a witch's broom in hand and determination in",
      'her heart, she marched forward... ',
      '',
      'ready to get the candy back.',
    ];

    this.add.image(0, 0, 'titlescreen').setOrigin(0).setDepth(0);
    const startBtn = this.add.image(340, 320, 'startbutton').setOrigin(0).setDepth(1);

    const graphics = this.make.graphics();
    graphics.fillStyle = 'black';
    graphics.fillRect(70,460,700,80);
    const mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

    const text = this.add.text(80, 520, story_text, {
      fontFamily: 'Courier New', fontSize: '14pt', color: '#ffff00', wordWrap: { width: 680 },
    }).setOrigin(0).setDepth(2);
    text.setMask(mask);

    this.textbox = text;
    this.textspeedcount = 0;

    startBtn.setInteractive();
    startBtn.on('pointerup', () => {
      this.scene.start('FightScene');
    });
  }

  update() {
    // scroll the text
    this.textspeedcount += 1;
    if (this.textspeedcount === 30) {
      this.textbox.y -= 5;
      this.textspeedcount = 0;
    }
    // start again
    if (this.textbox.y === -50) {
      this.textbox.y = 550;
    }
  }    
// end of class
}
