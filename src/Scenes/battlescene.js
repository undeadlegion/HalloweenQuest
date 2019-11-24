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


export default class FightScene extends Phaser.Scene {
    constructor (key) {
        super(key);
        
        //turn debug logging on or off
        this.debugLog = true;
        if(this.debugLog){
            console.log("Battle Scene constructor");
        }
        
        //player stats box position reference anchor
        this.stats_xpos = 430;
        this.stats_ypos = 350;
        
        //message box position reference anchor
        this.msgX = 50;
        this.msgY = 470;
        //select a random enemy each time a battle starts
        //this.currEnemy = this.selectRandomEnemy();
        this.currEnemy; //for the way it is spelled as a key in the JSON data
        this.currentEnemy; //for the user-friendly text
        
        //get the enemy data from enemies.js
        //this.enemyData = JSON.parse(JSON.stringify(game.enemies[this.currEnemy]));
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
      
        //variable that will be used in choosing who attacks first
        //0: no current action
        //1: first turn of attack
        //2: second turn of attack
        //101: defense sequence
        //201: first turn of magic attack - HEAL
        //202: first turn of magic attack - FIREBALL
        //etc.
        //210: enemy turn after magic attack
        game.turn = 0;
      
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
    
    
    create() {
        if(this.debugLog){
            console.log("Battle Scene Create");
            console.log("NEW BATTLE SCENE");
        }
        
        //prevent early clicks
        game.turn = 99;
        
        this.currEnemy = this.selectRandomEnemy();
        
        //get the enemy data from enemies.js
        this.enemyData = JSON.parse(JSON.stringify(game.enemies[this.currEnemy]));

        
        if(this.debugLog){
            console.log("Enemy: " + this.enemyData['name']);
            console.log(this.enemyData);
            console.log("Player Stats");
            console.log(game.playerStats);        
        }

        this.pHP = game.playerStats["HP"];
        this.pMP = game.playerStats["MP"];
        this.pAttack = game.playerStats["ATK"];
        this.pDefense = game.playerStats["DEF"];
        this.pWeapon = game.playerStats["WEAPON"];
        this.pSpeed = game.playerStats["SPEED"];
        this.pEXP = game.playerStats["EXP"];
        this.pLevel = game.playerStats["LVL"];
        this.pMgDef = game.playerStats["MG DEF"];
     
        this.currentEnemy = game.enemies[this.currEnemy]['name'];
     
        //player and enemy sprite images
        this.add.image(0,0,'fightscene').setOrigin(0);
        let enemySprite = this.add.sprite(350 + this.enemyData['xpos'], this.enemyData['ypos'], this.currEnemy).setOrigin(0);
        enemySprite.setScale(this.enemyData['scale']);
        let player = this.add.sprite(65,200,'playerSprite').setOrigin(0);
        player.setScale(2.5);


        this.drawScreenBasics();
        
        this.events.on('resume', ()=>{
            this.afterSpell();
        });
     

        this.showPlayerStats();
        this.showEnemyStats();
        this.drawScreenMessage(this.enemyData["name"] + " approaches", '18pt');


        //play the audio
        const startaudio = this.sound.add("fightSceneStartAudio", {volume: 5});
        startaudio.on('complete', this.playEnemyAudio, this);
        console.log(Date.now());
        startaudio.play();     


        let keyObj = this.input.keyboard.addKey('shift');
        keyObj.on('up', this.showStatsWindow, this);


        //end of create function
    }
    
    
    drawScreenBasics(){
        //this function draws the stat boxes and action buttons
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
     graphics.fillRoundedRect(this.stats_xpos + 20,this.stats_ypos - 30,180,50,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(this.stats_xpos + 20,this.stats_ypos - 30,180,50,15);
     graphics.fillStyle(0xffffff);
     graphics.fillRoundedRect(this.stats_xpos,this.stats_ypos,330,210,15);
     graphics.lineStyle(5,0x000000);
     graphics.strokeRoundedRect(this.stats_xpos,this.stats_ypos,330,210,15);
     this.add.text(this.stats_xpos + 30, this.stats_ypos - 25, "Anna", { fontFamily: 'Courier New', fontSize: '16pt', color: '#ffffff'});
     this.add.text(this.stats_xpos + 20, this.stats_ypos + 18, "HP", { fontFamily: 'Courier New', fontSize: '17pt', color: '#000000'});
     this.add.text(this.stats_xpos + 20, this.stats_ypos + 58, "MP", { fontFamily: 'Courier New', fontSize: '17pt', color: '#000000'});
     
     
     
     //player action buttons
     
     let btnAttack = this.add.image(this.stats_xpos + 50, this.stats_ypos + 120, 'attack').setOrigin(0);
     btnAttack.setScale(0.04);
     btnAttack.setInteractive();
     btnAttack.on('pointerup', () => {
         this.doAttack(this.currEnemy);
     });
     
     let btnDefend = this.add.image(this.stats_xpos + 170, this.stats_ypos + 120, 'defend').setOrigin(0);
     btnDefend.setScale(0.04);
     btnDefend.setInteractive();
     btnDefend.on('pointerup', () => {
         this.doDefend();
     });
     
     let btnMagic = this.add.image(this.stats_xpos + 50, this.stats_ypos + 160, 'magic').setOrigin(0);
     btnMagic.setScale(0.04);
     btnMagic.setInteractive();
     btnMagic.on('pointerup', () => {
         this.doMagic();
     });
     
     let btnRun = this.add.image(this.stats_xpos + 170, this.stats_ypos + 160, 'runbtn').setOrigin(0);
     btnRun.setScale(0.04);
     btnRun.setInteractive();
     btnRun.on('pointerup', () => {
         this.doRun();
    });
    }
    
    
    drawScreenMessage(msgText, fontsize){
        //this function displays messages throughout the battle

        const maxMsgWidth = 290;
        let graphics = this.add.graphics();
        
        if (fontsize === undefined){
            fontsize = '20pt';
        }
        
        graphics.fillStyle(0xffffcc);
        graphics.fillRoundedRect(this.msgX, this.msgY,310,90,15);
        graphics.lineStyle(5,0x000000);
        graphics.strokeRoundedRect(this.msgX, this.msgY,310,90,15);
        this.add.text(this.msgX + 25, this.msgY + 20, msgText, { fontFamily: 'Courier New', fontSize: fontsize, color: '#000000', wordWrap: {width: maxMsgWidth}});
        
    }
    
    
    showNoBattle(){
        //reset the turn variable
        game.turn = 0;
        
        //before or after each battle, show a message
        this.drawScreenBasics();
        this.showPlayerStats();
        this.showEnemyStats();
        this.drawScreenMessage("CHOOSE AN ACTION");

    }
    
    
    showPlayerStats(){
         
        let graphics = this.add.graphics();
        //show current player stats


         //updated 11/2/19 to use LVL max as denominator rather than 100
         //this makes the full space on the health bar used
        let playerHP = game.playerStats["HP"]; 
        let maxHP = game.playerStats["LVL"] * 10;  //e.g. maxHP at level 3 is 30
        const healthBarScale = 250;  //total number of pixels in the health bar
        let ratio = healthBarScale / maxHP;  //this is how many pixels per HP

        graphics.fillStyle(0x00ba0c);
        graphics.fillRect(this.stats_xpos + 60, this.stats_ypos + 16, playerHP * ratio, 22);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(this.stats_xpos + 60 + playerHP * ratio, this.stats_ypos + 16, healthBarScale - playerHP * ratio, 22);   


        //11/3/19 - show the numbers under the health bar
        this.add.text(this.stats_xpos + 245, this.stats_ypos + 40, playerHP + "/" + maxHP, { fontFamily: 'Courier New', fontSize: '12pt', color: '#000000'});

        let playerMP = game.playerStats["MP"]; 
         //HP and MP both have the same max for each level
         //if that changes, MP will need its own ratio calculation
        graphics.fillStyle(0x0000ff);
        graphics.fillRect(this.stats_xpos + 60,this.stats_ypos + 56, playerMP * ratio, 22);
        graphics.fillStyle(0xdddddd);
        graphics.fillRect(this.stats_xpos + 60 + playerMP * ratio, this.stats_ypos + 56, healthBarScale - playerMP * ratio, 22); 


        //11/3/19 - show the numbers under the magic bar
        this.add.text(this.stats_xpos + 245, this.stats_ypos + 81, playerMP + "/" + maxHP, { fontFamily: 'Courier New', fontSize: '12pt', color: '#000000'});

    }
    
    
    showEnemyStats(){
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
        
        if(this.debugLog){
            console.log("Filtered enemies");
            console.log(filteredEnemies);
            console.log("Select a random enemy");
            console.log(filteredEnemies[rand]);
        }
        return filteredEnemies[rand];
        
    }
    
    
    doRun(){
        if(game.turn > 0){
            //an attack is already going on
            return;
        }
        this.drawScreenMessage("Anna escapes safely");
        let runTimer = this.time.delayedCall(2000, this.returnToOverworld, [], this);
    }
    
    
    doAttack(){
        if(game.turn > 0){
            //an attack is already going on
            return;
        }
        //this is what happens when the attack button is pressed
        if(this.debugLog){
            console.log("Attack Selected!");
        }
        
        //figure out who goes first
        game.turn = 1;
        let firstmove = this.setTurn();
        
        //execute the turns in correct order
        if(firstmove == "player"){
            //player goes first
            this.doEnemyDamage();
            
        } else if (firstmove == "enemy"){
            //enemy goes first
            this.doPlayerDamage();
        }
    }
    
    
    doDefend(){
        
        if(game.turn > 0){
            //an attack is already going on
            return;
        }
        //this is what happens when the defend button is pressed
        //only the enemy attacks, not player
        //but player gets upgrades before the enemy attack
        if(this.debugLog){
            console.log("Defense chosen");
            console.log("Enemy attacks");
        }
        game.turn = 101;
        this.drawScreenMessage("Anna chooses Defend");
        let timer = this.time.delayedCall(2000, this.playerDefense, [], this);
    
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
        
        //on screen message
        this.drawScreenMessage("Anna restores some MP");
        let timer = this.time.delayedCall(2000, this.doPlayerDamage, [], this);
        
        /*
        //calculate damage
        let dam = this.enemyData["Attack"] - Math.round((this.pDefense + this.pWeapon) * 1.5); // need to adjust for armor also
        if(dam < 0){ dam = 0;}
        if(dam > this.pHP){ dam = this.pHP;}
        if(this.debugLog){
            console.log("Damage to player: " + dam);
        }
        game.playerStats["HP"] = this.pHP - dam;
        this.pHP = game.playerStats["HP"];
        
        

        //update screen
        this.drawScreenBasics();
        this.showPlayerStats();
        this.showEnemyStats();
        
        if(this.pHP == 0){
            let timer = this.time.delayedCall(1000, this.gameOver, [], this);  
        }
        */
    }
    
    
    doMagic(){
        if(game.turn > 0){
            //an attack is already going on
            return;
        }
        //this is what happens when the magic button is pressed
        console.log("Magic!");
        this.drawScreenMessage("Anna chooses Magic");
        this.scene.pause();
        this.scene.launch("MagicBattleMenu");
    }
    
    
    afterSpell(){
        console.log("Resume after spell " + game.turn);

        if(game.turn < 201 || game.turn > 206){
            this.showNoBattle();
            return;
        }
        
        //refresh the values of HP and MP
        this.pHP = game.playerStats["HP"];
        this.pMP = game.playerStats["MP"];

        //update screen
        this.drawScreenBasics();
        this.showPlayerStats();
        this.showEnemyStats(); 

        let spellList = {
            201: "Heal",
            202: "Fireball"
        }

        this.drawScreenMessage("Anna uses " + spellList[game.turn] + " spell");


        game.turn = 210;
        let magicTimer = this.time.delayedCall(3000, this.doPlayerDamage, [], this);
            
    }
    
 
    setTurn(){
        let firstmove;
        if(this.pSpeed > this.enemyData["Speed"]){
            firstmove = "player";
        }
        else if (this.pSpeed < this.enemyData["Speed"]){
            firstmove = "enemy";
        }
        else {
            //if there is a tie, make it random
            let r = Math.random();
            if (r < 0.5){
                firstmove = "player";
            } else{
                firstmove = "enemy";
            }
        }
        
        if(this.debugLog){
            console.log("First Move: " + firstmove);
        }
        return firstmove;
    }
    
    
    doEnemyDamage(){

        console.log("Player attacks");
        console.log("Turn: " + game.turn);
        

        //update screen
        this.drawScreenBasics();
        this.showPlayerStats();
        this.showEnemyStats();
        this.drawScreenMessage("Anna Attacks");

        //shake!!
        //this.cameras.main.resetFX();
        //this.cameras.main.shake(200, 0.02);
        
        
        //calculate the damage
        let dam = this.pAttack + this.pWeapon - this.enemyData["Defense"];
        if(dam < 1){ dam = 1;}
        if(dam > this.enemyData["HP"]){ dam = this.enemyData["HP"];}
        if(this.debugLog){
            console.log("Damage to enemy: " + dam);
            console.log("Original Enemy HP: " + this.enemyData["HP"]);
        }
        
        this.enemyData["HP"] -= dam;
        if(this.debugLog){
            console.log("Updated Enemy HP: " + this.enemyData["HP"]);
        }
        //update screen
        this.drawScreenBasics();
        this.showPlayerStats();
        this.showEnemyStats();
        this.drawScreenMessage("Anna Attacks");
        
        //handle enemy defeat
        if(this.enemyData["HP"] == 0){
            let timer = this.time.delayedCall(1000, this.enemyDefeated, [], this);  
        } else {
            //keep going
            //manage the turns
            if(game.turn == 1){
                game.turn = 2;
                console.log(Date.now());
                this.time.addEvent({delay: 3000, callback: this.doPlayerDamage, callbackScope: this});
            }
            else if (game.turn == 2){
                game.turn = 0;
                let timer3 = this.time.delayedCall(3000, this.showNoBattle, [], this);
            }
        }
    }
    
    
    doPlayerDamage(){
        
        if(this.debugLog){
            console.log("Enemy attacks");
            console.log(Date.now());
            console.log("this HP: " + this.pHP);
            console.log("game HP: " + game.playerStats["HP"]);
        }
        
        //update screen
        this.drawScreenBasics();
        this.showPlayerStats();
        this.showEnemyStats();
        this.drawScreenMessage(this.enemyData['name'] + " attacks");

        //shake
        //this.cameras.main.resetFX();
        //this.cameras.main.shake(200, 0.02);
        
        
        let dam = this.enemyData["Attack"] - this.pDefense;
        if(dam < 1){ dam = 1;}
        if(dam > this.pHP){ dam = this.pHP;}
        if(this.debugLog){
            console.log("Damage to player: " + dam);
        }
        game.playerStats["HP"] = this.pHP - dam;
        this.pHP = game.playerStats["HP"];

        //update screen
        this.drawScreenBasics();
        this.showPlayerStats();
        this.showEnemyStats();
        this.drawScreenMessage(this.enemyData['name'] + " attacks");
        
        if(this.pHP == 0){
            let timer = this.time.delayedCall(1000, this.gameOver, [], this);  
        }
        
        //reset defense stats if Defend action was chosen
        if(game.turn == 101){
            this.pDefense = game.playerStats["DEF"];
            this.pMgDef = game.playerStats["MG DEF"];
        }
        
        // manage the turns
        console.log(game.turn);
        if (game.turn == 1){
            game.turn = 2;
            console.log("next turn");
            let timer = this.time.delayedCall(3000, this.doEnemyDamage, [], this);
        }
        else if (game.turn == 2 || game.turn == 101 || game.turn == 210){
            game.turn = 0;
            let d = 3000;
            if(game.turn == 210){d = 6000}
            let timer = this.time.delayedCall(d, this.showNoBattle, [], this);
        } 
    }
    
    
    enemyDefeated(){
        this.drawScreenMessage(this.enemyData['name'] + " defeated");
        //adjust stats
        //give EXP
        this.pEXP = this.pEXP + this.enemyData["EXP given"];
        game.playerStats["EXP"] = this.pEXP;
        
        if(this.pLevel < 11){
            let timeXP = this.time.delayedCall(3000,this.drawScreenMessage,["Anna gained " + this.enemyData["EXP given"] + " XP"], this);
        }
        
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
        
        if(this.debugLog){
            console.log("check for level change");
            console.log("current level: " + this.pLevel);
            console.log("EXP required for next level: " + levelEXP[this.pLevel + 1]);
            console.log("EXP after victory: " + this.pEXP);
        }
        
        //next Level, increase stats
        let returnDelay = 6000;
        if(this.pEXP >= levelEXP[this.pLevel + 1]){
            
            returnDelay += 3000;
            
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
            
            //this.drawScreenBasics();
            //this.showPlayerStats();
            //this.showEnemyStats();
            
            if(this.debugLog){
                console.log("New Level Reached");
                console.log("new level: " + this.pLevel);
                console.log("new EXP: " + this.pEXP);
            }
            if(this.pLevel < 11){
                let timeDefeat = this.time.delayedCall(returnDelay - 3000,this.drawScreenMessage,["Congratulations, Level " + this.pLevel + " reached"], this);
            } else if(this.pLevel == 11) {
                let timeDefeat = this.time.delayedCall(returnDelay - 3000,this.drawScreenMessage,["Prepare to meet the Sugar Daddy"], this);
            } else if(this.pLevel == 12) {
                let timeDefeat = this.time.delayedCall(returnDelay - 6000,this.drawScreenMessage,["But Sugar Daddy will come back stronger", "18pt"], this); 
            } else if(this.pLevel == 13) {
                this.showWinScreen();
            }
            
            //if(this.pLevel in [2, 4, 6, 8, 9]){
            //    returnDelay = 9000;
            //    let timeSpell = this.time.delayedCall(6000, this.drawScreenMessage,["Well done, you learned a new spell"]);
            //}
        }
        


        //enemy defeat animation
        

        //return to Overworld
        let timer = this.time.delayedCall(returnDelay + 1000, this.returnToOverworld, [], this); 
    }
    
    
    returnToOverworld(){
        this.scene.start('OverworldScene');
    }
    
    
    showStatsWindow(){
        game.playerStats["launchSource"] = "battle";
        this.scene.launch('StatsPopUp'); //launch means both scenes are open
        this.scene.pause();
    }
    
    
    gameOver(){
        this.scene.start('GameOver');
        this.scene.stop('OverworldScene');
    }
    
    
    showWinScreen(){
        this.scene.start('WinScene');
        this.scene.stop('OverworldScene');
    }
   
    
    playEnemyAudio(){
        // play the music
        console.log(Date.now());
        console.log(this.currEnemy);
        let audiolist = game.enemiesaudio[this.currEnemy];
        console.log(audiolist);
        let rand = Math.floor(Math.random() * audiolist.length);
        const music = this.sound.add(audiolist[rand]);
        music.on('complete', function(){
            this.showNoBattle();
        }, this);
        music.play();
        
    }
    
//end of class
};