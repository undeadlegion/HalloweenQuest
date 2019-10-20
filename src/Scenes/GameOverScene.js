import Phaser from 'phaser';
import GameOverScreen from '../assets/Game_Over.png';

export default class TitleScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.load.image('gameover', GameOverScreen);

  }
    
    create(){
        this.add.image(0, 0, 'gameover').setOrigin(0).setDepth(0);
    }
    
}