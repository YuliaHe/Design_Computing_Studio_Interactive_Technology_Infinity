var myGamePiece;
var myObstacles = [];
var Obstacleshitbox = [];
var myScore;
var poppic = [];
var popdes = [];
var gallerypic = [];
var gallerydes = [];
var screenW = window.innerWidth;
var screenH = window.innerHeight;
var gameBGM,gameOver,hitobstacles;
gameBGM = new sound("music/2A03_Necrophageon-Neon_Starlight.mp3");
dead = new sound("music/gameOver.mp3");
hitobstacles = new sound("music/hit.mp3");
var developer = false;
var difficulty = 0.5;

function sound(src) {
    //create a audio object
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }


function initGame(){
    // Initialize the game and its components.

    myGamePiece = new component(100, 130,  "./statics/pixcel.png", 120, 150, "image", "player");
    myGamePieceBoost = new component(100, 130,  "./statics/pixcelboost.png", 120, 150, "image", "player");
    homeButton = new transparentButton(new component(85, 50 , "rgba(0, 0, 0, 0.7)", 1500, 435, "roundRect"), new component("15px", "'Press Start 2P'", "white", 1515, 467, "text"));
    homeButton.content.text = "HOME";
    heart1 = new component(30, 25,  "./statics/heart.png", 25, 25, "image");
    heartEmpty1 = new component(30, 25,  "./statics/heartempty.png", 25, 25, "image");
    heart2 = new component(30, 25,  "./statics/heart.png", 60, 25, "image");
    heartEmpty2 = new component(30, 25,  "./statics/heartempty.png", 60, 25, "image");
    heart3 = new component(30, 25,  "./statics/heart.png", 95, 25, "image");
    heartEmpty3 = new component(30, 25,  "./statics/heartempty.png", 95, 25, "image");


    myGamePiece.gravity = 0.3;
    myGamePieceBoost.gravity = 0.3;

    myScore = new component("20px", "'Press Start 2P'", "black", 1100, 40, "text");
    mydifficultyText = new component("20px", "'Press Start 2P'", "black", 1400, 40, "text");
    myBackground = new component(1600, 500, "./statics/background.png", 0, 0, "background");


    difficultyEasy = new transparentButton(new component(200, 50 , "rgba(0, 0, 0, 0.7)", 420, 400, "roundRect"), new component("15px", "'Press Start 2P'", "white", 490, 434, "text"));
    difficultyNormal = new transparentButton(new component(200, 50 , "rgba(0, 0, 0, 0.7)", 760, 400, "roundRect"), new component("15px", "'Press Start 2P'", "white", 820, 434, "text"));
    difficultyLunatic = new transparentButton(new component(200, 50 , "rgba(0, 0, 0, 0.7)", 1100, 400, "roundRect"), new component("15px", "'Press Start 2P'", "white", 1165   , 434, "text"));

    startButton = new transparentButton(new component(900, 160 , "rgba(0, 0, 0, 0.6)", 400, 150, "roundRect"), new component("20px", "'Press Start 2P'", "white", 500, 240, "text"));
    gameOverText = new transparentButton(new component(850, 200 , "rgba(0, 0, 0, 0.6)", 350, 175, "roundRect"), new component("35px", "'Press Start 2P'", "white", 630, 260, "text"));
    gameOverButtonBack = new component(250, 50 , "rgba(250, 250, 250, 0.9)", 665, 295, "roundRect");
    gameOverButtonText = new component("15px", "'Press Start 2P'", "black", 730, 328, "text");
    gameOverButton = new transparentButton(gameOverButtonBack, gameOverButtonText);

    camera = new component(109, 67, "./statics/camera.png", -200, 100, type="image", "camera");
    clock = new component(100, 100, "./statics/clock.png", -600, 200, type="image","clock");
    cd = new component(100, 100, "./statics/cd.png", -1000, 300, type="image","cd");
    switch0 = new component(100, 100, "./statics/switch.png", -1400 , 400, type="image","switch");

}

function responsive_w(width){
    // function used to calculate the relative x coordinate and width in different devices.

    return Math.round(width* (myGameArea.canvas.width/1600))
}

