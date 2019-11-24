//this is a completely new architecture of the Fight Scene
//as of Nov 10

//trying to use a state machine pattern as inspired by
//http://gamedevgeek.com/tutorials/managing-game-states-in-c/


//game states list can be found in the create function


import Phaser from 'phaser';

import fightScene from '../assets/battle/white.png';
import playerSprite from '../assets/battle/player_battle.png';

//enemy images
import trollCauldron from '../assets/enemies/Troll_Cauldron.png';
import jak_n_box from '../assets/enemies/Jak_N_Box.png';
import schoolBully from '../assets/enemies/School_Bully.png';
import shadowBeast from '../assets/enemies/Shadow_Beast.png';
import bedSheetGhost from '../assets/enemies/Bedsheet_Ghost.png';
import shyNosferatu from '../assets/enemies/shy_Nosferatu.png';
import unsureFranky from '../assets/enemies/Unsure_Franky.png';
import skellOnStrings from '../assets/enemies/Skell_on_strings.png';
import sugarDaddyBase from '../assets/enemies/Sugar_Daddy.png';
import sugarDaddyFinal from '../assets/enemies/Sugar_Daddy_Final.png';

//action buttons
import attack from '../assets/battle/Attack.png';
import defend from '../assets/battle/Defend.png';
import magic from '../assets/battle/Magic.png';
import runbtn from '../assets/battle/Run.png';

//audio imports
import fightSceneStartAudio from '../assets/audio/WeaponKnifePullFromSand01.wav';

//audio imports for each enemy
import bsgAudio1 from '../assets/audio/FiveMoreMin.mp3';
import bsgAudio2 from '../assets/audio/OOOh.mp3';
import snAudio1 from '../assets/audio/ShyDontLook.mp3';
import snAudio2 from '../assets/audio/ShyOOhh.mp3';
import tcAudio1 from '../assets/audio/Magiluck.mp3';
import tcAudio2 from '../assets/audio/Balalalala.mp3';
import tcAudio3 from '../assets/audio/Bwathtatatata.mp3';
import tcAudio4 from '../assets/audio/DoYouWantCandy.mp3';
import tcAudio5 from '../assets/audio/EhDahShllp.mp3';
import sosAudio1 from '../assets/audio/MyMotherSays.mp3';
import sosAudio2 from '../assets/audio/WhoYouCallinPuppet.mp3';
import ufAudio1 from '../assets/audio/UnsureHiScare.mp3';
import ufAudio2 from '../assets/audio/UnsureWrar.mp3';
import jnbAudio1 from '../assets/audio/Aheheha1.mp3';
import jnbAudio2 from '../assets/audio/Eeheeheehaa.mp3';
import jnbAudio3 from '../assets/audio/HelOooo.mp3';
import jnbAudio4 from '../assets/audio/Ehehehehaa.mp3';
import jnbAudio5 from '../assets/audio/Nanananana.mp3';
import sbAudio1 from '../assets/audio/HeyWhatsUp.mp3';
import sbAudio2 from '../assets/audio/ReadyBoys.mp3';
import sbAudio3 from '../assets/audio/DontMessWSugarCrew.mp3';
import sbAudio4 from '../assets/audio/GoodOlOneTwo.mp3';
import sbAudio5 from '../assets/audio/GetTheFunkOut.mp3';
import sbAudio6 from '../assets/audio/SugarHench1.mp3';
import sbAudio7 from '../assets/audio/Yo.mp3';
import shbAudio1 from '../assets/audio/AllCandyMine.mp3';
import shbAudio2 from '../assets/audio/Wrahaha1.mp3';
import shbAudio3 from '../assets/audio/Wrahaha2.mp3';
import sdbAudio1 from '../assets/audio/GetOffMyProp.mp3';
import sdbAudio2 from '../assets/audio/GetReadyToFunk.mp3';
import sdbAudio3 from '../assets/audio/GiveYouSugar.mp3';
import sdbAudio4 from '../assets/audio/MessedWWrongGuy.mp3';
import sdfAudio1 from '../assets/audio/NowYouKnowSugarDaddy.mp3';
import sdfAudio2 from '../assets/audio/NOOOO.mp3';

