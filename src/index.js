import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import sky from './assets/sky.png';
import platform from './assets/sky.png';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
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
  this.load.image('platform', platform);
}

function create() {
  const logo = this.add.image(400, 150, 'logo');
  this.add.image(400, 300, 'sky');

  // platforms = this.physics.add.staticGroup();
  // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  // this.tweens.add({
  //   targets: logo,
  //   y: 450,
  //   duration: 2000,
  //   ease: 'Power2',
  //   yoyo: true,
  //   loop: -1
  // });
}