function responsive_h(height){
    // same as follow, used for responsive designs

    return Math.round(height* (myGameArea.canvas.height/500))
}


function resizeCanvas() {               
    // resize the canvas, retrieved from : https://stackoverflow.com/questions/21185678/responsive-canvas-for-different-screens-best-way-to-do-it
    
    myGameArea.canvas.width = Math.round(window.innerWidth * 0.80);
    myGameArea.canvas.height = Math.round(window.innerHeight *0.55);
}


function startGame() {
    // start the game
    myGameArea.stop();
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();    /// call the first time page is loaded
    initGame();
    myGameArea.loading();
    console.log(myGameArea.canvas.width);
    console.log(myGameArea.canvas.height);
    controller.startControl();
    }

function gameReset() {
        // reset to gameloading
    myGameArea.stop();
    myGameArea.clear();
    myGamePiece = {};
    myGamePieceBoost = {};
    myObstacles = [];
    myscore = {};
    document.getElementById("c").innerHTML = "";
    initGame();
    myGameArea.defaultcursor();
    myGameArea.loading();
        
    }
    
function restartGame() {
    // reset to ganmestart
    myGameArea.stop();
    myGameArea.clear();
    myGamePiece = {};
    myGamePieceBoost = {};
    myObstacles = [];
    myscore = {};
    document.getElementById("c").innerHTML = "";
    initGame();
    myGameArea.defaultcursor();
    myGameArea.start();
    
}

