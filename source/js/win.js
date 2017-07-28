"use strict"; 

var WinState = function(game) {};

WinState.prototype.create = function(){
    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You Win \n Press Enter to Play', {fill: '#ffffff', align: 'center'});  
    text.anchor.set(0.5);
    
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

WinState.prototype.update = function(){
    if (this.enterKey.isDown){
        this.game.state.start('game');
    }   
}