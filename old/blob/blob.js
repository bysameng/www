//exhibitory main

///////////////////////////////////
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phasergame', { preload:preload, create:create, update:update});

var msg;
var dbgr;
var backGroup;
var bgGroup;
var bg2Group;
var platformsGroup;
var parallax1Group;
var spriteGroup;
var NPCGroup;
var itemsGroup;
var parallax2Group;
var parallax3Group;
var textGroup;
var guiGroup;
var currentRoom;
var interactMessageDisplaying = false;

///////////////////////////////////
//main loop
function preload(){
	game.state.add('Gameplay', Game.Gameplay);
	game.state.start('Gameplay');
    backGroup = game.add.group();
    bgGroup = game.add.group();
    parallax1Group = game.add.group();
    platformsGroup = game.add.group();
    bg2Group = game.add.group();
    itemsGroup = game.add.group();
    NPCGroup = game.add.group();
    spriteGroup = game.add.group();
    parallax2Group = game.add.group();
    parallax3Group = game.add.group();
    textGroup = game.add.group();
    guiGroup = game.add.group();
}
function create(){}
function update(){}


Item = function(game, x, y, sprite){
    this.sprite = Phaser.Sprite.call(this, game, x, y, sprite);
    this.scale.x = this.scale.y = scale;
    this.used = false;
    this.use = function(){}
};
Item.prototype = Object.create(Phaser.Sprite.prototype);
Item.prototype.constructor = Item;


Blob = function(game, x, y, spritename){
    this.sprite = Phaser.Sprite.call(this, game, x, y, spritename);
    this.scale.x = this.scale.y = scale;
    this.body.gravity.y = gravity;
    this.used = false;
    this.attention = 10;
    this.use = function(){
        this.body.y -= 10;
        this.body.velocity.y = -500;
        log('startled');
    }
};
Blob.prototype = Object.create(Phaser.Sprite.prototype);
Blob.prototype.constructor = Blob;


///////////////////////////////////
//resize game if window is resized
window.addEventListener('resize', function(event){resizeGame();});
var resizeGame = function () {game.stage.scale.refresh();}