var controller = {
    // controller of the game

    startControl : function(){
        window.addEventListener('mousedown', function (e) {
            myGameArea.x = e.pageX-screenW*0.08;                // deduct the top and left margin of the canvas
            myGameArea.y = e.pageY-screenH*0.2;
            console.log(myGameArea.x);
            console.log(myGameArea.y);
        })
        window.addEventListener('mouseup', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
        window.addEventListener('touchstart', function (e) {
            myGameArea.x_touch = e.pageX-screenW*0.08;
            myGameArea.y_touch = e.pageY-screenH*0.2;
        })
        window.addEventListener('touchend', function (e) {
            myGameArea.x_touch = false;
            myGameArea.y_touch = false;
            accelerate(0.4);
        })
        window.addEventListener('keydown', function (a) {
            myGameArea.key = a.keyCode;
        })
        window.addEventListener('keyup', function (a) {
            myGameArea.key = false;
            accelerate(0.4);
        })
        window.addEventListener('mousemove', function (e) {
            myGameArea._x = e.pageX-screenW*0.08;
            myGameArea._y = e.pageY-screenH*0.2;
        })
    }
}



var myGameArea = {
    // the main game function

    canvas : document.getElementById("c"),

    loading : function(){
        this.interval = setInterval(gameStart, 20);
        this.context = this.canvas.getContext("2d");
    },

    start : function() {
        this.context = this.canvas.getContext("2d");
        // document.body.insertBefore(this.canvas, document.body.childNodes[4]);
        this.frameNo = 0;
        this.interval = setInterval(gameLoop, 20);
        gameBGM.sound.volume = 0.5;
        gameBGM.sound.loop = "loop";
        gameBGM.play();
        this.x = false;
        this.y = false;
        },

    stop : function() {
        clearInterval(this.interval);
        this.pause = true;
        gameBGM.stop();
    },
    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    continue : function(){
        this.interval = setInterval(gameLoop, 20);
        this.pause = false;
        gameBGM.play();
    },

    over : function(){
        this.interval = setInterval(gameOver, 20);
    },

    changecursor : function(){
        // change the cursor to "pointer"

        this.canvas.style.cursor = "pointer";
    },

    defaultcursor : function(){
        this.canvas.style.cursor = "auto";
    },

}

function transparentButton(component1, component2){
    // a class which refer to a transparent button

    this.background = component1;
    this.content = component2;
    this.update = function(){
        this.background.update();
        this.content.update();
    }
}


function component(width, height, color, x, y, type, shape) {
    // define the component class which will be drew on the canvas
    this.type = type;
    this.shape = shape;
    this.color = color;
    if (type == "image"||type == "background") {
            this.image = new Image();
            this.image.src = this.color;
    }
    this.score = 0;
    this.width = width;
    this.height = height;
    if(type != "text"){
        this.width = responsive_w(width);
        this.height = responsive_h(height);
    }
    this.speedX = 0;
    this.speedY = 0;    
    this.x = responsive_w(x);
    this.y = responsive_h(y);
    this.lives = 2;
    this.immunetime = 0;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        // function to draw the component on the canvas

        ctx = myGameArea.context;
        switch(type){
        case "roundRect" :
            radius = 25;
            width = this.width;
            height = this.height;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + radius);
            ctx.lineTo(this.x, this.y + height - radius);
            ctx.quadraticCurveTo(this.x, this.y + height, this.x + radius, this.y + height);
            ctx.lineTo(this.x + width - radius, this.y + height);
            ctx.quadraticCurveTo(this.x + width, this.y + height, this.x + width, this.y + height - radius);
            ctx.lineTo(this.x + width, this.y + radius);
            ctx.quadraticCurveTo(this.x + width, this.y, this.x + width - radius, this.y);
            ctx.lineTo(this.x + radius, this.y);
            ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + radius);
            ctx.fill();
            break;

        case "text" :
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
            break;
        
        case "image" :
        case "background" :
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
                if (type == "background"){
                    ctx.drawImage(this.image, 
                        this.x + this.width, 
                        this.y, 
                        this.width, 
                        this.height);
                }
            break;

        default :
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            break;

        }
    }

    this.clicked = function() {
        // function to detect whether the component is clicked by the user

        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var clicked = true;
        if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
            clicked = false;
        }
        if (clicked == true){
            console.log("An element is clicked")
        }

        return clicked;
    }

    this.touched = function() {
        // detect whether it is touched by the user from the device with touch screen

        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var touched = true;
        if ((mybottom < myGameArea.y_touch) || (mytop > myGameArea.y_touch) || (myright < myGameArea.x_touch) || (myleft > myGameArea.x_touch)) {
            touched = false;
        }
        if (clicked == true){
            console.log("An element is touched")
        }

        return touched;
    }

    this.hovered = function() {
        // detect whether the cursor is hovering on the component

        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var clicked = true;
        if ((mybottom < myGameArea._y) || (mytop > myGameArea._y) || (myright < myGameArea._x) || (myleft > myGameArea._x)) {
            clicked = false;
        }
        if (clicked == true){
            console.log("An element is hovering",this)
        }

        return clicked;
    }

    this.newPos = function() {
        // calculate the new position of the component based on its accelerate and speed.

        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        if (this.type == "background") {
            if (this.x < -(myGameArea.canvas.width)) {
              this.x = 0;
            }
          }
        switch(this.shape){
            case "camera":
                if(this.x < -(myGameArea.canvas.width)){
                    this.x = responsive_w(1600+1400);
                    this.y = responsive_h(Math.random()*500);
                    this.gravitySpeed =0;
                    this.speedY = responsive_h((0.5-Math.random())*8*difficulty);
                }
                break;
            case "clock":
                if(this.x < -(myGameArea.canvas.width)){
                    this.x = responsive_w(1600+1000);
                    this.y = responsive_h(Math.random()*500);
                    this.gravitySpeed =0;
                    this.speedY = responsive_h((0.5-Math.random())*8*difficulty);
                }
                break;
            case "cd":
                if(this.x < -(myGameArea.canvas.width)){
                    this.x = responsive_w(1600+600);
                    this.y = responsive_h(Math.random()*500);
                    this.gravitySpeed =0;
                    this.speedY = responsive_h((0.5-Math.random())*8*difficulty);
                }
                break;
            case "switch":
                if(this.x < -(myGameArea.canvas.width)){
                    this.x = responsive_w(1600+200);
                    this.y = responsive_h(Math.random()*500);
                    this.gravitySpeed =0;
                    this.speedY = responsive_h((0.5-Math.random())*8*difficulty);
                }
                break;
            default :
            break;
        }
        this.hitBottom();
        this.hitTop();
    }

    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.hitTop = function() {
        var rocktop = 0;
        if (this.y < rocktop) {
            this.y = rocktop;
            this.gravitySpeed = 0.2;
        }
    }

    this.crashWith = function(otherobj) {

        //simple detection of crash event
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    
    this.currentpos = function(){
        this.point0 = new Point(this.x, this.y)
        return this.point0;
    }
}



