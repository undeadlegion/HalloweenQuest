import Phaser from 'phaser';
import fightScene from '../assets/battle/white.png';
import playerSprite from '../assets/battle/player_battle.png';
import trollCauldron from '../assets/enemies/Troll_Cauldron.png';
import jak_n_box from '../assets/enemies/Jak_N_Box.png';
import schoolBully from '../assets/enemies/School_Bully.png';
import shadowBeast from '../assets/enemies/Shadow_Beast.png';
import bedSheetGhost from '../assets/enemies/Bedsheet_Ghost.png';
import shyNosferatu from '../assets/enemies/shy_Nosferatu.png';
import unsureFranky from '../assets/enemies/Unsure_Franky.png';
import skellOnStrings from '../assets/enemies/Skell_on_strings.png';
import attack from '../assets/battle/Attack.png';
import defend from '../assets/battle/Defend.png';
import magic from '../assets/battle/Magic.png';
import runbtn from '../assets/battle/Run.png';



export default class FightScene extends Phaser.Scene {
  constructor (key) {
    super(key);
    //player stats box
     this.stats_xpos = 400;
     this.stats_ypos = 350;
      
     this.currEnemy = this.selectRandomEnemy();
     this.eHP = game.enemies[this.currEnemy]["HP"];
     this.eSpeed = game.enemies[this.currEnemy]["Speed"];
     this.eAttack = game.enemies[this.currEnemy]["Attack"];
     this.eDefense = game.enemies[this.currEnemy]["Defense"];
     this.pHP = game.playerStats["HP"];
     this.pAttack = game.playerStats["ATK"];
     this.pDefense = game.playerStats["DEF"];
     this.pWeapon = game.playerStats["WEAPON"];
     this.pSpeed = game.playerStats["SPEED"];
      
     this.turn = 0;
      
  }
    


preload(){
    this.load.image('fightscene', fightScene);
    this.load.image('playerSprite', playerSprite);
    this.load.image('trollCauldron', trollCauldron);
    this.load.image('jak_n_box', jak_n_box);
    this.load.image('schoolBully', schoolBully);
    this.load.image('shadowBeast', shadowBeast);
    this.load.image('shyNosferatu', shyNosferatu);
    this.load.image('bedSheetGhost', bedSheetGhost);
    this.load.image('unsureFranky', unsureFranky);
    this.load.image('skellOnStrings', skellOnStrings);
    this.load.image('attack', attack);
    this.load.image('defend', defend);
    this.load.image('magic', magic);
    this.load.image('runbtn', runbtn);
    
}
 create() {
    
     this.currEnemy = this.selectRandomEnemy();
     this.eHP = game.enemies[this.currEnemy]["HP"];
     this.eSpeed = game.enemies[this.currEnemy]["Speed"];
     this.eAttack = game.enemies[this.currEnemy]["Attack"];
     this.eDefense = game.enemies[this.currEnemy]["Defense"];
     this.pHP = game.playerStats["HP"];
     this.pMP = game.playerStats["MP"];
     this.pAttack = game.playerStats["ATK"];
     this.pDefense = game.playerStats["DEF"];
     this.pWeapon = game.playerStats["WEAPON"];
     this.pSpeed = game.playerStats["SPEED"];
     
     let currentEnemy = game.enemies[this.currEnemy]['name'];
     
     
     //player and enemy sprite images
     this.add.image(0,0,'fightscene').setOrigin(0);
     let enemySprite = this.add.sprite(350 + game.enemies[this.currEnemy]['xpos'], game.enemies[this.currEnemy]['ypos'], this.currEnemy).setOrigin(0);
     enemySprite.setScale(game.enemies[this.currEnemy]['scale']);
     let player = this.add.sprite(50,300,'playerSprite').setOrigin(0);
     player.setScale(2.5);
     
     let graphics = this.add.graphics();
     
     //enemy stats box
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
     

     this.showPlayerStats();
     this.showEnemyStats();
     this.showNoBattle();
     
     //end of create function
    }
    