export default class FightScene2 extends Phaser.Scene {
    constructor(key){
        super(key);
        
        this.currEnemy; //for the way it is spelled as a key in the JSON data
        this.currentEnemy; //for the user-friendly text
        this.enemyData;
        
        //get the player data from CharacterStats.js
        this.pHP = game.playerStats["HP"];
        this.pMP = game.playerStats["MP"];
        this.pAttack = game.playerStats["ATK"];
        this.pDefense = game.playerStats["DEF"];
        this.pWeapon = game.playerStats["WEAPON"];
        this.pSpeed = game.playerStats["SPEED"];
        this.pEXP = game.playerStats["EXP"];
        this.pLevel = game.playerStats["LVL"];
        this.pMgDef = game.playerStats["MG DEF"];
        this.pMgAttack = game.playerStats["MG ATK"];
        
        //state management
        this.currentState = 0;
        this.nextState = -1;
        this.stateList;
        
        this.changeStateTime;
        this.waitingForInput = false;
        this.waitingForAudio = true;
        this.executeStateFunctions = true;
        
    }
    preload(){
        
        //enemy images
        this.load
            .image('fightscene', fightScene)
            .image('playerSprite', playerSprite)
            .image('trollCauldron', trollCauldron)
            .image('jak_n_box', jak_n_box)
            .image('schoolBully', schoolBully)
            .image('shadowBeast', shadowBeast)
            .image('shyNosferatu', shyNosferatu)
            .image('bedSheetGhost', bedSheetGhost)
            .image('unsureFranky', unsureFranky)
            .image('skellOnStrings', skellOnStrings)
            .image('sugarDaddyBase', sugarDaddyBase)
            .image('sugarDaddyFinal', sugarDaddyFinal);

        //action buttons
        this.load
            .image('attack', attack)
            .image('defend', defend)
            .image('magic', magic)
            .image('runbtn', runbtn);

        //load audio
        this.load.audio('fightSceneStartAudio', fightSceneStartAudio);
        this.load.audio('bsg1', bsgAudio1);
        this.load.audio('bsg2', bsgAudio2);
        this.load.audio('sn1', snAudio1);
        this.load.audio('sn2', snAudio2);
        this.load.audio('tc1', tcAudio1);
        this.load.audio('tc2', tcAudio2);
        this.load.audio('tc3', tcAudio3);
        this.load.audio('tc4', tcAudio4);
        this.load.audio('tc5', tcAudio5);
        this.load.audio('sos1', sosAudio1);
        this.load.audio('sos2', sosAudio2);
        this.load.audio('uf1', ufAudio1);
        this.load.audio('uf2', ufAudio2);
        this.load.audio('jnb1', jnbAudio1);
        this.load.audio('jnb2', jnbAudio2);
        this.load.audio('jnb3', jnbAudio3);
        this.load.audio('jnb4', jnbAudio4);
        this.load.audio('jnb5', jnbAudio5);
        this.load.audio('sb1', sbAudio1);
        this.load.audio('sb2', sbAudio2);
        this.load.audio('sb3', sbAudio3);
        this.load.audio('sb4', sbAudio4);
        this.load.audio('sb5', sbAudio5);
        this.load.audio('sb6', sbAudio6);
        this.load.audio('sb7', sbAudio7);
        this.load.audio('shb1', shbAudio1);
        this.load.audio('shb2', shbAudio2);
        this.load.audio('shb3', shbAudio3);
        this.load
            .audio('sdb1', sdbAudio1)
            .audio('sdb2', sdbAudio2)
            .audio('sdb3', sdbAudio3)
            .audio('sdb4', sdbAudio4)
            .audio('sdf1', sdfAudio1)
            .audio('sdf2', sdfAudio2);
    }
    create(){
        this.currEnemy = this.selectRandomEnemy();
        
        //get the enemy data from enemies.js
        this.enemyData = JSON.parse(JSON.stringify(game.enemies[this.currEnemy]));
        this.currentEnemy = game.enemies[this.currEnemy]['name'];

        //get the player data from CharacterStats.js
        this.pHP = game.playerStats["HP"];
        this.pMP = game.playerStats["MP"];
        this.pAttack = game.playerStats["ATK"];
        this.pDefense = game.playerStats["DEF"];
        this.pWeapon = game.playerStats["WEAPON"];
        this.pSpeed = game.playerStats["SPEED"];
        this.pEXP = game.playerStats["EXP"];
        this.pLevel = game.playerStats["LVL"];
        this.pMgDef = game.playerStats["MG DEF"];
        this.pMgAttack = game.playerStats["MG ATK"];
        
        //state management
        //message, requires input, ms delay, next state
        let avgPace = 1500;
        
        this.stateList =  [
            [this.currentEnemy + " approaches", false, avgPace, 1], //0
            ["Select an action", true, 0, 999],                     //1
            ["Anna attacks", false, avgPace, 3],                    //2 - Anna first
            [this.currentEnemy + " attacks", false, avgPace, 1],    //3 - enemy second
            ["Anna attacks", false, avgPace, 1],                    //4 - Anna second
            [this.currentEnemy + " attacks", false, avgPace, 4],    //5 - enemy first
            [this.currentEnemy + " defeated", false, avgPace, 7],   //6 - enemy defeated
            ["Anna gained XP", false, avgPace, 7],                  //7 - gain XP
            ["New level reached", false, avgPace, 8],               //8 - new level
            ['Anna learned a new spell', false, avgPace, 9],        //9 - new spell
            ['Anna chooses Defend', false, avgPace, 11],            //10 - Anna defends
            ['Anna restores some MP', false, avgPace, 3],           //11 - restore MP after defending
            ['Anna chooses Magic', true, 0, 12],                    //12 - Anna magic
            ['Anna escapes safely', false, 1000, 13],               //13 - escape safely
            ['Anna tries to escape but fails', false, 1000, 3],     //14 - failed escape
            ['Anna heals some HP', false, avgPace, 3],              //15 - Heal spell
            ['Anna attacks with a Fireball', false, avgPace, 3],    //16 - Fireball spell
            ['BULK SPELL: Coming soon', false, avgPace, 3],         //17 - Bulk spell
            ['BUFF SPELL: Coming soon', false, avgPace, 3],         //18 - Buff spell
            ['CHARGE SPELL: Coming soon', false, avgPace, 3],       //19 - Charge spell
            ['TRICK OR TREAT: Coming soon', false, avgPace, 3],     //20 - Trick or Treat spell
            ['Insufficient MP for this spell', true, avgPace, 1]    //21 - Insufficent MP
        ];
        
        //start of scene - set first state
        this.currentState = 0;
        this.nextState = -1;
        this.changeStateTime = Date.now() + 1500;
        this.waitingForInput = false;
        this.waitingForAudio = true;
        this.executeStateFunctions = true;
        
        //draw the initial scene
        this.Draw();
        this.drawSprites();
        this.drawMessage();
        this.drawPlayerStats();
        this.drawEnemyStats();
        
        //play the start audio - which leads into enemy audio
        const startaudio = this.sound.add("fightSceneStartAudio", {volume: 5});
        startaudio.on('complete', this.playEnemyAudio, this);
        console.log(Date.now());
        startaudio.play();  
        
        let keyObj = this.input.keyboard.addKey('shift');
        keyObj.on('up', this.showStatsWindow, this);
        
    }
    update(){
        let now = Date.now();
        
        //execute any calculations
        if(this.executeStateFunctions){
            if(this.currentState == 2 || this.currentState == 4){
                this.playerAttack();
            }
            else if(this.currentState == 3 || this.currentState == 5){
                this.enemyAttack();
            }
            else if(this.currentState == 6){
                this.enemyDefeated();
            }
            else if(this.currentState == 7){
                this.xpGained();
            }
            else if(this.currentState == 8){
                this.newSpell();
            }
            
            else if(this.currentState == 11){
                this.playerDefense();
            }
            
            else if(this.currentState == 12){
                this.executeStateFunctions = false;
                this.scene.pause();
                this.scene.launch("MagicBattleMenu");
            }
            //update message box
            this.Draw();
            this.drawSprites();
            this.drawMessage();
            this.drawPlayerStats();
            this.drawEnemyStats();
            
            //turn off the execute flag
            this.executeStateFunctions = false;
        }
        
        //switch states
        if(now > this.changeStateTime && !this.waitingForInput && !this.waitingForAudio){
            //return to the overworld if needed
            if(this.nextState == 9999 || this.currentState == 9 || this.currentState == 13){
                this.returnToOverworld();
                return;
            }

            //new state
            console.log("Change state at " + Date.now());
            console.log("Old state: " + this.currentState);
            //first check the next state variable, 
            //otherwise use the data in the stateList
            if(this.nextState != -1){
                this.currentState = this.nextState;
                this.nextState = -1;
            } else {
                this.currentState = this.stateList[this.currentState][3]; 
            }
            console.log("New state: " + this.currentState);
            //length of new state
            this.changeStateTime = now + this.stateList[this.currentState][2];
            console.log("Next action at: " + this.changeStateTime);
            this.waitingForInput = this.stateList[this.currentState][1];
            this.executeStateFunctions = true;
        }
    }
    