function Point(x,y){                // define a class to  represent a point on the canvas
    this.x=x;
    this.y=y;
    this.getxValue = function(){
        return this.x;
    }
    this.getyValue = function(){
        return this.y;
    }
    
    this.move = function(point0){
        this.x += point0.x;
        this.y += point0.y;
    }
}

function pointMinus(point1, point2){                
    var x0 = point1.x - point2.x;
    var y0 = point1.y - point2.y;
    return new Point(x0, y0);
}

function pointMultiple(point1, point2){             // method use to define the multiple of points
     var product = (point1.x * point2.y) - (point2.x * point1.y);
     return product;
}

function edge(point1, point2){              // define a class to represent an edge of a shape
    this.point1 = point1;
    this.point2 = point2;
    this.x = point1.x - point2.x;
    this.y = point1.y - point2.y;
    
    
}

function onedge(p,e){
    // whether a point is on a edge
    if(Math.min(e.point1.x, e.point2.x) <= p.x && p.x <= Math.max(e.point1.x, e.point2.x) && Math.min(e.point1.y, e.point2.y) <= p.y && p.y <= Math.max(e.point1.y, e.point2.y))
    {
        if(pointMultiple(pointMinus(p, e.point1), pointMinus(p, e.point2)) ==0){
            return true;
        } else{
            return false;
        }
    } else {
        return false;
    }
}

function ifintersect(edge1,edge2){             // define a method to determine whether two edges are intersect with each other, retrieved from :https://blog.51cto.com/jayce1111/2439060
    p1 = edge1.point1;
    p2 = edge1.point2;
    q1 = edge2.point1;
    q2 = edge2.point2;
    
    
    p1p2 = edge1;
    q1q2 = edge2;
    
    p1q1 = new edge(edge1.point1, edge2.point1);
    p1q2 = new edge(edge1.point1, edge2.point2);
    q1p1 = new edge(edge2.point1, edge1.point1);
    q1p2 = new edge(edge2.point1, edge1.point2);

    c1 = onedge(p1,q1q2);
    c2 = onedge(p2,q1q2);
    c3 = onedge(q1,p1p2);
    c4 = onedge(q2,p1p2);

    if(c1||c2||c3||c4 ){
        return true
    } 
    d1 = pointMultiple(p1p2,p1q1);
    d2 = pointMultiple(p1p2,p1q2);
    d3 = pointMultiple(q1q2,q1p1);
    d4 = pointMultiple(q1q2,q1p2);



    result = d1 * d2 < 0 && d3 * d4 <0;

    return result;
}

function createHitBox(component){
    // create a hitbox based on a component
    position = component.currentpos();
    shape = component.shape;
    hitbox1 = new hitBox(position, shape);
    hitbox1.update(position);
    return hitbox1;
}

function convertCoordinates(data){
    // convert an array of data to points and edges
    this.points = [];
    this.edges = [];
    this.data = data;
    this.length = data.length /2;
    this.createPoints = function(){
        for(i=0; i<this.length; i++){
            this.points.push(new Point(this.data[2*i], this.data[2*i+1]));
        }
    };


    this.createEdges = function(){
        this.pointlength = this.points.length
        for(i=0; i< this.pointlength-1; i++){
            this.edges.push(new edge(this.points[i], this.points[i+1]));
        }
        this.edges.push(new edge(this.points[this.pointlength-1], this.points[0]));
    }

    this.convert = function(){
        this.createPoints();
        this.createEdges();
        return this.edges;
    }
}

function UpdatePosition(position, data){
    // move the coordinates data based on target position of a hitbox
    length = data.length;
    for(i=0; i<length; i++){
        switch(i%2){
            case 0:
                data[i] += position.x;
                break;
            case 1:
                data[i] += position.y;
        }
    }
    return data;
}


