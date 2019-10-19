import Phaser from 'phaser';


export default class OverworldScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

 create() {
  let map = this.make.tilemap({ key: 'map' });
  let tiles = map.addTilesetImage('cybernoid', 'tiles');
  let layer = map.createStaticLayer(0, tiles, 0, 0);

}

 update() {


}
    
//end of class
};