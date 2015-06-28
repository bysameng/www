//exhibitory menu

///////////////////////////////////
//states
Game.Title = function(game){};
Game.Title.prototype = { 
	platforms:null, cursors:null, wasd:null,
	player:null, scale:null, bg:null,
	preload : function(){
		Phaser.Canvas.setSmoothingEnabled(game.context, false);
//		this.game.stage.scale.pageAlignHorizontally = true;
//        this.game.stage.scale.pageAlignVeritcally = true;
//        this.game.stage.scale.refresh();
//        game.load.image('wireroom', 'Exhibitory/assets/wireroom.png');
//        game.load.image('scratchfloor', 'Exhibitory/assets/scratchfloor.png');
//        game.load.image('scratchbg1', 'Exhibitory/assets/scratchbackground.png');
//        game.load.image('use', 'Exhibitory/assets/use.png');
        game.load.spritesheet('egghead', 'Exhibitory/assets/character.png', 13, 50);
	},
	create : function(){
//        game.world.setBounds(0, 0, 800*4, 600);
//
//
//		scale = 4;
//        
//        bg = game.add.sprite(0, 0, 'scratchbg1');
//        bg.scale.x = bg.scale.y = scale;
//
//        platforms = game.add.group();
//        var floor = game.add.tileSprite(0, game.world.bounds.height-10, 800*4, 300, 'scratchfloor');
//        floor.scale.x = floor.scale.y = scale;
//        floor.body.immovable = true;
//        

        player = game.add.sprite(100, game.world.height - 110, 'egghead');
//        player.scale.x = player.scale.y = scale;
//        
//        player.body.bounce.y = 0.2;
//        player.body.gravity.y = 6;
//        player.body.collideWorldBounds = true;
//
//        player.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 7, true);
//        player.animations.stop();
//        player.frame = 0;
//        
//        cursors = game.input.keyboard.createCursorKeys();
//        cursors = game.input.keyboard.createCursorKeys();
//        player.anchor.setTo(.5, .5);
//        
//        game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
	},
	update : function(){
//        game.physics.collide(player, platforms);
//        player.body.velocity.x = 0;
//        
//        var curFrame = player.animations.getAnimation('walk').frame;
//        if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)){
//            player.animations.play('walk');
//            player.body.velocity.x = 100;
//            player.scale.x = scale;
//        }
//        else if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)){
//            player.animations.play('walk');
//            player.body.velocity.x = -100;
//            player.scale.x = -scale;
//        }
//        else if (curFrame == 5 || curFrame == 8 || curFrame < 2){
//            player.animations.stop();
//            player.frame = 0;
//        }
	}
};