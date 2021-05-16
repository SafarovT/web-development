var LAVA = {
    width: 300,
    height: 300,
    x: 100,
    y: 0,
    background: new Image(),
}

var CHARACTER = {
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    xMove: 0,
    yMove: 0,
	
    equipment: [],
    hp: 20,
    dmg: 4,
	def: 10,
	aim: 2,
	distance: 1,
	
    outfit: new Image(),
}

var WARRIOR = {
    width: 100,
    height: 100,
    x: 800,
    y: 300,
	xMove: 0,
    yMove: 0,
	
    hp: 15,
    dmg: 4,
	def: 16,
	aim: -1,
	distance: 1,
	
    outfit: new Image(),
}

var HEALER = {
    width: 100,
    height: 100,
    x: 1000,
    y: 200,
	
    hp: 3,
    dmg: 1,
    heal: 2,
	def: 8,
	aim: 0,
	distance: 10,
	
    outfit: new Image(),
}

var ARCHER = {
    width: 100,
    height: 100,
    x: 1000,
    y: 400,
	
    hp: 7,
    dmg: 2,
	def: 12,
	aim: 2,
	distance: 3,
	
    outfit: new Image(),
}

var GAME = {
    width: 1200,
    height: 700,
    canvasContext: null,
    background: new Image(),
	enemies: [WARRIOR, HEALER, ARCHER],
}

function rollDice(max) {
  min = 1;
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function init() {
    GAME.background.src = "img/background.png"
    LAVA.background.src = "img/lava.png"

    CHARACTER.outfit.src = "img/default_outfit.png"
    WARRIOR.outfit.src = "img/warrior.png"
    HEALER.outfit.src = "img/healer.png"
    ARCHER.outfit.src = "img/archer.png"

    var canvas = document.getElementById("canvas");
    _initCanvas(canvas);
    _initEventsListeners(canvas);

    GAME.background.onload = function() {
        play();
    }
}

function play() {
    draw();
}

function draw() {
    GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    GAME.canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);
    GAME.canvasContext.drawImage(LAVA.background, LAVA.x, LAVA.y, LAVA.width, LAVA.height * 2 + 100);

    GAME.canvasContext.drawImage(CHARACTER.outfit, CHARACTER.x, CHARACTER.y, CHARACTER.width, CHARACTER.height);
	for (let i = 0; i < GAME.enemies.length; i++)
		{
			GAME.canvasContext.drawImage(GAME.enemies[i].outfit, GAME.enemies[i].x, GAME.enemies[i].y, GAME.enemies[i].width, GAME.enemies[i].height);
		}
}

function update() {
    let xCharacterMove = CHARACTER.x + CHARACTER.xMove;
    let yCharacterMove = CHARACTER.y + CHARACTER.yMove;
	
    if(checkCollision(CHARACTER)) {
        CHARACTER.xMove = 0;
        CHARACTER.yMove = 0;
    }
	
	for (let i = 0; i < GAME.enemies.length; i++)
		{
			if ((xCharacterMove == GAME.enemies[i].x) && (yCharacterMove == GAME.enemies[i].y))	
				{
					fight(GAME.enemies[i]);
				}
		}
	
    CHARACTER.x += CHARACTER.xMove;
    CHARACTER.y += CHARACTER.yMove;
	
	enemyTurn();
	
    play();
}

function enemyTurn() {
	for(let i = 0; i < GAME.enemies.length; i++)
		{
			if (GAME.enemies[i] == WARRIOR)
				{
					GAME.enemies[i].xMove = 0;
					GAME.enemies[i].yMove = 0;
					if(near(GAME.enemies[i], CHARACTER))
						{
							attack(GAME.enemies[i], CHARACTER);
						}
					else
						{
							generateBotDirection(GAME.enemies[i]);
						}
					GAME.enemies[i].x += GAME.enemies[i].xMove;
					GAME.enemies[i].y += GAME.enemies[i].yMove;
				}
			if (GAME.enemies[i] == HEALER)
				{
					
				}
			if (GAME.enemies[i] == ARCHER)
				{
					
				}
		}
}

