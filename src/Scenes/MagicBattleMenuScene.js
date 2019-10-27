//this is the pop up window to show player stats
import Phaser from 'phaser';


export default class MagicBattleMenuScene extends Phaser.Scene {
  constructor (key, parent) {
    super(key);
    this.parent = parent;
    this.width = 400;
    this.height = 400;
  }
  
  create(){
        
    let graphics = this.add.graphics();

     
     graphics.fillStyle(0x000000);
     graphics.fillRoundedRect(40,50,150,50,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(40,50,150,50,15);
     graphics.fillStyle(0xffffff);
     graphics.fillRoundedRect(20,80,240,310,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(20,80,240,310,15);
    
    this.add.text(60, 56, "MAGIC", { fontFamily: 'Courier New', fontSize: '18pt', color: '#ffffff'});
    

      
    let keyObj = this.input.keyboard.addKey('shift');
        keyObj.on('up', function(e){
            
            game.scene.resume('FightScene');
            game.scene.stop('MagicBattleMenu');
        });

    }

    closeStats(){
        

        
    }
    //end of class
}