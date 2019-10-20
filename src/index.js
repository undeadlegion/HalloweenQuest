import 'phaser';
import config from './config';
import OverworldScene from './Scenes/OverworldScene';
import TitleScene from './Scenes/TitleScene';
import FightScene from './scenes/battlescene';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('TitleScene', TitleScene);
    this.scene.add('OverworldScene', OverworldScene);
    this.scene.add('FightScene', FightScene);
    this.scene.start('TitleScene');
  }
}
 
window.game = new Game();
