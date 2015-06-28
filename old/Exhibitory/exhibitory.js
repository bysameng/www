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
	preload : function(){
		Phaser.Canvas.setSmoothingEnabled(game.context, false);
		this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.pageAlignVeritcally = true;
        this.game.stage.scale.refresh();
        game.load.image('wireroom', 'exhibitory/assets/wireroom.png');
        game.load.image('outsidefloor', 'exhibitory/assets/outsidefloor.png');
        game.load.image('scratchfloor', 'exhibitory/assets/scratchfloor.png');
        game.load.image('scratchbg1', 'exhibitory/assets/scratchbackground.png');
        game.load.image('scratchbg2', 'exhibitory/assets/sorryroom.png');
        game.load.image('use', 'exhibitory/assets/use.png');
        game.load.image('flare', 'exhibitory/assets/lightflare.png');
        lights = [];
        for(var i = 1; i < 4; i++){
            game.load.image('light'+i, 'exhibitory/assets/hanginglight'+i+'.png');
            lights[i-1] = 'light'+i;
        }
        game.load.image('blackTexture', 'exhibitory/assets/blacktexture.png');
        game.load.image('building1', 'exhibitory/assets/building.png'); 
        game.load.image('sky1', 'exhibitory/assets/skylineback.png');
        game.load.image('sky2', 'exhibitory/assets/skylineback2.png');
        game.load.image('chair', 'exhibitory/assets/dedguy.png');
        game.load.image('can1', 'exhibitory/assets/can.png');
        
        game.load.image('textbox', 'exhibitory/assets/textbox.png');
        
        game.load.spritesheet('door1', 'exhibitory/assets/door.png', 30, 90);
        game.load.spritesheet('egghead', 'exhibitory/assets/character.png', 14, 42);
        game.load.spritesheet('tallguy', 'exhibitory/assets/tallguy.png', 31, 168);
        game.load.image('playershadow', 'exhibitory/assets/charactershadow.png');
	},
    //put a little something in our lemonade, and take it with us
	create : function(){
        scale = 4;
        black = game.add.sprite(0, 0, 'blackTexture');
        black.scale.x = 4*800;
        black.scale.y = 4*600;
        black.alpha = 0;
        
        dbgr = game.add.text(0, 0, "dbgr", { font: "25px Silkscreen", fill: "#FFF" });
        
        
        //var box = guiGroup.create(25*4, 25, 'textbox');
        //box.scale.x = box.scale.y = scale;
        
        
        //non-believer because we're alright
        player = game.add.sprite(100, game.world.height - 300, 'egghead');
        spriteGroup.add(player);
        player.scale.x = player.scale.y = scale;
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 6;
        player.body.collideWorldBounds = true;
        player.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        player.animations.add('idle', [0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 11, 11, 11, 12, 12, 12, 12, 12, 12, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 14, 0, 0, 0, 0], 2, true);
        player.animations.stop();
        player.frame = 0;
        cursors = game.input.keyboard.createCursorKeys();
        player.anchor.setTo(.5, .5);

        
        //npcs
//        var tallguy = game.add.sprite(100, game.world.height-500, 'tallguy');
//        tallguy.scale.x = tallguy.scale.y = scale;
        
        
        //camera follower
        game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
        
        var back = game.add.sprite(0, 0, 'sky1');
        back.scale.x = back.scale.y = scale;
        backGroup.add(back);
        
        var outside = new Room(100, game.world.height - 110, 'sky1', 'outsidefloor');
        var room1 = new Room(100, game.world.height - 110, 'scratchbg1', 'scratchfloor');
        var room2 = new Room(100, game.world.height - 110, 'scratchbg2', 'scratchfloor');
        
        //there were always too many lights everywhere
        //i never really liked all those lights
        //but now when the lights are gone, what do you miss
        for(var i = 0; i < 10; i++){
            createLight(800*3*Math.random()+400, parallax1Group, room1, true);
            createLight(800*5*Math.random()+400, parallax2Group, room1, false);
            createLight(800*6*Math.random()+400*Math.random(), parallax2Group, room1, false);
        }
        var buildingloc = 2700;
        
        room1.add

        //room1.addplx2(new Phaser.Sprite(game, 300, -10, 'can1'));
        
        room2.x = 100;
        room2.addplx2(new Phaser.Sprite(game, 400, game.world.height-308, 'chair'));
        room2.addDoor(0, 0, 'door1', room1);
        createLight(500, parallax2Group, room2, false);

        msg = game.add.text(0, 0, "come on", { font: "30px Silkscreen", fill: "#FFF" });
        msg.alpha = .8;
        guiGroup.add(msg);
        
        room1.addDoor(buildingloc+170, 0, 'door1', room2);
        //room1.addDoor(0, 0, 'door1', outside);
        room2.exit();
        room1.exit();
        room1.load();
        currentRoom = room1;

	},
	update : function(){

        //i never believed in anything, really, until it all seemed like nothing was random, but everything was
        //perhaps it's just sour grapes towards everyone else
        parallaxScroller(parallax1Group, -5);
        parallaxScroller(parallax2Group, -.95);
        //parallaxScroller(bgGroup, 2);
        parallaxScroller(backGroup, 1.5);


        if (!game.physics.overlap(player, itemsGroup, interactPrompt)){
           interactPromptOff();
        }

        game.physics.collide(player, platformsGroup);
        
        player.body.velocity.x = 0;
        var curFrame = player.animations.getAnimation('walk').frame;
        if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)){
            player.animations.play('walk');
            player.body.velocity.x = 125;
            player.scale.x = scale;
        }
        
        else if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)){
            player.animations.play('walk');
            player.body.velocity.x = -125;
            player.scale.x = -scale;
        }
        
        else{
            player.animations.play('idle');
        }
	},
    


};

function checkOverlapPrompt(player, item){
    return Phaser.Rectangle.intersects(player, item);
}

function interactPrompt(player, item){
    interactMessageDisplaying = true;
    msg.content = "[x]";
    msg.x = item.body.x+item.body.width/3;
    msg.y = player.body.y+40;
    if (game.input.keyboard.justReleased(Phaser.Keyboard.X)){item.use();}
}

function interactPromptOff(){
    msg.content = "";
}

function createLight(pos, group, Room, plx){
    var randomHeight = Math.random()*200;
    var randomOrientation = (Math.random());
    var reverse = false;
    if (Math.random() > .5){reverse = true;}
    var lightflare;
    lightflare = game.add.sprite(pos, -randomHeight, 'light'+Math.ceil(Math.random()*3));
    lightflare.anchor.setTo(.5, 0);
    lightflare.scale.y = scale;
    if(reverse)
        lightflare.scale.x = -scale;
    else lightflare.scale.x = scale;
    group.add(lightflare);
    if(plx) Room.addplx1(lightflare);
    else Room.addplx2(lightflare);
    lightflare = game.add.sprite(pos, 375-randomHeight, 'flare');
    lightflare.scale.y = scale;
    lightflare.alpha = .5;
    if (reverse) lightflare.scale.x = scale;
    else lightflare.scale.x = -scale;
    lightflare.anchor.setTo(.5, .5);
    group.add(lightflare);
    if (plx) Room.addplx1(lightflare);
    else Room.addplx2(lightflare);
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

