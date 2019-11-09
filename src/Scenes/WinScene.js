import Phaser from 'phaser';
import WinScreen from '../assets/Win_Screen.png';

export default class WinScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.load.image('win', WinScreen);

  }
    
    create(){
        this.add.image(0, 0, 'win').setOrigin(0).setDepth(0);
    }
    
}