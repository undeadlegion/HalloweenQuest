import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, 'player', texture);
    this.scene = scene;
    this.health = 3;
    this.hitDelay = false;
    this.direction = 'up';

    // enable physics
    this.scene.physics.world.enable(this);
    this.scene.physics.world.enableBody(this);
    // add our player to the scene
    this.scene.add.existing(this);
    this.scene.events.emit('playerCreate', this.health);

    this.setDepth(2);
    this.body.collideWorldBounds = true;
  }

  update(cursors) {
    this.setVelocity(0);
    // check if the up or down key is pressed
    if (cursors.up.isDown) {
      this.direction = 'up';
      this.setVelocityY(-150);
      this.startBattle();
    } else if (cursors.down.isDown) {
      this.direction = 'down';
      this.setVelocityY(150);
      this.startBattle();
    }
    // check if the left or right key is pressed
    if (cursors.left.isDown) {
      this.direction = 'left';
      this.setVelocityX(-150);
      this.startBattle();
    } else if (cursors.right.isDown) {
      this.direction = 'right';
      this.setVelocityX(150);
      this.startBattle();
    }
      //check if shift key is pressed
      if (cursors.shift.isDown) {
          this.showStatsWindow();
      }

    if (this.body.velocity.x > 0) {
      this.play('right', true);
    } else if (this.body.velocity.x < 0) {
      this.anims.playReverse('left', true);
    } else if (this.body.velocity.y < 0) {
      this.play('up', true);
    } else if (this.body.velocity.y > 0) {
      this.play('down', true);
    }
  }

  loseHealth() {
    this.health -= 1;
    this.scene.events.emit('loseHealth', this.health);
    if (this.health === 0) {
      this.scene.loadNextLevel(true);
    }
  }

  enemyCollision(player, enemy) {
    if (!this.hitDelay) {
      this.loseHealth();
      this.hitDelay = true;
      this.tint = 0xff0000;
      this.scene.time.addEvent({
        delay: 1200,
        callback: () => {
          this.hitDelay = false;
          this.tint = 0xffffff;
        },
        callbackScope: this,
      });
    }
  }
    
    startBattle(){
      let rand = Math.round(Math.random() * 1000);
      if(rand == 3){
          this.scene.events.emit('startBattle');
      }
  }
    
    showStatsWindow(){
        //might be good to find a way not to fire this too many times
        this.scene.events.emit('showStatsWindow');
        
    }
}