function hitBox(position, shape){              // define a class of the game components hitbox
    this.position = position;
    this.shape = shape;

    this.update = function(position) {                // used to generate hitbox based on different shape of components
        switch(this.shape){
            case "player":
                data = [35,6,17,21,16,55,4,60,6,92,80,92,82,60,72,20,56,5];
                points = UpdatePosition(position, data);
                convert0 = new convertCoordinates(points);
                convert0.convert();
                this.edges = convert0.edges;
                break;
            case "switch":
                data = [28,10,5,35,56,95,79,67];
                points = UpdatePosition(position, data);
                convert0 = new convertCoordinates(points);
                convert0.convert();
                this.edges = convert0.edges;
                break;
            case "clock":
                data = [27,18,8,45,45,87,84,48,61,8];
                points = UpdatePosition(position, data);
                convert0 = new convertCoordinates(points);
                convert0.convert();
                this.edges = convert0.edges;
                break;
            case "camera" :
                data = [0,6,0,60,89,61,90,8,49,0];
                points = UpdatePosition(position, data);
                convert0 = new convertCoordinates(points);
                convert0.convert();
                this.edges = convert0.edges;
                break;
            case "cd":
                data = [27,18,8,45,45,87,84,48,61,8];
                points = UpdatePosition(position, data);
                convert0 = new convertCoordinates(points);
                convert0.convert();
                this.edges = convert0.edges;
                break;
        }
    }

    this.draw = function(){

        // used for debug, draw the hitbox on the canvas
        ctx = myGameArea.context;
        ctx.strokeStyle = "#FF00FF";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.edges[0].point1.x, this.edges[0].point1.y);
        for(i=1; i<this.edges.length; i++){
            ctx.lineTo(this.edges[i].point1.x, this.edges[i].point1.y);
        }
        ctx.lineTo(this.edges[0].point1.x, this.edges[0].point1.y);
        ctx.stroke();
    }
}

function ifCollapse(hitbox, otherhitBox){                // the method to determine whether two hitbox is collapsed.
    var i,j;
    var collapse = false;
    for(i = 0; i < hitbox.edges.length; i ++){
        for(j = 0; j < otherhitBox.edges.length; j ++){
            if(ifintersect(hitbox.edges[i],otherhitBox.edges[j]) == true){
                collapse = true;
                console.log(hitbox.edges[i]);
                console.log(otherhitBox.edges[j]);
                console.log(ifintersect(hitbox.edges[i],otherhitBox.edges[j]));
            }
        }
    }
    return collapse;
}

function updateHearts(){
    //update players health point and draw it on the canvas
    switch(myGamePiece.lives){
        case 0:
            if(myGamePiece.immunetime%18<9){
                heartEmpty1.update();
            }
            heartEmpty1.update();
            heartEmpty2.update();
            heartEmpty3.update();
            break;
        case 1:
            heart1.update();
            if(myGamePiece.immunetime%18<9){
                heartEmpty2.update();
            }else{
                heart2.update();
            }
            heartEmpty3.update();
            break;
        case 2:
            heart1.update();
            heart2.update();
            if(myGamePiece.immunetime%18<9){
                heartEmpty3.update();
            } else{
                heart3.update();
            }
            break;
        case 3:
            heart1.update();
            heart2.update();
            heart3.update();
            break;
}
}

function drawtriangle(x1,y1,x2,y2,x3,y3){
    // draw the little triangle on difficulty selection
    this.x1 = responsive_w(x1);
    this.x2 = responsive_w(x2);
    this.x3 = responsive_w(x3);
    this.y1 = responsive_h(y1);
    this.y2 = responsive_h(y2);
    this.y3 = responsive_h(y3);
    ctx = myGameArea.context;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x1,this.y1);
        ctx.lineTo(this.x2,this.y2);
        ctx.lineTo(this.x3,this.y3);
        ctx.lineTo(this.x1,this.y1);
        ctx.stroke();
}



