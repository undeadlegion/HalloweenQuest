import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import sky from './assets/sky.png';
import platform from './assets/platform.png';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);
let platforms;

function preload() {
  this.load.image('logo', logoImg);
  this.load.image('sky', sky);
  this.load.image('ground', platform);
}

function create() {
  const logo = this.add.image(400, 150, 'logo');
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // this.tweens.add({
  //   targets: logo,
  //   y: 450,
  //   duration: 2000,
  //   ease: 'Power2',
  //   yoyo: true,
  //   loop: -1
  // });
}
