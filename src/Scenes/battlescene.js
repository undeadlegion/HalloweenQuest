import Phaser from 'phaser';
import fightScene from '../assets/battle/white.png';
import playerSprite from '../assets/battle/player_battle.png';
import trollCauldron from '../assets/enemies/Troll_Cauldron.png';
import jak_n_box from '../assets/enemies/Jak_N_Box.png';
import schoolBully from '../assets/enemies/School_Bully.png';
import shadowBeast from '../assets/enemies/Shadow_Beast.png';
import shyNosferatu from '../assets/enemies/shy_Nosferatu.png';
import attack from '../assets/battle/Attack.png';
import defend from '../assets/battle/Defend.png';
import magic from '../assets/battle/Magic.png';
import runbtn from '../assets/battle/Run.png';
import enemies from '../enemies.js';

export default class FightScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

preload(){
    this.load.image('fightscene', fightScene);
    this.load.image('playerSprite', playerSprite);
    this.load.image('trollCauldron', trollCauldron);
    this.load.image('jak_n_box', jak_n_box);
    this.load.image('schoolBully', schoolBully);
    this.load.image('shadowBeast', shadowBeast);
    this.load.image('shyNosferatu', shyNosferatu);
    this.load.image('attack', attack);
    this.load.image('defend', defend);
    this.load.image('magic', magic);
    this.load.image('runbtn', runbtn);
    
}
 create() {
    //hard coded for testing
     let currentEnemyImg = 'shyNosferatu';
     let currentEnemy = enemies[currentEnemyImg]['name'];
     
     
     
     this.add.image(0,0,'fightscene').setOrigin(0);
     let enemySprite = this.add.sprite(350 + enemies[currentEnemyImg]['xpos'], enemies[currentEnemyImg]['ypos'], currentEnemyImg).setOrigin(0);
     enemySprite.setScale(enemies[currentEnemyImg]['scale']);
     let playerSprite = this.add.sprite(50,300,'playerSprite').setOrigin(0);
     playerSprite.setScale(1);
     
     let graphics = this.add.graphics();
     
     //enemy HP - hard coded for testing
     graphics.fillStyle(0x000000);
     graphics.fillRoundedRect(120,70,200,50,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(120,70,200,50,15);
     graphics.fillStyle(0xffffff);
     graphics.fillRoundedRect(100,100,330,60,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(100,100,330,60,15);
     this.add.text(120, 120, "HP", { fontFamily: 'Courier New', fontSize: '18pt', color: '#000000'});
     this.add.text(130, 75, currentEnemy, { fontFamily: 'Courier New', fontSize: '16pt', color: '#ffffff'});

     
     let enemyHP=enemies[currentEnemyImg]['HP']; 
     
     for(let i=0; i<10; i++){
         if(i<enemyHP/10){
            graphics.fillStyle(0x00ba0c);
            graphics.fillRect(160 + i*25,116,25,30);
         } else {
            graphics.fillStyle(0xdddddd);
            graphics.fillRect(160 + i*25,116,25,30);   
         }
     }
     
     //player stats box
     let stats_xpos = 400;
     let stats_ypos = 350;
     graphics.fillStyle(0x000000);
     graphics.fillRoundedRect(stats_xpos + 20,stats_ypos - 30,210,50,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(stats_xpos + 20,stats_ypos - 30,210,50,15);
     graphics.fillStyle(0xffffff);
     graphics.fillRoundedRect(stats_xpos,stats_ypos,330,210,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(stats_xpos,stats_ypos,330,210,15);
     this.add.text(stats_xpos + 30, stats_ypos - 25, "Player", { fontFamily: 'Courier New', fontSize: '16pt', color: '#ffffff'});
     this.add.text(stats_xpos + 20, stats_ypos + 20, "HP", { fontFamily: 'Courier New', fontSize: '18pt', color: '#000000'});
     this.add.text(stats_xpos + 20, stats_ypos + 60, "MP", { fontFamily: 'Courier New', fontSize: '18pt', color: '#000000'});
     
     //player action buttons
     let btnAttack = this.add.image(stats_xpos + 50, stats_ypos + 100, 'attack').setOrigin(0);
     btnAttack.setScale(0.04);
     let btnDefend = this.add.image(stats_xpos + 170, stats_ypos + 100, 'defend').setOrigin(0);
     btnDefend.setScale(0.04);
     let btnMagic = this.add.image(stats_xpos + 50, stats_ypos + 150, 'magic').setOrigin(0);
     btnMagic.setScale(0.04);
     let btnRun = this.add.image(stats_xpos + 170, stats_ypos + 150, 'runbtn').setOrigin(0);
     btnRun.setScale(0.04);
     
     this.showPlayerStats(stats_xpos, stats_ypos);
 }
    
 showPlayerStats(xpos, ypos){
     let graphics = this.add.graphics();
     //show current player stats

        let playerHP=80; // hard coded for testing
     
     for(let i=0; i<10; i++){
         if(i<playerHP/10){
            graphics.fillStyle(0x00ba0c);
            graphics.fillRect(xpos + 60 + i*25,ypos + 16,25,30);
         } else {
            graphics.fillStyle(0xdddddd);
            graphics.fillRect(xpos + 60 + i*25,ypos + 16,25,30);   
         }
     }
     
     let playerMP=90; // hard coded for testing
     
     for(let i=0; i<10; i++){
         if(i<playerHP/10){
            graphics.fillStyle(0x0000ff);
            graphics.fillRect(xpos + 60 + i*25,ypos + 56,25,30);
         } else {
            graphics.fillStyle(0xdddddd);
            graphics.fillRect(xpos + 60 + i*25,ypos + 56,25,30);   
         }
     }
     
     
    }

 update() {


}
    
 
    
//end of class
};