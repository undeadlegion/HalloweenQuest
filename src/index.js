import Phaser from 'phaser';
import config from './config';
import OverworldScene from './Scenes/OverworldScene';
import TitleScene from './Scenes/TitleScene';
import FightScene from './Scenes/BattleScene';
import MagicBattleMenu from './Scenes/MagicBattleMenuScene';
import StatsPopUp from './Scenes/CharacterStatsScene';
import GameOver from './Scenes/GameOverScene';
import WinScene from './Scenes/WinScene';


//test new Fight Scene
import FightScene2 from './Scenes/FightScene';

import playerStats from './Sprites/CharacterStats.js';
import enemies from './enemies.js';
import enemiesaudio from './enemiesaudio.js';

class Game extends Phaser.Game {
  constructor() {
    super(config);
      
    this.enemies = enemies;
    this.playerStats = playerStats;
    this.enemiesaudio = enemiesaudio;
    this.turn = 0;
      
    this.scene.add('TitleScene', TitleScene);
    this.scene.add('OverworldScene', OverworldScene);
    this.scene.add('FightScene', FightScene2);
    this.scene.add('MagicBattleMenu', MagicBattleMenu);
    this.scene.add('StatsPopUp', StatsPopUp);
    this.scene.add('GameOver', GameOver);
    this.scene.add('WinScene', WinScene);
      
    //this.scene.add('FightScene2', FightScene2);
      
    this.scene.start('TitleScene');
      
  }
}

window.game = new Game();