function near(attacking, target) {
	return ((target.x >= attacking.x - attacking.distance * 100) && (target.x <= attacking.x + attacking.distance * 100)) &&
		((target.y >= attacking.y - attacking.distance * 100) && (target.y <= attacking.y + attacking.distance * 100))
}

function generateBotDirection(bot) {
	if (rollDice(2) == 1)
		{
			if (bot.x > CHARACTER.x) {bot.xMove = -100}
			else if (bot.x < CHARACTER.x) {bot.xMove = 100}
			else if (bot.y > CHARACTER.y) {bot.yMove = -100}
			else {bot.yMove = 100}
		}
	else
		{
			if (bot.y > CHARACTER.y) {bot.yMove = -100}
			else if (bot.y < CHARACTER.y) {bot.yMove = 100}
			else if (bot.x > CHARACTER.x) {bot.xMove = -100}
			else {bot.xMove = 100}
		}
	while (checkCollision(bot))
		{	
			alert(bot.xMove + ' ' + bot.yMove);
			if (bot.xMove != 0)
				{
					bot.xMove = 0;
					if (bot.y >= 300) {bot.yMove = -100;}
					else {bot.yMove = 100;}
				}
			else 
				{e;
					bot.yMove = 0;
					if (CHARACTER.x <= 300) {bot.xMove = -	100;}
					else {bot.yMove = 100;}
				}
			
		}
}

function checkCollision(object) {
	let xObjectMove = object.x + object.xMove;
    let yObjectMove = object.y + object.yMove;
	let withBarriers = xObjectMove < 0 ||
	   xObjectMove >= GAME.width ||
	   yObjectMove < 0 ||
	   yObjectMove >= GAME.height ||
	  (xObjectMove >= LAVA.x && (object.y < LAVA.height || object.y >= LAVA.height + 100) && (xObjectMove < LAVA.x + LAVA.width)) ||
	 ((yObjectMove < LAVA.height || yObjectMove >= LAVA.height + 100) && (object.x < LAVA.x + LAVA.width && object.x >= LAVA.x));
	let withCreatures  = false;
	for (let i = 0; i < GAME.enemies.length; i++)
		{
			if ((xObjectMove == GAME.enemies[i].x) && (yObjectMove == GAME.enemies[i].y))	
				{
					withCreatures = true;
				}
		}
	return withCreatures || withBarriers
	
}

function fight(enemy) {
	
	attack(CHARACTER, enemy);
	
	if (enemy.hp <= 0)
		{
			GAME.enemies.splice(GAME.enemies.indexOf(enemy), 1)
		}
	console.log(CHARACTER.hp);
	
}
	
function attack(attacking, defending) {
	let result = rollDice(20);
	let dmg = 0;
	if (result + attacking.aim >= defending.def && result != 20)
		{
			result += 2;
			dmg = rollDice(attacking.dmg);
			defending.hp -= dmg;
		}
	if (result == 20)
		{
			dmg = rollDice(attacking.dmg) * 2;
			defending.hp -= dmg;
		}
	console.log('Result = ' + result + '\nDamage = ' + dmg);
}

function _initCanvas(canvas) {
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    GAME.canvasContext = canvas.getContext("2d");
}

function _initEventsListeners(canvas) {
    document.addEventListener("keydown", _onDocumentKeyDown);
}

function _onDocumentKeyDown(event) {
    CHARACTER.xMove = 0;
    CHARACTER.yMove = 0;
    if (event.key == "ArrowUp") {
        CHARACTER.yMove = -100;  update();
    }
    else if (event.key == "ArrowDown") {
        CHARACTER.yMove = 100;  update();
    }
    else if (event.key == "ArrowLeft") {
        CHARACTER.xMove = -100;  update(); 
    }
    else if (event.key == "ArrowRight") {
        CHARACTER.xMove = 100;  update();
    } 
    
}