    Draw(){
        
        //this function draws the stat boxes and action buttons
        
        //some positioning constants
        //player stats box position reference anchor
        const stats_xpos = 430;
        const stats_ypos = 350;
        
         //scene
        this.add.image(0,0,'fightscene').setOrigin(0);
        
        let graphics = this.add.graphics();
        
        //enemy stats box
        graphics.fillStyle(0x000000);
        graphics.fillRoundedRect(70,50,250,50,15);
        graphics.lineStyle(5,0x000000);
        graphics.strokeRoundedRect(70,50,250,50,15);
        graphics.fillStyle(0xffffff);
        graphics.fillRoundedRect(50,80,330,60,15);
        graphics.lineStyle(5,0x000000);
        graphics.strokeRoundedRect(50,80,330,60,15);
        this.add.text(70, 98, "HP", { fontFamily: 'Courier New', fontSize: '17pt', color: '#000000'});
        this.add.text(80, 55, this.currentEnemy, { fontFamily: 'Courier New', fontSize: '16pt', color: '#ffffff'});


         //player stats box
         graphics.fillStyle(0x000000);
         graphics.fillRoundedRect(stats_xpos + 20,stats_ypos - 30,180,50,15);
         graphics.lineStyle(5,0x000000);
         graphics.strokeRoundedRect(stats_xpos + 20,stats_ypos - 30,180,50,15);
         graphics.fillStyle(0xffffff);
         graphics.fillRoundedRect(stats_xpos,stats_ypos,330,210,15);
         graphics.lineStyle(5,0x000000);
         graphics.strokeRoundedRect(stats_xpos,stats_ypos,330,210,15);
         this.add.text(stats_xpos + 30, stats_ypos - 25, "Anna", { fontFamily: 'Courier New', fontSize: '16pt', color: '#ffffff'});
         this.add.text(stats_xpos + 20, stats_ypos + 18, "HP", { fontFamily: 'Courier New', fontSize: '17pt', color: '#000000'});
         this.add.text(stats_xpos + 20, stats_ypos + 58, "MP", { fontFamily: 'Courier New', fontSize: '17pt', color: '#000000'});



         //player action buttons

         let btnAttack = this.add.image(stats_xpos + 50, stats_ypos + 120, 'attack').setOrigin(0);
         btnAttack.setScale(0.04);
         btnAttack.setInteractive();
         btnAttack.on('pointerup', () => {
             if(this.waitingForInput && !this.waitingForAudio){
                this.waitingForInput = false;
                this.nextState = this.setTurn();
             }
         });

         let btnDefend = this.add.image(stats_xpos + 170, stats_ypos + 120, 'defend').setOrigin(0);
         btnDefend.setScale(0.04);
         btnDefend.setInteractive();
         btnDefend.on('pointerup', () => {
             if(this.waitingForInput && !this.waitingForAudio){
                this.waitingForInput = false;
                this.nextState = 10;
             }
         });

         let btnMagic = this.add.image(stats_xpos + 50, stats_ypos + 160, 'magic').setOrigin(0);
         btnMagic.setScale(0.04);
         btnMagic.setInteractive();
         btnMagic.on('pointerup', () => {
             if(this.waitingForInput && !this.waitingForAudio){
                this.waitingForInput = false;
                this.nextState = 12;
             }
             /*this.currentState = 12;
             this.changeStateTime = Date.now() + this.stateList[this.currentState][2];
             this.waitingForInput = false;
             this.executeStateFunctions = true;*/
         });

         let btnRun = this.add.image(stats_xpos + 170, stats_ypos + 160, 'runbtn').setOrigin(0);
         btnRun.setScale(0.04);
         btnRun.setInteractive();
         btnRun.on('pointerup', () => {
             if(this.waitingForInput && !this.waitingForAudio){
                this.waitingForInput = false;
                this.doRun();
             }
             
        });

        
    }
    drawSprites(){
        //enemy sprite
        if(true){
            let enemySprite = this.add.sprite(350 + this.enemyData['xpos'], this.enemyData['ypos'], this.currEnemy).setOrigin(0);
            enemySprite.setScale(this.enemyData['scale']);
        }
        //player sprite
        if(true){
            let player = this.add.sprite(65,200,'playerSprite').setOrigin(0);
            player.setScale(2.5);
        }
    }
    drawMessage(){
        //message box position reference anchor
        const msgX = 50;
        const msgY = 470;
        
        let graphics = this.add.graphics();
        
        //message box
        const maxMsgWidth = 290;
        let msgText = this.stateList[this.currentState][0];
        
        let fontsize = '20pt';
        if (fontsize === undefined){
            fontsize = '20pt';
        }
        
        graphics.fillStyle(0xffffcc);
        graphics.fillRoundedRect(msgX, msgY,310,90,15);
        graphics.lineStyle(5,0x000000);
        graphics.strokeRoundedRect(msgX, msgY,310,90,15);
        this.add.text(msgX + 25, msgY + 20, msgText, { fontFamily: 'Courier New', fontSize: fontsize, color: '#000000', wordWrap: {width: maxMsgWidth}});
    }
    drawPlayerStats(){
         
        //player stats box position reference anchor
        const stats_xpos = 430;
        const stats_ypos = 350;
        
        let graphics = this.add.graphics();
        //show current player stats


         //updated 11/2/19 to use LVL max as denominator rather than 100
         //this makes the full space on the health bar used
        let playerHP = game.playerStats["HP"]; 
        let maxHP = game.playerStats["LVL"] * 10;  //e.g. maxHP at level 3 is 30
        const healthBarScale = 250;  //total number of pixels in the health bar
        let ratio = healthBarScale / maxHP;  //this is how many pixels per HP

        graphics.fillStyle(0x00ba0c);
        graphics.fillRect(stats_xpos + 60, stats_ypos + 16, playerHP * ratio, 22);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(stats_xpos + 60 + playerHP * ratio, stats_ypos + 16, healthBarScale - playerHP * ratio, 22);   


        //11/3/19 - show the numbers under the health bar
        this.add.text(stats_xpos + 245, stats_ypos + 40, playerHP + "/" + maxHP, { fontFamily: 'Courier New', fontSize: '12pt', color: '#000000'});

        let playerMP = game.playerStats["MP"]; 
         //HP and MP both have the same max for each level
         //if that changes, MP will need its own ratio calculation
        graphics.fillStyle(0x0000ff);
        graphics.fillRect(stats_xpos + 60,stats_ypos + 56, playerMP * ratio, 22);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(stats_xpos + 60 + playerMP * ratio, stats_ypos + 56, healthBarScale - playerMP * ratio, 22); 


        //11/3/19 - show the numbers under the magic bar
        this.add.text(stats_xpos + 245, stats_ypos + 81, playerMP + "/" + maxHP, { fontFamily: 'Courier New', fontSize: '12pt', color: '#000000'});

    }
    drawEnemyStats(){
        let graphics = this.add.graphics();
        
        //updated 11/2/19 to use the full space on the health bar no matter how many HP it starts with
        let enemyMaxHP = game.enemies[this.currEnemy]["HP"];
        const healthBarScale = 250;  //total number of pixels in the health bar
        let ratio = healthBarScale / enemyMaxHP;  //this is how many pixels per HP
     
        graphics.fillStyle(0x00ba0c);
        graphics.fillRect(110,96,this.enemyData["HP"] * ratio, 22);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(110 + this.enemyData["HP"] * ratio, 96, healthBarScale - this.enemyData["HP"] * ratio, 22);

        //11/3/19 - show the numbers under the enemy health bar
        this.add.text(300, 120, this.enemyData["HP"] + "/" + enemyMaxHP, { fontFamily: 'Courier New', fontSize: '12pt', color: '#000000'});
    }
    
