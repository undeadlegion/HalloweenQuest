import Phaser from 'phaser';
import config from './config';
import OverworldScene from './Scenes/OverworldScene';
import TitleScene from './Scenes/TitleScene';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('TitleScene', TitleScene);
    this.scene.add('OverworldScene', OverworldScene);
    this.scene.start('TitleScene');
  }
}

window.game = new Game();