function gameStart() {
    // waiting for user to actually start the game

    myGameArea.clear();
    myBackground.speedX = responsive_w(-40);
    myBackground.newPos();
    myBackground.update();

    startButton.content.text= "PRESS SPACE BUTTON TO START"
    startButton.update();


    if (myGameArea._x && myGameArea._y) {               //hovering effects

        myGameArea.changecursor();

        if (difficultyEasy.background.hovered()) {
            
            difficultyEasy.content.color = "rgba(255, 255, 255, 1)";
            difficultyEasy.background.color = "rgba(0, 0, 0, 0.9)";

        }
        else {
            difficultyEasy.content.color = "rgba(255, 255, 255, 0.9)";
            difficultyEasy.background.color = "rgba(0, 0, 0, 0.6)";

        }

        if (difficultyNormal.background.hovered()) {
            
            difficultyNormal.content.color = "rgba(255, 255, 255, 1)";
            difficultyNormal.background.color = "rgba(0, 0, 0, 0.9)";

        }
        else {
            difficultyNormal.content.color = "rgba(255, 255, 255, 0.9)";
            difficultyNormal.background.color = "rgba(0, 0, 0, 0.6)";

        }
        if (difficultyLunatic.background.hovered()) {
            
            difficultyLunatic.content.color = "rgba(255, 255, 255, 1)";
            difficultyLunatic.background.color = "rgba(0, 0, 0, 0.9)";

        }
        else {
            difficultyLunatic.content.color = "rgba(255, 255, 255, 0.9)";
            difficultyLunatic.background.color = "rgba(0, 0, 0, 0.6)";

        }    
    } else {
        myGameArea.defaultcursor();
    }

    difficultyEasy.content.text = "EASY";
    difficultyNormal.content.text = "NORMAL";
    difficultyLunatic.content.text = "CRAZY";
    difficultyEasy.update();
    difficultyNormal.update();
    difficultyLunatic.update();




    if(difficultyNormal.background.clicked()){
        difficulty = 0.7;
    }

    if(difficultyLunatic.background.clicked()){
        difficulty = 1;
    }

    if(difficultyEasy.background.clicked()){
        difficulty = 0.5;
    }

    switch(difficulty){
        case 0.5:
            drawtriangle(440,415,440,435,460,425);
            break;
        case 0.7:
            drawtriangle(780,415,780,435,800,425);
            break;
        case 1:
            drawtriangle(1120,415,1120,435,1140,425);
            break;
    }


    
    if (myGameArea.key && myGameArea.key == 32) {               //press space to start the game
        myGameArea.stop();
        myGameArea.start();
    } if (myGameArea.x_touch && myGameArea.y_touch){
        myGameArea.stop();
        myGameArea.start();
    }
    myGamePiece1 = myGamePieceBoost;
    myGamePiece1.update();



}