///////////////////////////////////
//states
Game = {};
Game.Gameplay = function(game){};
Game.Gameplay = {
	platforms:null, cursors:null, wasd:null, doors:null,
	player:null, inventory:null, scale:null, bg:null, black:null, lights:null,
    gravity:null,
	preload : function(){
		Phaser.Canvas.setSmoothingEnabled(game.context, false);
		this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.pageAlignVeritcally = true;
        this.game.stage.scale.refresh();

        game.load.image('grayfloor', 'blob/assets/floor.png');
        
        game.load.spritesheet('blob', 'blob/assets/blob.png', 50, 50);
        game.load.spritesheet('egghead', 'blob/assets/character.png', 25, 42);


	},
    //put a little something in our lemonade, and take it with us
	create : function(){
        scale = 4;
        gravity = 30;
        
        msg = game.add.text(0, 0, "come on", { font: "30px Silkscreen", fill: "#FFF" });
        msg.alpha = .8;
        guiGroup.add(msg);
        
        //background color
        this.game.stage.backgroundColor = '#DDDDDD';
        
        //fader
//        black = game.add.sprite(0, 0, 'blackTexture');
//        black.scale.x = 4*800;
//        black.scale.y = 4*600;
//        black.alpha = 0;
        
        
        dbgr = game.add.text(0, 0, "dbgr", { font: "25px Silkscreen", fill: "#FFF" });
        
        
        //var box = guiGroup.create(25*4, 25, 'textbox');
        //box.scale.x = box.scale.y = scale;
        
        
        //cut into it
        player = game.add.sprite(100, game.world.height - 300, 'egghead');
        spriteGroup.add(player);
        player.scale.x = player.scale.y = scale;
        player.body.gravity.y = gravity;
        player.body.collideWorldBounds = true;
        player.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15, true);
        player.animations.add('idle', [0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 11, 11, 11, 12, 12, 12, 12, 12, 12, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 14, 0, 0, 0, 0], 2, true);
		player.animations.add('poke', [15, 16, 17], 9, false);
		player.animations.add('unpoke', [18, 17, 16, 15], 13, false);
        player.animations.stop();
        player.frame = 0;
        cursors = game.input.keyboard.createCursorKeys();
        player.anchor.setTo(.3, .5);
        player.jetpackfuel = .1;
        player.jetpackfuelmax = .1;
        
        //camera follower
        game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);

       // game.physics.Arcade.enable(player);

        
        //npcs
        var blob1 = new Blob(game, 500, 200, 'blob');
        blob1.body.gravity.y = gravity;
        blob1.body.collideWorldBounds = true;
        blob1.body.velocity.y = -200;
        blob1.animations.add('startled', [0, 1, 2, 3], 20);
        blob1.frame = 0;
        //blob1.body.bounce.y = .1;
        NPCGroup.add(blob1);
        
        
        //scenery
        var floor = platformsGroup.create(0, game.height-100, 'grayfloor');
        floor.body.immovable = true;
        floor.scale.x = floor.scale.y = scale*2;


	},
	update : function(){

        
        //you see them pass you by
        parallaxScroller(parallax1Group, -5);
        parallaxScroller(parallax2Group, -.95);
        //parallaxScroller(bgGroup, 2);
        parallaxScroller(backGroup, 1.5);

		dbgr.content = game.time.fps +' fps';
        for(var i = 0; i < NPCGroup.length; i++){
            var obj = NPCGroup.getAt(i);
		
            if (obj.body.velocity.y < 600){
                obj.frame = 6;
            }
            if (obj.body.velocity.y < 300){
                obj.frame = 5;
            }
            if (obj.body.velocity.y < -100){
                obj.frame = 1;
            }
            if (obj.body.velocity.y < -300){
                obj.frame = 2;   
            }
            if (obj.body.velocity.y < -500){
                obj.frame = 4;
            }
            
        }
        //log(player.body.velocity.y);
		
		/*
        if (!game.physics.overlap(player, itemsGroup, interactPrompt)){
           interactPromptOff();
        }
        
        if (!game.physics.overlap(player, NPCGroup, interactPrompt)){
            interactPromptOff();   
        }
		
		*/

        game.physics.collide(player, platformsGroup);
        game.physics.collide(NPCGroup, platformsGroup, setBlobFlat, null, this);
        
        player.body.velocity.x = 0;
        var curFrame = player.animations.getAnimation('walk').frame;
        if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)){
            player.animations.play('walk');
            player.body.velocity.x = 200;
            player.scale.x = scale;
        }
        
        else if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)){
            player.animations.play('walk');
            player.body.velocity.x = -200;
            player.scale.x = -scale;
        }
        
        else if (!player.animations.getAnimation('poke').isPlaying
				&& !player.animations.getAnimation('unpoke').isPlaying){
            player.animations.play('idle');
        }
        
        //jump
        if (player.jetpackfuel > 0 && cursors.up.isDown){
            player.jetpackfuel -= game.time.physicsElapsed;
            player.body.velocity.y -= 5500 * game.time.physicsElapsed;
        }
        
        if (player.body.touching.down){
            player.jetpackfuel = player.jetpackfuelmax;   
        }
		
		
		//poking
		if (game.input.keyboard.justReleased(Phaser.Keyboard.X)){
			player.animations.play('poke');
			player.events.onAnimationComplete.add(playerAnimationHandler, this);
		}
	},
};

function checkOverlapPrompt(player, item){
    return Phaser.Rectangle.intersects(player, item);
}

function interactPrompt(player, item){
    interactMessageDisplaying = true;
    msg.content = "[x]";
    msg.x = player.body.x+item.body.width/4;
    msg.y = player.body.y+40;
    if (game.input.keyboard.justReleased(Phaser.Keyboard.X)){
        player.animations.play('poke');
		player.events.onAnimationComplete.add(playerAnimationHandler, this);

	}
}

function interactPromptOff(){
    msg.content = "";
}


function setBlobFlat(blob, platforms){
    blob.frame = 0;
}



function parallaxScroller(group, parallaxPower){
    group.x = game.camera.x/parallaxPower;
    group.y = game.camera.y;
}


function log(msg) {
    setTimeout(function(){throw new Error(msg);}, 0);
}


function Fader(seconds){
    game.add.tween(black).to({alpha: 1}, seconds*1000, Phaser.Easing.Linear.None, true).to({}, seconds*500, Phaser.Easing.Linear.None, true).to({alpha: 0}, seconds*1000, Phaser.Easing.Linear.None, true);
}




function Dialogue(text){

}


function playerAnimationHandler(player, animation){
	switch (animation.name){
		case 'poke':
			game.physics.overlap(player, NPCGroup, pokeHandler);
			player.animations.play('unpoke');
			break;
		default: break;
	}
}

function pokeHandler(player, pokee){
	pokee.use();
}

