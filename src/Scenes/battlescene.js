import Phaser from 'phaser';
import fightScene from '../assets/battle/white.png';
import playerSprite from '../assets/battle/player_battle.png';
import trollCauldron from '../assets/enemies/Troll_Cauldron.png';
import jak_n_box from '../assets/enemies/Jak_N_Box.png';
import schoolBully from '../assets/enemies/School_Bully.png';
import shadowBeast from '../assets/enemies/Shadow_Beast.png';
import bedsheetGhost from '../assets/enemies/Bedsheet_Ghost.png';
import shyNosferatu from '../assets/enemies/shy_Nosferatu.png';
import unsureFranky from '../assets/enemies/Unsure_Franky.png';
import skellOnStrings from '../assets/enemies/Skell_on_strings.png';
import attack from '../assets/battle/Attack.png';
import defend from '../assets/battle/Defend.png';
import magic from '../assets/battle/Magic.png';
import runbtn from '../assets/battle/Run.png';
import enemies from '../enemies.js';
import playerStats from '../Sprites/CharacterStats.js';

export default class FightScene extends Phaser.Scene {
  constructor (key) {
    super(key);
    //player stats box
     this.stats_xpos = 400;
     this.stats_ypos = 350;
      
     this.currEnemy = this.selectRandomEnemy();
     this.eHP = enemies[this.currEnemy]["HP"];
     this.eSpeed = enemies[this.currEnemy]["Speed"];
     this.eAttack = enemies[this.currEnemy]["Attack"];
     this.eDefense = enemies[this.currEnemy]["Defense"];
     this.pHP = playerStats["HP"];
     this.pAttack = playerStats["ATK"];
     this.pDefense = playerStats["DEF"];
     this.pWeapon = playerStats["WEAPON"];
     this.pSpeed = playerStats["SPEED"];
      
      
  }
    


preload(){
    this.load.image('fightscene', fightScene);
    this.load.image('playerSprite', playerSprite);
    this.load.image('trollCauldron', trollCauldron);
    this.load.image('jak_n_box', jak_n_box);
    this.load.image('schoolBully', schoolBully);
    this.load.image('shadowBeast', shadowBeast);
    this.load.image('shyNosferatu', shyNosferatu);
    this.load.image('bedsheetGhost', bedsheetGhost);
    this.load.image('unsureFranky', unsureFranky);
    this.load.image('skellOnStrings', skellOnStrings);
    this.load.image('attack', attack);
    this.load.image('defend', defend);
    this.load.image('magic', magic);
    this.load.image('runbtn', runbtn);
    
}
 create() {
    
     
     let currentEnemy = enemies[this.currEnemy]['name'];
     
     
     
     this.add.image(0,0,'fightscene').setOrigin(0);
     let enemySprite = this.add.sprite(350 + enemies[this.currEnemy]['xpos'], enemies[this.currEnemy]['ypos'], this.currEnemy).setOrigin(0);
     enemySprite.setScale(enemies[this.currEnemy]['scale']);
     let playerSprite = this.add.sprite(50,300,'playerSprite').setOrigin(0);
     playerSprite.setScale(2.5);
     
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

     
     let enemyHP=enemies[this.currEnemy]['HP']; 
     
        graphics.fillStyle(0x00ba0c);
        graphics.fillRect(160,116,enemyHP * 2.5,30);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(160 + enemyHP * 2.5,116,250 - enemyHP * 2.5,30); 
     
     //player stats box
     graphics.fillStyle(0x000000);
     graphics.fillRoundedRect(this.stats_xpos + 20,this.stats_ypos - 30,210,50,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(this.stats_xpos + 20,this.stats_ypos - 30,210,50,15);
     graphics.fillStyle(0xffffff);
     graphics.fillRoundedRect(this.stats_xpos,this.stats_ypos,330,210,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(this.stats_xpos,this.stats_ypos,330,210,15);
     this.add.text(this.stats_xpos + 30, this.stats_ypos - 25, "Player", { fontFamily: 'Courier New', fontSize: '16pt', color: '#ffffff'});
     this.add.text(this.stats_xpos + 20, this.stats_ypos + 20, "HP", { fontFamily: 'Courier New', fontSize: '18pt', color: '#000000'});
     this.add.text(this.stats_xpos + 20, this.stats_ypos + 60, "MP", { fontFamily: 'Courier New', fontSize: '18pt', color: '#000000'});
     
     //player action buttons
     let btnAttack = this.add.image(this.stats_xpos + 50, this.stats_ypos + 100, 'attack').setOrigin(0);
     btnAttack.setScale(0.04);
     btnAttack.setInteractive();
     btnAttack.on('pointerup', () => {
         this.doAttack(this.currEnemy);
     });
     let btnDefend = this.add.image(this.stats_xpos + 170, this.stats_ypos + 100, 'defend').setOrigin(0);
     btnDefend.setScale(0.04);
     btnDefend.setInteractive();
     btnDefend.on('pointerup', () => {
         this.doDefend();
     });
     let btnMagic = this.add.image(this.stats_xpos + 50, this.stats_ypos + 150, 'magic').setOrigin(0);
     btnMagic.setScale(0.04);
     btnMagic.setInteractive();
     btnMagic.on('pointerup', () => {
         this.doMagic();
     });
     let btnRun = this.add.image(this.stats_xpos + 170, this.stats_ypos + 150, 'runbtn').setOrigin(0);
     btnRun.setScale(0.04);
     btnRun.setInteractive();
     btnRun.on('pointerup', () => {
      this.scene.start('OverworldScene');
    });
      console.log(playerStats);
     this.showPlayerStats();
 }
    
 showPlayerStats(){
     let graphics = this.add.graphics();
     //show current player stats
    
        let playerHP = playerStats["HP"]; 
     
        graphics.fillStyle(0x00ba0c);
        graphics.fillRect(this.stats_xpos + 60,this.stats_ypos + 16,playerHP * 2.5,30);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(this.stats_xpos + 60 + playerHP * 2.5,this.stats_ypos + 16,250 - playerHP * 2.5,30);   

     
     
     let playerMP = playerStats["MP"]; 
     
        graphics.fillStyle(0x0000ff);
        graphics.fillRect(this.stats_xpos + 60,this.stats_ypos + 56,playerMP * 2.5,30);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(this.stats_xpos + 60 + playerMP * 2.5,this.stats_ypos + 56,250 - playerMP * 2.5,30); 
     
     
     
    }
    
    selectRandomEnemy(){
        let keys = Object.keys(enemies);
        let rand = Math.floor(Math.random() * keys.length);
        //console.log(enemies[keys[rand]]);
        return keys[rand];
    }
    
    
    doAttack(){
        //this is what happens when the attack button is pressed
        console.log("Attack!");
        console.log(playerStats);
        console.log([this.currEnemy]);
        console.log(enemies[this.currEnemy]);
        
        
        //1. figure out who goes first
        if(this.pSpeed >= this.eSpeed){
            //player goes first
            this.doEnemyDamage();
            
            //then enemy
            let timer = this.time.delayedCall(3000, this.doPlayerDamage, [], this);  
            //this.doPlayerDamage(pHP, eAttack, pDefense);
            
            
        } else if (this.pSpeed < this.eSpeed){
            //enemy goes first
            this.doPlayerDamage();
            
            //then player
            let timer = this.time.delayedCall(3000, this.doEnemyDamage, [], this);
            //this.doEnemyDamage();


        } 
        
        //update screen
        console.log(playerStats);
        console.log([this.currEnemy]);
        console.log(enemies[this.currEnemy]);
        this.showPlayerStats();
        
        /*
            step 1 - figure out who goes first - higher speed Stat
            step 2/ - calculate HP damge to enemy and HP damage to player
            enemy HP damage = players attack stat + players weapon stat - enemys defense Stat
            subtract from enemy HP
            player HP damage is a mirror formula
            dialog "Player attacks"
            screen shake animation
            update on screen HP stats for enemy
            dialog "Enemy attacks"
            screen shake animation
            update on screen HP for player
            check if anyone is dead
            if enemy is dead - go to overworld, get +1 EXP
            if player dies, game over
            
            */
        
        
    }
    doDefend(){
        //this is what happens when the defend button is pressed
        console.log("Defend!");
    }
    doMagic(){
        //this is what happens when the magic button is pressed
        console.log("Magic!");
    }
 
    doEnemyDamage(){
        
        console.log("Player attacks");
        let graphics = this.add.graphics();
        
        
     graphics.fillStyle(0xffffff);
     graphics.fillRoundedRect(200,200,170,100,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(200,200,170,100,15);
     this.add.text(220, 220, "Player", { fontFamily: 'Courier New', fontSize: '24pt', color: '#0000ff'});
     this.add.text(220, 260, "Attacks", { fontFamily: 'Courier New', fontSize: '24pt', color: '#0000ff'});
        
        let dam = this.pAttack + this.pWeapon - this.eDefense;
        if(dam < 1){ dam = 1;}
        if(dam > this.eHP){ dam = this.eHP;}
        console.log(dam);
        enemies[this.currEnemy]["HP"] = this.eHP - dam;
        
    this.showPlayerStats();
    }
    
    doPlayerDamage(){
        
        console.log("Enemy attacks");
        let graphics = this.add.graphics();
        
        graphics.fillStyle(0xffffff);
     graphics.fillRoundedRect(200,200,170,100,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(200,200,170,100,15);
     this.add.text(220, 220, "Enemy", { fontFamily: 'Courier New', fontSize: '24pt', color: '#0000ff'});
     this.add.text(220, 260, "Attacks", { fontFamily: 'Courier New', fontSize: '24pt', color: '#0000ff'});
        
        
        
        let dam = this.eAttack - this.pDefense;
        if(dam < 1){ dam = 1;}
        if(dam > this.pHP){ dam = this.pHP;}
        console.log(dam);
        playerStats["HP"] = this.pHP - dam;
        
        if(this.pHP == dam){
            let timer = this.time.delayedCall(2000, this.gameOver, [], this);  
        }
    }
    
    gameOver(){
        this.scene.start('GameOver');
    }
//end of class
};