function gameLoop() {


    myGameArea.defaultcursor();   
    
    for (i = 0; i < myObstacles.length; i += 1) {               //detect the crash event
        if (myGamePiece.crashWith(myObstacles[i])) {

            collapse = false;
            for(h=0;h < Obstacleshitbox.length; h++){
                if(ifCollapse(myHitbox,Obstacleshitbox[h])){
                    collapse = true;
                }
            }

            if(collapse ==true && myGamePiece.immunetime==0){
                if(myGamePiece.lives <= 1){
                    console.log(myGamePiece.lives);
                    myGamePiece.lives -= 1;
                    dead.sound.volume = 0.6;
                    dead.play();
                    // game over
                    myGameArea.stop();
                    myGameArea.over();
                    console.log("crashed");
                    // $(".gameoverbox").addClass("fail");
                    return;

                } else {
                    myGamePiece.lives -= 1;
                    myGamePiece.immunetime = 100;               //otherwise it will keep return crashing, also give immunetime after crash
                    hitobstacles.play();
                }
            }
        }
            
    } 

    myGameArea.clear();
    myGameArea.frameNo += 1;
    var currentSpeed = 0 - (Math.floor(myGameArea.frameNo/50) * difficulty);                //Obstacles speed increase based on difficulty and frame number


    if (myGameArea.frameNo == 1 ) {             //different difficulty born with different lives
        console.log(difficulty);
        switch(difficulty){
            case 0.5:
                myGamePiece.lives = 3;
                break;
            case 0.7:
                myGamePiece.lives = 2;
                break;
            case 1:
                myGamePiece.lives = 1;
                break;
        }

        x = myGameArea.canvas.width;
        // minHeight = 120;
        // maxHeight = 200;
        // height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        myObstacles.push(clock);                //update hitbox of the Obstacles
        myObstacles.push(camera);
        myObstacles.push(cd);
        myObstacles.push(switch0);
        myHitbox = createHitBox(myGamePiece);
        clockhitbox = createHitBox(clock);
        camerahitbox = createHitBox(camera);
        cdhitbox = createHitBox(cd);
        switch0hitbox = createHitBox(switch0);
        Obstacleshitbox.push(clockhitbox);
        Obstacleshitbox.push(camerahitbox);
        Obstacleshitbox.push(cdhitbox);
        Obstacleshitbox.push(switch0hitbox);
    }
    myBackground.speedX = responsive_w(-40);
    myBackground.newPos();
    myBackground.update();

    for (i = 0; i < myObstacles.length; i += 1) {               //update obstacles
        myObstacles[i].speedX = responsive_w(-10) + currentSpeed;
        myObstacles[i].newPos();
        myObstacles[i].update();

    }
    clockhitbox.update(clock.currentpos());             //failed to update with for loop "obstacleshitbox[i].update()", so I just update them one by one
    cdhitbox.update(cd.currentpos());
    switch0hitbox.update(switch0.currentpos());
    camerahitbox.update(camera.currentpos());


    myGamePiece.newPos();
    myHitbox.update(myGamePiece.currentpos());
    myGamePieceBoost.newPos();

    if(myGamePiece.clicked() && myGameArea.key && myGameArea.key == 32 ){               // developer mode(show the hitbox)
        if(developer == true){
            developer = false;
        }else{
            developer = true;
        }
    }

    if(developer == true){
        myHitbox.draw();
        clockhitbox.draw();
        camerahitbox.draw();
        switch0hitbox.draw();
        cdhitbox.draw();
    }

    if (myGameArea.key && myGameArea.key == 32 || myGameArea.x_touch && myGameArea.y_touch ||myGameArea.key && myGameArea.key == 38) {              //boose after press the space button
        accelerate(-2);
        if(myGamePiece.immunetime%18<9){                // the player and hearts will twinkle during the immune time
            myGamePieceBoost.update();
        }
    } else if(myGameArea.key && myGameArea.key ==83 ){
        accelerate(2);
        if(myGamePiece.immunetime%18<9){
            myGamePiece.update();
        }
    }
    else{
        if(myGamePiece.immunetime%18<9){
            myGamePiece.update();
        }
    }

    var difficultyText;             //show the current difficulty
    switch(difficulty){
        case 0.5:
            difficultyText = "EASY";
            break;
        case 0.7:
            difficultyText = "NORMAL";
            break;
        case 1:
            difficultyText = "CRAZY";
            break;
    }



    myScore.text="SCORE: " + myGameArea.frameNo;
    mydifficultyText.text =  difficultyText;
    mydifficultyText.update();
    myScore.update();
    updateHearts();

    if (myGameArea._x && myGameArea._y) {               // hovering effect of the home button
        if (homeButton.background.hovered()) {
            myGameArea.changecursor();
            homeButton.background.color = "rgba(0, 0, 0, 1)";
            homeButton.content.color = "rgba(250, 250, 250, 1)";

        }
        else {
            myGameArea.defaultcursor();
            homeButton.background.color = "rgba(0, 0, 0, 0.5)";
            homeButton.content.color = "rgba(250, 250, 250, 1)";
        }    
    }
    homeButton.update();

    if(homeButton.background.clicked()){
        gameReset();
    }
    
    if(myGamePiece.immunetime>0){
        myGamePiece.immunetime -= 1;
    }




    // Every 1000 points, a photo will pop up
    if (myGameArea.frameNo%1000==0){
        if(myGamePiece.lives<3){
            myGamePiece.lives+=1;
        }
        myGameArea.stop();
        var picnum = Math.round(Math.random()*poppic.length);
            $(".poppic").addClass("active");
            $(".poppic").append(
                $('<img>').attr("src", poppic[picnum]),
            )
            poppic.pop(poppic[picnum]);
            gallerypic.push(poppic[picnum]);
            gallerydes.push(popdes[picnum]);
            console.log(gallerypic);
    }

}