    playEnemyAudio(){
        // play the music
        this.waitingForAudio = true;
        let audiolist = game.enemiesaudio[this.currEnemy];
        console.log(audiolist);
        let rand = Math.floor(Math.random() * audiolist.length);
        const music = this.sound.add(audiolist[rand]);
        music.on('complete', function(){
            this.waitingForAudio = false;
        }, this);
        music.play();
        
    }
    shakeScreen(){
        this.cameras.main.shake(200, 0.02);
    }
    
    selectRandomEnemy(){ 
        //first filter the list to only include enemies that can appear on this level
        let filteredEnemies = [];
        
        for(let enemy in game.enemies){
            
            let minLevel = game.enemies[enemy]["min level"];
            let maxLevel = game.enemies[enemy]["max level"];
            
            if(minLevel <= this.pLevel && maxLevel >= this.pLevel){
                filteredEnemies.push(enemy);
            }
        }
        
        //now choose a random enemy from the filtered list
        let rand = Math.floor(Math.random()*filteredEnemies.length);
        
        return filteredEnemies[rand];
    }
    setTurn(){
        //first attack from Anna: state=2
        //first attack from Enemy: state=5
        let firstmove;
        if(this.pSpeed > this.enemyData["Speed"]){
            firstmove = 2;
        }
        else if (this.pSpeed < this.enemyData["Speed"]){
            firstmove = 5;
        }
        else {
            //if there is a tie, make it random
            let r = Math.random();
            if (r < 0.5){
                firstmove = 2;
            } else{
                firstmove = 5;
            }
        }
        
        if(this.debugLog){
            console.log("First Move: " + firstmove);
        }
        return firstmove;
    }
    
