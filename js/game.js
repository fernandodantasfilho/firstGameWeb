"use strict"; 

var GameState = function(game) {};

GameState.prototype.preload = function() {
    //Sprites
    this.game.load.image('player','assets/player.png');
    this.game.load.image('platform','assets/wallHorizontal.png');
    this.game.load.image('coin','assets/coin.png');
    this.game.load.image('pixel','assets/pixel.png');
    
    //Áudios
    this.game.load.audio('coinSound','assets/coin.ogg');
    this.game.load.audio('jumpSound','assets/jump.ogg');
    
}

GameState.prototype.create = function() {
    // inserindo imagem de BG do game
    this.game.stage.backgroundColor = '#0082bc';
    
    //Adicionando a Imagem e posicionando a ancora do sprite do jogador
    this.player = this.game.add.sprite(100, 450, 'player');
    this.player.anchor.setTo(0.5,0.5);
    
    //Criando Plataformas
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.platforms.create(50, 320, 'platform');
    this.platforms.create(70, 550, 'platform');
    this.platforms.create(400, 200, 'platform');
    this.platforms.create(550, 320, 'platform');
        //Criando Plataformas Móveis
    this.movingPlatform = this.platforms.create(950, 450, 'platform');
    this.movingPlatform.body.velocity.x = -100;
    this.platforms.setAll('body.immovable', true);   
    
    //Criando Moedas
    this.coins = this.game.add.group();
    this.coins.enableBody = true;
    this.coins.create(15, 150, 'coin');
    this.coins.create(300, 250, 'coin');
    this.coins.create(600, 250, 'coin');
    this.coins.create(500, 100, 'coin');
    this.coins.setAll('body.immovable', true);    
    
    //Adicionando e ativando a Física e a gravidade no jogo e no player
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.enable(this.player);
    this.player.body.gravity.y = 750;
    
    //Adicionando Áudios
    this.jumpSound = this.game.add.audio('jumpSound'); //áudio do jump
    this.coinSound = this.game.add.audio('coinSound'); //áudio da moeda
    
    //Adicionando as controle
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    //Estado do Jogo
    this.coinCount = 4;
    
}

GameState.prototype.update = function() {
    //Adicionando Collider nas plataformas e as moedas com o jogador
    this.game.physics.arcade.collide(this.player, this.platforms);
    // detecta a colisão e chama a função que irá destruir e coletar 
    this.game.physics.arcade.overlap(this.player, this.coins, this.coinCollision, null, this);
    
    //Movimentos do Personagem
    if (this.leftKey.isDown){
        this.player.body.velocity.x = -150;
    } else if (this.rightKey.isDown){     
        this.player.body.velocity.x = 150;
      } else 
          this.player.body.velocity.x = 0;
    
    if (this.jumpKey.isDown && this.player.body.touching.down){
        this.player.body.velocity.y = -450;
        this.jumpSound.play();
        this.player.angle = 0;
        //tween: interpolar alguma variável do objeto entre dois estados
        //.to(): variáveis a serem alteradas
        if (this.player.body.velocity.x < 0) {
            this.game.add.tween(this.player).to({angle:-360}, 750, Phaser.Easing.Quadratic.Out).start();
        } else if (this.player.body.velocity.x > 0) {
            this.game.add.tween(this.player).to({angle:360}, 750, Phaser.Easing.Quadratic.Out).start();
          }
    }
  
    //movimentando as plataformas
    if (this.movingPlatform.x < 50){
        this.movingPlatform.body.velocity.x = 100;
    }
    
    if (this.movingPlatform.x > 500){
        this.movingPlatform.body.velocity.x = -100;
    }
    
    //Condição de Vitória    
    if (this.coinCount == 0)
        this.game.state.start('win');
    
    //Condição de Derrota
    if (this.player.y > 650)
        this.game.state.start('lose');
}

GameState.prototype.coinCollision = function (player, coin){
    this.coinSound.play();
    this.coinCount --;
    coin.kill();
}

