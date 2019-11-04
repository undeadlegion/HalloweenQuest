//this is the pop up window to show player stats
import Phaser from 'phaser';
import playerStats from '../Sprites/CharacterStats.js';

export default class CharacterStatsScene extends Phaser.Scene {
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
    
    this.add.text(60, 56, "Anna", { fontFamily: 'Courier New', fontSize: '18pt', color: '#ffffff'});
    
    let ypos = 100;
    for(var mykey in playerStats){
        //console.log(mykey);
        if(mykey != "MAGIC"){
            this.add.text(50, ypos, mykey, { fontFamily: 'Courier New', fontSize: '18pt', color: '#000000'});
            this.add.text(180, ypos, playerStats[mykey], { fontFamily: 'Courier New', fontSize: '18pt', color: '#000000'});
            ypos += 25;
        }
    }
      
    let keyObj = this.input.keyboard.addKey('shift');
        keyObj.on('up', function(e){
            
            game.scene.resume('OverworldScene');
            game.scene.stop('StatsPopUp');
        });

    let keyObj2 = this.input.keyboard.addKey('z');
        keyObj2.on('up', function(e){
            
            game.scene.resume('OverworldScene');
            game.scene.stop('StatsPopUp');
        });
    }

    closeStats(){
        

        
    }
    //end of class
}