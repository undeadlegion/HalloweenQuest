//this is the pop up window to show player stats
import Phaser from 'phaser';
import buffbtn from '../assets/battle/spellbuttons/buff.png';
import bulkbtn from '../assets/battle/spellbuttons/bulk.png';
import chargebtn from '../assets/battle/spellbuttons/charge.png';
import fireballbtn from '../assets/battle/spellbuttons/fireball.png';
import healbtn from '../assets/battle/spellbuttons/heal.png';
import trickortreatbtn from '../assets/battle/spellbuttons/trickortreat.png';

export default class MagicBattleMenuScene extends Phaser.Scene {
  constructor (key, parent) {
    super(key);
    this.parent = parent;
    this.width = 400;
    this.height = 400;
  }
  
    preload(){
        this.load.image('buffbtn', buffbtn);
        this.load.image('bulkbtn', bulkbtn);
        this.load.image('chargebtn', chargebtn);
        this.load.image('fireballbtn', fireballbtn);
        this.load.image('healbtn', healbtn);
        this.load.image('trickortreatbtn', trickortreatbtn);
    }
    
    
  create(){
      let xpos = 420;
      let ypos = 360;        
    let graphics = this.add.graphics();

     
     graphics.fillStyle(0x0000ff);
     graphics.fillRoundedRect(xpos-10,ypos-40,250,50,15);
     graphics.lineStyle(5,0x0000ff);
     graphics.strokeRoundedRect(xpos-10,ypos-40,250,50,15);
     graphics.fillStyle(0xffffff);
     graphics.fillRoundedRect(xpos-30,ypos-10,360,220,15);
     graphics.lineStyle(5,0x0000ff);
     graphics.strokeRoundedRect(xpos-30,ypos-10,360,220,15);
    
    this.add.text(xpos+80, ypos-36, "MAGIC", { fontFamily: 'Courier New', fontSize: '18pt', color: '#ffffff'});
    

      
      
       //magic action buttons
     
     let btnBuff = this.add.image(xpos + 170, ypos + 20, 'buffbtn').setOrigin(0);
     btnBuff.setScale(0.4);
     btnBuff.setInteractive();
     btnBuff.on('pointerup', () => {
         console.log("Buff button");
     });

     let btnBulk = this.add.image(xpos, ypos + 150, 'bulkbtn').setOrigin(0);
     btnBulk.setScale(0.4);
     btnBulk.setInteractive();
     btnBulk.on('pointerup', () => {
         console.log("Bulk button");
     });

     let btnCharge = this.add.image(xpos + 170, ypos + 80, 'chargebtn').setOrigin(0);
     btnCharge.setScale(0.4);
     btnCharge.setInteractive();
     btnCharge.on('pointerup', () => {
         console.log("Charge button");
     });


     let btnFireball = this.add.image(xpos, ypos + 85, 'fireballbtn').setOrigin(0);
     btnFireball.setScale(0.4);
     btnFireball.setInteractive();
     btnFireball.on('pointerup', () => {
         console.log("Fireball button");
     });

     let btnHeal = this.add.image(xpos, ypos + 20, 'healbtn').setOrigin(0);
     btnHeal.setScale(0.4);
     btnHeal.setInteractive();
     btnHeal.on('pointerup', () => {
         console.log("Heal button");
     });
      
     let btnTrickorTreat = this.add.image(xpos + 170, ypos + 147, 'trickortreatbtn').setOrigin(0);
     btnTrickorTreat.setScale(0.4);
     btnTrickorTreat.setInteractive();
     btnTrickorTreat.on('pointerup', () => {
         console.log("Trick or Treat button");
     });
      
    let keyObj = this.input.keyboard.addKey('shift');
        keyObj.on('up', function(e){
            
            game.scene.resume('FightScene');
            game.scene.stop('MagicBattleMenu');
        });

      let keyObj2 = this.input.keyboard.addKey('z');
        keyObj2.on('up', function(e){
            
            game.scene.resume('FightScene');
            game.scene.stop('MagicBattleMenu');
        });
    }


    //end of class
}