function gameOver(){
    // game over function, alternative the game loop after the player crashed

    myGameArea.clear();
    if (myGameArea.x && myGameArea.y) {
        if (gameOverButton.background.clicked()) {
            restartGame();
        }
    }

    if (myGameArea.x_touch && myGameArea.y_touch) {
        if (gameOverButton.background.touched()) {
            restartGame();
        }
    }

    if (myGameArea._x && myGameArea._y) {
        myGameArea.changecursor();
        if (gameOverButton.background.hovered()) {
            gameOverButtonText.color = "rgba(0, 0, 0, 1)";
            gameOverButtonBack.color = "rgba(250, 250, 250, 1)";

        }
        else {
            gameOverButtonText.color = "rgba(0, 0, 0, 0.5)";
            gameOverButtonBack.color = "rgba(250, 250, 250, 1)";
        }
        
        if (homeButton.background.hovered()) {
            homeButton.background.color = "rgba(0, 0, 0, 1)";
            homeButton.content.color = "rgba(250, 250, 250, 1)";

        }
        else {
            homeButton.background.color = "rgba(0, 0, 0, 0.5)";
            homeButton.content.color = "rgba(250, 250, 250, 1)";
        }    
    } else{
        myGameArea.defaultcursor();
    }

    myBackground.newPos();    
    myBackground.update();

    gameOverText.content.text= "GAME OVER";
    gameOverText.update();

    gameOverButton.content.text = "RESTART";
    gameOverButton.update();

    homeButton.update();
    if(homeButton.background.clicked()){
        gameReset();
    }
    
}

function everyinterval(n) {             //actually not used any more
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {                //give the time machine an accelerator
    myGamePiece.gravity = n;
    myGamePieceBoost.gravity = n;
}

// #####################################################

function getYear(year) {
	if(year) {
		return year.match(/[\d]{4}/); // This is regex (https://en.wikipedia.org/wiki/Regular_expression)
	}
}

function iterateRecords(data) {

	console.log(data);

	$.each(data.result.records, function(recordKey, recordValue) {

		var recordTitle = recordValue["dc:title"];
		var recordYear = getYear(recordValue["dcterms:temporal"]);
		var recordImage = recordValue["1000_pixel_jpg"];
		var recordDescription = recordValue["dc:description"];

		if(recordTitle && recordYear && recordImage && recordDescription) {

			if(recordYear < 1900) { 
                poppic.push(recordImage);
                popdes.push(recordDescription)
                console.log(poppic);
                console.log("Hi")

			}

        }
        

    });
    

	

}



$(document).ready(function() {

	var data = {
		resource_id: "8a327cf9-cff9-4b34-a461-6f883bdc3a48",
		limit: 1000
	}

	$.ajax({
		url: "https://www.data.qld.gov.au/api/3/action/datastore_search",
		data: data,
		dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise XSS).
		cache: true,
		success: function(data) {
			iterateRecords(data);
		}
	});

    $(".gallery").click(function(){
        console.log("clicked")
        $(".gameoverbox").removeClass("fail");  
        $(".gallerypic").addClass("active");
        $(".game").addClass("notActive");
        $(".gallery").addClass("btnActive");
        $(".gamebtn").removeClass("btnActive");
        
    })

    $(".gamebtn").click(function(){
        console.log("clicked")
        $(".gameoverbox").removeClass("fail");  
        $(".gallerypic").removeClass("active");
        $(".game").removeClass("notActive");
        $(".gallery").removeClass("btnActive");
        $(".gamebtn").addClass("btnActive");
        $(".poppic img").remove();
        $(".poppic").addClass("notActive");
        $(".poppic").removeClass("active");
        
    })

    $(".poppic").click(function(){
        // click the pop up window to continue
        myGameArea.continue();
        $(".poppic").removeClass("active");
        $(".poppic img").remove();
        console.log(gallerypic[0]);
        $("#pictures").append(
            $('<a class="record strip">').attr("href", gallerypic[gallerypic.length-1])
            .attr( "data-strip-caption", gallerydes[gallerypic.length-1])
            .attr("data-strip-options", "side: 'top'")
            .append(
                $('<img>').attr("src", gallerypic[gallerypic.length-1]),
            )
        )
        })

    
});

// ###############################################
