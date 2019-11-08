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
        let xpos = 455;
        let ypos = 360; 
        
        let graphics = this.add.graphics();

        //draw the menu outline
        graphics.fillStyle(0x0000ff);
        graphics.fillRoundedRect(xpos-10,ypos-40,230,50,15);
        graphics.lineStyle(5,0x0000ff);
        graphics.strokeRoundedRect(xpos-10,ypos-40,230,50,15);
        graphics.fillStyle(0xffffff);
        graphics.fillRoundedRect(xpos-30,ypos-10,335,235,15);
        graphics.lineStyle(5,0x0000ff);
        graphics.strokeRoundedRect(xpos-30,ypos-10,335,235,15);
    
        this.add.text(xpos+20, ypos-36, "MAGIC SPELLS", { fontFamily: 'Courier New', fontSize: '18pt', color: '#ffffff'});
    

      
      
        //magic action buttons

        if(game.playerStats["MAGIC"]["HEAL"]["Level"] <= game.playerStats["LVL"]){
            let btnHeal = this.add.image(xpos, ypos + 10, 'healbtn').setOrigin(0);
            btnHeal.setScale(0.35);
            btnHeal.setInteractive();
            btnHeal.on('pointerup', () => {
                console.log("Heal button");
                this.doSpell('HEAL');
            });
            btnHeal.on('pointerover',() => {
                console.log("hover");
            });
            this.add.text(xpos + 50, ypos + 44, game.playerStats["MAGIC"]["HEAL"]["MP used"] + "MP", { fontFamily: 'Courier New', fontSize: '14pt', color: '#000000'});
        }

        if(game.playerStats["MAGIC"]["BUFF"]["Level"] <= game.playerStats["LVL"]){
            let btnBuff = this.add.image(xpos + 170, ypos + 10, 'buffbtn').setOrigin(0);
            btnBuff.setScale(0.35);
            btnBuff.setInteractive();
            btnBuff.on('pointerup', () => {
                console.log("Buff button");
                this.doSpell('BUFF');
            });
            this.add.text(xpos + 220, ypos + 44, game.playerStats["MAGIC"]["BUFF"]["MP used"] + "MP", { fontFamily: 'Courier New', fontSize: '14pt', color: '#000000'});
        }

    if(game.playerStats["MAGIC"]["BULK"]["Level"] <= game.playerStats["LVL"]){
         let btnBulk = this.add.image(xpos, ypos + 156, 'bulkbtn').setOrigin(0);
         btnBulk.setScale(0.35);
         btnBulk.setInteractive();
         btnBulk.on('pointerup', () => {
             console.log("Bulk button");
             this.doSpell('BULK');
         });
         this.add.text(xpos + 50, ypos + 191, game.playerStats["MAGIC"]["BULK"]["MP used"] + "MP", { fontFamily: 'Courier New', fontSize: '14pt', color: '#000000'});
    }
        
    if(game.playerStats["MAGIC"]["CHARGE"]["Level"] <= game.playerStats["LVL"]){
         let btnCharge = this.add.image(xpos + 170, ypos + 76, 'chargebtn').setOrigin(0);
         btnCharge.setScale(0.35);
         btnCharge.setInteractive();
         btnCharge.on('pointerup', () => {
             console.log("Charge button");
             this.doSpell('CHARGE');
         });
         this.add.text(xpos + 220, ypos + 115, game.playerStats["MAGIC"]["CHARGE"]["MP used"] + "MP", { fontFamily: 'Courier New', fontSize: '14pt', color: '#000000'});
    }
        
    if(game.playerStats["MAGIC"]["FIREBALL"]["Level"] <= game.playerStats["LVL"]){
         let btnFireball = this.add.image(xpos, ypos + 81, 'fireballbtn').setOrigin(0);
         btnFireball.setScale(0.35);
         btnFireball.setInteractive();
         btnFireball.on('pointerup', () => {
             console.log("Fireball button");
             this.doSpell('FIREBALL');
         });
         this.add.text(xpos + 50, ypos + 115, game.playerStats["MAGIC"]["FIREBALL"]["MP used"] + "MP", { fontFamily: 'Courier New', fontSize: '14pt', color: '#000000'});
    }
        
    if(game.playerStats["MAGIC"]["TRICKORTREAT"]["Level"] <= game.playerStats["LVL"]){
         let btnTrickorTreat = this.add.image(xpos + 158, ypos + 150, 'trickortreatbtn').setOrigin(0);
         btnTrickorTreat.setScale(0.4);
         btnTrickorTreat.setInteractive();
         btnTrickorTreat.on('pointerup', () => {
             console.log("Trick or Treat button");
             this.doSpell('TRICKORTREAT');
         });
         this.add.text(xpos + 220, ypos + 191, game.playerStats["MAGIC"]["TRICKORTREAT"]["MP used"] + "MP", { fontFamily: 'Courier New', fontSize: '14pt', color: '#000000'});
    }
        
    let keyObj = this.input.keyboard.addKey('shift');
    keyObj.on('up', this.returnToBattle, this);

    let keyObj2 = this.input.keyboard.addKey('z');
    keyObj2.on('up', this.returnToBattle, this);
        
    }


    doSpell(spell){

        let spellLevel = game.playerStats["MAGIC"][spell]["Level"];
        let spellCost = game.playerStats["MAGIC"][spell]["MP used"];
        let MP = game.playerStats["MP"];
        let pLevel = game.playerStats["LVL"];


        // check that sufficient MP are available
        if(spellCost <= MP){
            //do the spell
            console.log("Do spell: " + spell);
            if(spell == "HEAL"){
                let tempHP = game.playerStats["HP"];
                game.playerStats["HP"] += pLevel * 5;
                //max HP is determined by your levels
                if (game.playerStats["HP"] > pLevel * 10){
                    game.playerStats["HP"] = pLevel * 10;
                }
                tempHP  = game.playerStats["HP"] - tempHP;
                game.playerStats["MP"] -= spellCost;
                this.events.emit('playerHeal');
                console.log("Player Stats");
                console.log(game.playerStats);
                
                let timer = this.time.delayedCall(3000,this.spellComplete, [], this);
            }
        } else {
            //INSUFFICIENT MP TO USE THIS SPELL
            //show message
            this.events.emit("insufficientMPforSpell");
            //kick player back to Battle Scene
            this.returnToBattle();   
        }
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
        
        this.time.delayedCall(3000, this.returnToBattle, [], this);
    }
    
    
    returnToBattle(){
        this.events.emit("exitMagicMenu");
        game.scene.resume('FightScene');
        game.scene.stop('MagicBattleMenu');
    }
    
    spellComplete(){
        this.events.emit('updatePlayerStats');
        game.scene.resume('FightScene');
        game.scene.stop('MagicBattleMenu');
    }
    //end of class
}