///////////////////////////////////
//rooms
function Room (x, y, background, floor){
    this.lastx = x;
    this.lasty = y;
    this.bg2 = new Array();
    this.plx1 = new Array();
    this.plx2 = new Array();
    this.items = new Array();
    this.NPC = new Array();
    this.floor = null;
    this.bg = null;
    function renew(arr, group){
        for(var i  = 0; i < arr.length; i++){
            arr[i].revive();
            group.add(arr[i]);
        }
    }
    this.load = function(){
        if(currentRoom != null){currentRoom.exit();}
        currentRoom = this;
        this.bg = game.add.sprite(0, 0, background);
        this.floor = game.add.tileSprite(0, 450, this.bg.width, 40, floor);
        this.floor.body.setSize(this.bg.width, this.bg.width, 0, 40);
        
        platformsGroup.add(this.floor);
        this.floor.body.immovable = true;
        this.bg.scale.x = this.bg.scale.y = this.floor.scale.x = this.floor.scale.y = scale;
        bgGroup.add(this.bg);
        game.world.setBounds(0, 0, this.bg.width, this.bg.height);
//        for(var i = 0; i < this.bg2.length; i++){
//            this.bg2[i].revive();
//            bg2Group.add(this.bg2[i]);
//        }
//        for(var i = 0; i < this.plx1.length; i++){
//            this.plx1[i].revive();
//            parallax1Group.add(this.plx1[i]);
//        }
        renew(this.plx1, parallax1Group);
        renew(this.plx2, parallax2Group);
        renew(this.bg2, bg2Group);
        renew(this.NPC, NPCGroup);
//        for(var i = 0; i < this.plx2.length; i++){
//            this.plx2[i].revive();
//            parallax2Group.add(this.plx2[i]);
//        }
        for(var i = 0; i < this.items.length; i++){
            this.items[i].revive();
            itemsGroup.add(this.items[i]);
            this.items[i].animations.play('deuse');
            this.items[i].used = false;
        }
        this.floor.bringToTop();
    }

    //at least there were some things that would keep me sane
    this.createSprite = function(x, y, spriteName){
        var spr = game.add.sprite(x, y, spriteName);
        this.bg2[this.bg2.length] = spr;
    }
    this.addNPC = function(x, y, sprite){
        if(Math.abs(sprite.scale.x) != scale)
        sprite.scale.x = sprite.scale.y = scale;
        this.NPC[this.NPC.length] = sprite;
    }
    this.addbg2 = function(sprite){
        if(Math.abs(sprite.scale.x) != scale)
        sprite.scale.x = sprite.scale.y = scale;
        this.bg2[this.bg2.length] = sprite;
    }
    this.addplx1 = function(sprite){
        if(Math.abs(sprite.scale.x) != scale)
        sprite.scale.x = sprite.scale.y = scale;
        this.plx1[this.plx1.length] = sprite;
    }
    this.addplx2 = function(sprite){
        if(Math.abs(sprite.scale.x) != scale)
        sprite.scale.x = sprite.scale.y = scale;
        this.plx2[this.plx2.length] = sprite;
    }
    this.addItem = function(x, y, item){
        var newitem = new Item(game, 200, 240, item);
        if(Math.abs(sprite.scale.x) != scale)
        newitem.scale.x = newitem.scale.y = scale;
        this.items[this.items.length] = newitem;
    }

    this.addDoor = function(x, y, item, exitroom){
        var newitem = new Item(game, x, 90, item);
        newitem.scale.x = newitem.scale.y = scale;
        newitem.animations.add('use', [0, 1, 2, 3, 4], 4, false);
        newitem.animations.add('deuse', [4, 3, 2, 1, 0], 4, false);
        newitem.frame = 0;
        newitem.isDoor = true;
        newitem.exitroom = exitroom;
        newitem.room = this;
        newitem.use = function(){
            if(newitem.used) return;
            newitem.used = true;
            newitem.animations.play('use');
            //play sound here?
            Fader(1);
            newitem.events.onAnimationComplete.addOnce(function(){this.room.lastx = this.x; player.x = newitem.exitroom.lastx; newitem.exitroom.load(); game.camera.focusOn(player);}, this);
        }
        
        this.items[this.items.length] = newitem;
    }
    this.exit = function(){
        if(this.bg != null){this.bg.kill();}
        if(this.floor != null){this.floor.kill();}
        for(var i = 0; i < this.bg2.length; i++){
            this.bg2[i].kill();
        }
        for(var i = 0; i < this.plx1.length; i++){
            this.plx1[i].kill();
        }
        for(var i = 0; i < this.plx2.length; i++){
            this.plx2[i].kill();
        }
        for(var i = 0; i < this.items.length; i++){
            this.items[i].kill();
        }
    }
}

