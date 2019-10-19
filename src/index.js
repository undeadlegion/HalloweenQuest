import 'phaser';
import config from './config';
import OverworldScene from './scenes/overworld';
import TitleScene from './scenes/titlescreen';




class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('TitleScene', TitleScene);
    this.scene.add('OverworldScene', OverworldScene);
    this.scene.start('TitleScene');
  }
}

window.game = new Game();
