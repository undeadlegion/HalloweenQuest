import Phaser from 'phaser';
import fightScene from '../assets/fight-temp.png';
import playerSprite from '../assets/Player.png';
import trollCauldron from '../assets/Troll_Cauldron.png';
import attack from '../assets/battle/attack-temp.png';
import defend from '../assets/battle/defend-temp.png';
import magic from '../assets/battle/magic-temp.png';
import runbtn from '../assets/battle/run-temp.png';

export default class FightScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

preload(){
    this.load.image('fightscene', fightScene);
    this.load.image('trollCauldron', trollCauldron);
    this.load.image('attack', attack);
    this.load.image('defend', defend);
    this.load.image('magic', magic);
    this.load.image('runbtn', runbtn);
}
 create() {
  
     this.add.image(0,0,'fightscene').setOrigin(0);
     let enemySprite = this.add.sprite(300, 0, 'trollCauldron').setOrigin(0);
     enemySprite.setScale(0.3);
     let playerSprite = this.add.sprite(0,0,'playerSprite').setOrigin(0);
     playerSprite.setScale(2);
     
     let graphics = this.add.graphics();
     
     //enemy HP - hard coded for Troll Cauldron right now
     graphics.fillStyle(0x330000);
     graphics.fillRoundedRect(120,70,200,50,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(120,70,200,50,15);
     graphics.fillStyle(0xffffff);
     graphics.fillRoundedRect(100,100,320,60,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(100,100,320,60,15);
     this.add.text(120, 120, "HP", { fontFamily: 'Courier New', fontSize: '18pt', color: '#000000'});
     this.add.text(130, 75, "Troll Cauldron", { fontFamily: 'Courier New', fontSize: '16pt', color: '#ffffff'});

     
     let enemyHP=60; // hard coded for testing
     
     for(let i=0; i<10; i++){
         if(i<enemyHP/10){
            graphics.fillStyle(0xff0000);
            graphics.fillRect(160 + i*25,116,25,30);
         } else {
            graphics.fillStyle(0xdddddd);
            graphics.fillRect(160 + i*25,116,25,30);   
         }
     }
     
     //player stats box
     let stats_xpos = 400;
     let stats_ypos = 400;
     graphics.fillStyle(0x330000);
     graphics.fillRoundedRect(stats_xpos + 20,stats_ypos - 30,200,50,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(stats_xpos + 20,stats_ypos - 30,200,50,15);
     graphics.fillStyle(0xffffff);
     graphics.fillRoundedRect(stats_xpos,stats_ypos,320,200,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(stats_xpos,stats_ypos,320,200,15);
     this.add.text(stats_xpos + 30, stats_ypos - 25, "Player", { fontFamily: 'Courier New', fontSize: '16pt', color: '#ffffff'});
     this.add.text(stats_xpos + 20, stats_ypos + 20, "HP", { fontFamily: 'Courier New', fontSize: '18pt', color: '#000000'});
     this.add.text(stats_xpos + 20, stats_ypos + 60, "MP", { fontFamily: 'Courier New', fontSize: '18pt', color: '#000000'});
     
     //player action buttons
     let btnAttack = this.add.image(stats_xpos + 20, stats_ypos + 100, 'attack').setOrigin(0);
     btnAttack.setScale(0.7);
     let btnDefend = this.add.image(570, stats_ypos + 100, 'defend').setOrigin(0);
     btnDefend.setScale(0.7);
     let btnMagic = this.add.image(stats_xpos + 20, stats_ypos + 150, 'magic').setOrigin(0);
     btnMagic.setScale(0.7);
     let btnRun = this.add.image(570, stats_ypos + 150, 'runbtn').setOrigin(0);
     btnRun.setScale(0.7);
     
     this.showPlayerStats();
 }
    
 showPlayerStats(){
     let graphics = this.add.graphics();
     //show current player stats

        let playerHP=80; // hard coded for testing
     
     for(let i=0; i<10; i++){
         if(i<playerHP/10){
            graphics.fillStyle(0xff0000);
            graphics.fillRect(460 + i*25,416,25,30);
         } else {
            graphics.fillStyle(0xdddddd);
            graphics.fillRect(460 + i*25,416,25,30);   
         }
     }
     
     let playerMP=90; // hard coded for testing
     
     for(let i=0; i<10; i++){
         if(i<playerHP/10){
            graphics.fillStyle(0x0000ff);
            graphics.fillRect(460 + i*25,456,25,30);
         } else {
            graphics.fillStyle(0xdddddd);
            graphics.fillRect(460 + i*25,456,25,30);   
         }
     }
     
     
    }

 update() {


}
    
 
    
//end of class
};