    enemyAttack(){
        
        //shake
        //this.cameras.main.resetFX();
        //this.cameras.main.shake(200, 0.02);
        
        let dam = this.enemyData["Attack"] - this.pDefense;
        if(dam < 1){ dam = 1;}
        if(dam > this.pHP){ dam = this.pHP;}
        game.playerStats["HP"] = this.pHP - dam;
        this.pHP = game.playerStats["HP"];
        
        //this.pHP = 0;
        if(this.pHP == 0){
            this.gameOver();  
        }
        
        //reset defense stats if Defend action was chosen
        if(this.currentState == 101){
            this.pDefense = game.playerStats["DEF"];
            this.pMgDef = game.playerStats["MG DEF"];
        }

    }
    
    playerAttack(){
        //calculate the damage
        let dam = this.pAttack + this.pWeapon - this.enemyData["Defense"];
        if(dam < 1){ dam = 1;}
        if(dam > this.enemyData["HP"]){ dam = this.enemyData["HP"];}
        this.enemyData["HP"] -= dam;

        //handle enemy defeat
        //this.enemyData["HP"] = 0;
        if(this.enemyData["HP"] == 0){
            this.nextState = 6;
            
        }
    }
    enemyDefeated(){
        //adjust stats
        //give EXP
        this.pEXP = this.pEXP + this.enemyData["EXP given"];
        //this.pEXP = 6;
        game.playerStats["EXP"] = this.pEXP;
        
        if(this.pLevel < 11){
            this.nextState = 7;
            this.stateList[7][0] = "Anna gained " + this.enemyData["EXP given"] + " XP";    
        }
    }
    xpGained(){
        //check if you need to increase the Level
        let levelEXP = {
            1: 0,
            2: 5,
            3: 10,
            4: 15,
            5: 20,
            6: 25,
            7: 30,
            8: 35,
            9: 40,
            10: 45,
            11: 50, 
            12: 99999999,
            13: 10
        }
        
        let EXPneeded = levelEXP[this.pLevel];
        console.log("check for level change");
            console.log("current level: " + this.pLevel);
            console.log("EXP required for next level: " + levelEXP[this.pLevel + 1]);
            console.log("EXP after victory: " + this.pEXP);
        
        //next Level, increase stats
        if(this.pEXP >= levelEXP[this.pLevel + 1]){
            this.pLevel += 1;
            game.playerStats['LVL'] = this.pLevel;
            this.pEXP -= levelEXP[this.pLevel];
            game.playerStats['EXP'] = this.pEXP;
            game.playerStats['HP'] = this.pLevel * 10;
            game.playerStats['MP'] = this.pLevel * 10;
            game.playerStats['ATK'] = Math.round(this.pLevel * 7.5);
            game.playerStats['DEF'] = Math.floor(this.pLevel * 7.5);
            game.playerStats['MG ATK'] = Math.round(this.pLevel * 7.5);
            game.playerStats['MG DEF'] = Math.floor(this.pLevel * 7.5);
            game.playerStats['SPEED'] = this.pLevel * 10;
            
            
            if(this.pLevel < 11){
                this.nextState = 8;
                this.stateList[8][0] = "Congratulations, Level " + this.pLevel + " reached";
            } else if(this.pLevel == 11) {
                let timeDefeat = this.time.delayedCall(returnDelay - 3000,this.drawScreenMessage,["Prepare to meet the Sugar Daddy"], this);
            } else if(this.pLevel == 12) {
                let timeDefeat = this.time.delayedCall(returnDelay - 6000,this.drawScreenMessage,["But Sugar Daddy will come back stronger", "18pt"], this); 
            } else if(this.pLevel == 13) {
                this.showWinScreen();
            }
        } else{
            // not gaining a level, just return to overworld
            this.nextState = 9999;
        }
        
    }
    newSpell(){
        if(this.pLevel==2 || this.pLevel==4 || this.pLevel==6 || this.pLevel==8 || this.pLevel==10){
            this.nextState = 9;
            } else {
                this.nextState = 9999;
            }
        
        //enemy defeat animation
        

    }
    
