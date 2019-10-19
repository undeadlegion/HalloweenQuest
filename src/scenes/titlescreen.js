import Phaser from 'phaser';
import tilesAsset from '../assets/tiles/cybernoid.png';
import mapAsset from '../assets/maps/cybernoid.json';
import titleScreen from '../assets/Title-page-temp-01.png';
import startButton from '../assets/start-temp.png';


export default class TitleScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

    preload() {
      this.load.image('titlescreen', titleScreen);
        this.load.image('startbutton', startButton);
      this.load.image('tiles', tilesAsset);
      this.load.tilemapTiledJSON('map', mapAsset);
    }
    
    create(){

        this.add.image(0,0, "titlescreen").setOrigin(0);
        let startBtn = this.add.image(340, 420, "startbutton").setOrigin(0);
        
        startBtn.setInteractive();
        startBtn.on("pointerup", ()=>{
            this.scene.start("OverworldScene");
        })
    }
        
//end of class
};