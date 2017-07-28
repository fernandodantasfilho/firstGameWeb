"use strict"; 

var LoseState = function(game) {};

LoseState.prototype.create = function(){
    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You Lose \n Press Enter to Play', {fill: '#ffffff', align: 'center'});  
    text.anchor.set(0.5);
    
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

LoseState.prototype.update = function(){
    if (this.enterKey.isDown){
        this.game.state.start('game');
    }   
}