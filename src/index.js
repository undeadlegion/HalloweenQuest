import Phaser from 'phaser';
import config from './config';
import OverworldScene from './Scenes/OverworldScene';
import TitleScene from './Scenes/TitleScene';
import FightScene from './Scenes/BattleScene';
import StatsPopUp from './Scenes/CharacterStatsScene';
import GameOver from './Scenes/GameOverScene';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('TitleScene', TitleScene);
    this.scene.add('OverworldScene', OverworldScene);
    this.scene.add('FightScene', FightScene);
    this.scene.add('StatsPopUp', StatsPopUp);
    this.scene.add('GameOver', GameOver);
      
    this.scene.start('TitleScene');
      
  }
}

window.game = new Game();