    playerDefense(){
        //increase the player stats
        //update player MP, Defense, Magic Defense
        let maxMP = this.pLevel * 10;
        this.pMP = this.pMP + Math.ceil(maxMP * 0.25);
        if(this.pMP > maxMP){this.pMP = maxMP};
        game.playerStats["MP"] = this.pMP;
        
        this.pDefense = Math.ceil(this.pDefense * 1.5);
        this.pMgDef = Math.ceil(this.pMgDef * 1.5);
        
    }
    doRun(){
        //TO DO: check if they escape safely
        let escapeSafely = true;
        if(escapeSafely){
            this.nextState = 13;
        } else {
            this.nextState = 14;
        }
    }
    
    doHealSpell(){
        console.log("fight scene heal spell");
        this.currentState = 15;
        this.waitingForInput = false;
        this.executeStateFunctions = true;
        this.changeStateTime = Date.now() + 1500;
        let spellCost = game.playerStats["MAGIC"]["HEAL"]["MP used"];

        // check that sufficient MP are available
        if(spellCost <= this.pMP){
            //do the spell
            console.log("Do spell: " + "HEAL");

            let tempHP = game.playerStats["HP"];
            game.playerStats["HP"] += this.pLevel * 5;
            //max HP is determined by your levels
            if (game.playerStats["HP"] > this.pLevel * 10){
                game.playerStats["HP"] = this.pLevel * 10;
            }
            this.pHP  = game.playerStats["HP"];
            game.playerStats["MP"] -= spellCost;
            this.pMP = game.playerStats["MP"];
        }
        else {
            //logic for insufficient MP to do spell goes here
            this.currentState = 21;
        }    
    }
    doFireballSpell(){
        console.log("fight scene fireball spell");
        this.currentState = 16;
        this.waitingForInput = false;
        this.executeStateFunctions = true;
        this.changeStateTime = Date.now() + 1500;
        
        let spellCost = game.playerStats["MAGIC"]["FIREBALL"]["MP used"];

        // check that sufficient MP are available
        if(spellCost <= this.pMP){
            //do the spell
            console.log("Do spell: " + "FIREBALL");
            //calculate the damage
            let dam = this.pMgAttack + this.pWeapon - this.enemyData["Magic Defense"];
            if(dam < 1){ dam = 1;}
            if(dam > this.enemyData["HP"]){ dam = this.enemyData["HP"];}
            this.enemyData["HP"] -= dam;
            
            game.playerStats["MP"] -= spellCost;
            this.pMP = game.playerStats["MP"];

            //handle enemy defeat
            //this.enemyData["HP"] = 0;
            if(this.enemyData["HP"] == 0){
                this.nextState = 6;

            }
        }
        else {
            //logic for insufficient MP to do spell goes here
            this.currentState = 21;
        }    
    } 
    doBulkSpell(){
        console.log("fight scene bulk spell");
        this.currentState = 17;
        this.nextState = 1;
        this.waitingForInput = false;
        this.executeStateFunctions = true;
        this.changeStateTime = Date.now() + 1500;
        
        let spellCost = game.playerStats["MAGIC"]["BULK"]["MP used"];

        // check that sufficient MP are available
        if(spellCost <= this.pMP){
            //do the spell
            console.log("Do spell: " + "BULK");
        }
        else {
            //logic for insufficient MP to do spell goes here
            this.currentState = 21;
        }    
    }    
    doBuffSpell(){
        console.log("fight scene buff spell");
        this.currentState = 18;
        this.nextState = 1;
        this.waitingForInput = false;
        this.executeStateFunctions = true;
        this.changeStateTime = Date.now() + 1500;
        
        let spellCost = game.playerStats["MAGIC"]["BUFF"]["MP used"];

        // check that sufficient MP are available
        if(spellCost <= this.pMP){
            //do the spell
            console.log("Do spell: " + "BUFF");
        }
        else {
            //logic for insufficient MP to do spell goes here
            this.currentState = 21;
        }    
    }
    doChargeSpell(){
        console.log("fight scene charge spell");
        this.currentState = 19;
        this.nextState = 1;
        this.waitingForInput = false;
        this.executeStateFunctions = true;
        this.changeStateTime = Date.now() + 1500;
        
        let spellCost = game.playerStats["MAGIC"]["CHARGE"]["MP used"];

        // check that sufficient MP are available
        if(spellCost <= this.pMP){
            //do the spell
            console.log("Do spell: " + "CHARGE");
        }
        else {
            //logic for insufficient MP to do spell goes here
            this.currentState = 21;
        }    
    }
    doTrickOrTreatSpell(){
        console.log("fight scene trick or treat spell");
        this.currentState = 20;
        this.nextState = 1;
        this.waitingForInput = false;
        this.executeStateFunctions = true;
        this.changeStateTime = Date.now() + 1500;
        
        let spellCost = game.playerStats["MAGIC"]["TRICK OR TREAT"]["MP used"];

        // check that sufficient MP are available
        if(spellCost <= this.pMP){
            //do the spell
            console.log("Do spell: " + "TRICK OR TREATS");
        }
        else {
            //logic for insufficient MP to do spell goes here
            this.currentState = 21;
        }    
    }


    showStatsWindow(){
        game.playerStats["launchSource"] = "battle";
        this.scene.launch('StatsPopUp'); //launch means both scenes are open
        this.scene.pause();
    }
    
    returnToOverworld(){
        this.scene.start('OverworldScene');
    }
    gameOver(){
        this.scene.start('GameOver');
        this.scene.stop('OverworldScene');
    }
    showWinScreen(){
        this.scene.start('WinScene');
        this.scene.stop('OverworldScene');
    }
    //end of class
}