    showNoBattle(){
        //reset the turn variable
        this.turn = 0;
        
        //before or after each battle, show a message
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffffff);
        graphics.fillRoundedRect(200,200,170,100,15);
        graphics.lineStyle(5,0x000000);
        graphics.strokeRoundedRect(200,200,170,100,15);
        this.add.text(230, 220, "CHOOSE", { fontFamily: 'Courier New', fontSize: '19pt', color: '#000000'});
        this.add.text(220, 250, "AN ACTION", { fontFamily: 'Courier New', fontSize: '19pt', color: '#000000'});

    }
    
     showPlayerStats(){
        let graphics = this.add.graphics();
        //show current player stats

        let playerHP = game.playerStats["HP"]; 

        graphics.fillStyle(0x00ba0c);
        graphics.fillRect(this.stats_xpos + 60,this.stats_ypos + 16,playerHP * 2.5,30);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(this.stats_xpos + 60 + playerHP * 2.5,this.stats_ypos + 16,250 - playerHP * 2.5,30);   



        let playerMP = game.playerStats["MP"]; 

        graphics.fillStyle(0x0000ff);
        graphics.fillRect(this.stats_xpos + 60,this.stats_ypos + 56,playerMP * 2.5,30);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(this.stats_xpos + 60 + playerMP * 2.5,this.stats_ypos + 56,250 - playerMP * 2.5,30); 

     
    }
    
    showEnemyStats(){
        let graphics = this.add.graphics();
        let enemyHP=game.enemies[this.currEnemy]['HP']; 
     
        graphics.fillStyle(0x00ba0c);
        graphics.fillRect(160,116,enemyHP * 2.5,30);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(160 + enemyHP * 2.5,116,250 - enemyHP * 2.5,30);
    }
    
    selectRandomEnemy(){
        let rand = Math.random();
        //console.log(rand);
        var counter = 0.0;
        for(let enemy in game.enemies){
            //console.log(enemy + ": " + game.enemies[enemy]["probability"]);
            counter += game.enemies[enemy]["probability"];
            //console.log(counter);
            if (counter > rand){
                return enemy;
            }
        }
    }
    
    
    doAttack(){
        //this is what happens when the attack button is pressed
        console.log("Attack!");
        console.log(game.playerStats);
        console.log([this.currEnemy]);
        console.log(game.enemies[this.currEnemy]);
        
        
        //figure out who goes first, then calculate damage
        //LATER - make a tie random, currently tie goes to player
        
        if(this.pSpeed >= this.eSpeed){
            
            //player goes first
            this.turn = 1;
            this.doEnemyDamage();
            
            //then enemy
            this.turn = 2;
            let timer = this.time.delayedCall(3000, this.doPlayerDamage, [], this);  
            //this.doPlayerDamage(pHP, eAttack, pDefense);
            
        } else if (this.pSpeed < this.eSpeed){
            //enemy goes first
            this.turn = 1;
            this.doPlayerDamage();
            
            //then player
            this.turn = 2;
            let timer = this.time.delayedCall(3000, this.doEnemyDamage, [], this);
            //this.doEnemyDamage();
        } 
        

        
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
        console.log("Defense chosen");
        console.log("Enemy attacks");
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffffff);
        graphics.fillRoundedRect(200,200,170,100,15);
        graphics.lineStyle(5,0x000000);
        graphics.strokeRoundedRect(200,200,170,100,15);
        this.add.text(220, 220, "Enemy", { fontFamily: 'Courier New', fontSize: '24pt', color: '#000000'});
        this.add.text(220, 260, "Attacks", { fontFamily: 'Courier New', fontSize: '24pt', color: '#000000'});

        let dam = this.eAttack - Math.round((this.pDefense + this.pWeapon) * 1.5); // need to adjust for armor also
        if(dam < 0){ dam = 0;}
        if(dam > this.pHP){ dam = this.pHP;}
        console.log(dam);
        game.playerStats["HP"] = this.pHP - dam;
        this.pHP = game.playerStats["HP"];
        
        //update player MP
        this.pMP = Math.round(this.pMP * 1.25);
        game.playerStats["MP"] = this.pMP;

        //update screen
        this.showPlayerStats();
        
        if(this.pHP == 0){
            let timer = this.time.delayedCall(1000, this.gameOver, [], this);  
        }
    }
    doMagic(){
        //this is what happens when the magic button is pressed
        console.log("Magic!");
        this.scene.pause();
        this.scene.launch("MagicBattleMenu");
    }
 
    doEnemyDamage(){
        //TODO: screen shake animation
        console.log("Player attacks");
        
        let graphics = this.add.graphics();


        graphics.fillStyle(0xffffff);
        graphics.fillRoundedRect(200,200,170,100,15);
        graphics.lineStyle(5,0x000000);
        graphics.strokeRoundedRect(200,200,170,100,15);
        this.add.text(220, 220, "Player", { fontFamily: 'Courier New', fontSize: '24pt', color: '#000000'});
        this.add.text(220, 260, "Attacks", { fontFamily: 'Courier New', fontSize: '24pt', color: '#000000'});

        this.cameras.main.shake(200, 0.02);
        let dam = this.pAttack + this.pWeapon - this.eDefense;
        if(dam < 1){ dam = 1;}
        if(dam > this.eHP){ dam = this.eHP;}
        console.log(dam);
        console.log(game.enemies[this.currEnemy]["HP"]);
        game.enemies[this.currEnemy]["HP"] = this.eHP - dam;
        this.eHP = game.enemies[this.currEnemy]["HP"];
        console.log(game.enemies[this.currEnemy]["HP"]);
        
        //update screen
        this.showPlayerStats();
        this.showEnemyStats();
        
        // reset if this was the second turn
        if (this.turn == 2){
            let timer = this.time.delayedCall(3000, this.showNoBattle, [], this);
        }
    }
    
    doPlayerDamage(){
        //TODO: screen shake animation
        console.log("Enemy attacks");
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffffff);
        graphics.fillRoundedRect(200,200,170,100,15);
        graphics.lineStyle(5,0x000000);
        graphics.strokeRoundedRect(200,200,170,100,15);
        this.add.text(220, 220, "Enemy", { fontFamily: 'Courier New', fontSize: '24pt', color: '#000000'});
        this.add.text(220, 260, "Attacks", { fontFamily: 'Courier New', fontSize: '24pt', color: '#000000'});

        this.cameras.main.shake(200, 0.02);
        let dam = this.eAttack - this.pDefense;
        if(dam < 1){ dam = 1;}
        if(dam > this.pHP){ dam = this.pHP;}
        console.log(dam);
        game.playerStats["HP"] = this.pHP - dam;
        this.pHP = game.playerStats["HP"];

        //update screen
        this.showPlayerStats();
        this.showEnemyStats();
        
        if(this.pHP == 0){
            let timer = this.time.delayedCall(1000, this.gameOver, [], this);  
        }
        
        // reset if this was the second turn
        if (this.turn == 2){
            let timer = this.time.delayedCall(3000, this.showNoBattle, [], this);
        }
    }
    
    gameOver(){
        this.scene.start('GameOver');
    }
//end of class
};