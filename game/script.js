var GAME = {
    width: 1200,
    height: 700,
    canvasContext: null,
    background: new Image(),
}

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
    equipment: "none",
    hp: 20,
    dmg: 3,
    outfit: new Image(),
}

var WARRIOR = {
    width: 100,
    height: 100,
    x: 800,
    y: 200,
    hp: 15,
    dmg: 4,
    outfit: new Image(),
}

var HEALER = {
    width: 100,
    height: 100,
    x: 1000,
    y: 300,
    hp: 3,
    dmg: 1,
    heal: 2,
    outfit: new Image(),
}

var ARCHER = {
    width: 100,
    height: 100,
    x: 800,
    y: 400,
    hp: 7,
    dmg: 2,
    outfit: new Image(),
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
    GAME.canvasContext.drawImage(WARRIOR.outfit, WARRIOR.x, WARRIOR.y, WARRIOR.width, WARRIOR.height);
    GAME.canvasContext.drawImage(ARCHER.outfit, ARCHER.x, ARCHER.y, ARCHER.width, ARCHER.height);
    GAME.canvasContext.drawImage(HEALER.outfit, HEALER.x, HEALER.y, HEALER.width, HEALER.height);
}

function update() {
    var xCharacterMove = CHARACTER.x + CHARACTER.xMove;
    var yCharacterMove = CHARACTER.y + CHARACTER.yMove;
    if(xCharacterMove < 0 || xCharacterMove >= GAME.width || yCharacterMove < 0 || yCharacterMove >= GAME.height || (xCharacterMove >= LAVA.x && (CHARACTER.y < LAVA.height || CHARACTER.y >= LAVA.height + 100) && (xCharacterMove < LAVA.x + LAVA.width)) || ((yCharacterMove < LAVA.height || yCharacterMove >= LAVA.height + 100) && (CHARACTER.x < LAVA.x + LAVA.width && CHARACTER.x >= LAVA.x))) {
        CHARACTER.xMove = 0;
        CHARACTER.yMove = 0;
    }
    CHARACTER.x += CHARACTER.xMove;
    CHARACTER.y += CHARACTER.yMove;
    play();
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
