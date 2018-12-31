/**
 * This file contains the logic for the game that runs in the canvas tag in game.php
 * I have done my bst to organize all the aspects of the code as neatly as ossible since 
 * there is quite a bit in this one file. 
 * 
 * Variables are in the first section divided by what they manipulate in the game
 * Functions are in the second part listed mostly in order of use
 * The function call to start the game is at the very bottom of the page
 */


//Variables*********************************************************************************

//#region *** Canvas set-up ***
var canvas = document.querySelector('canvas');
canvas.width = 1100;
canvas.height = 721;
var c = canvas.getContext("2d"); //Allows for drawing on the canvas
//#endregion

//#region *** JSON Arrays ***
var boardSpace = []; //Every space on the board: index is the space id
var gamePlayer = []; //Every player: index is the player id
var cardArray = []; //Each type of card: 0 Cause, 1 Prevent, 2 Spread, 3 Quarantine
//#endregion

//#region *** Flags and Counters ***
var playerTurn = 0; //Keep track of the player turn
var movesLeft = 0;
var diceNum = 0; //need diceNumber rolled
var lastCardId = 0; //most recently used card id
var movePiece = false;
var endTurnFlag = false;
var playerMoved = false;
var diceRolled = false;
var playMinigame = false;
var gameOver = false;
var diceButtonStartX = 0;
var diceButtonStartY = 0;
var canClickRoll = true;
//#endregion

//#region *** Game Settings ***
var totalPlayers = 2; //temp value
var diceValue = 6; //Max Value of the die
var minigamePoints = 20; //Points awarded for winning a minigame
const winningScore = 100; //Win condition
//Cards are indexed in order use these to generate values:
var causeMax = 10;
var preventMax = 20;
var spreadMax = 30;
var quarantineMax = 35;
//#endregion

//#region *** Gameboard settings ***
var boardX = 100; //The center of the first space on the board
var boardY = 150;
var boardSpaceWidth = 100;
var boardSpaceHeight = 100;
var boardSpacesH = 10;
var boardSpacesV = 5;
var direction = "E";
var boardSpaceColor = "#ffffff"; //white
var boardSpaceOpacity = .85;
var boardSpaceBorderColor = "#000000"; //black
var boardSpaceBorderWidth = 3;
var boardSpaceLetterColor = "#000000"; //black
//Mark each space ID in the array with the corresponding letters
var causeArray = [1,7,13,21,26]; //Prop 0 
var spreadArray = [3,11,14,22]; //Prop 1
var preventArray = [2,15,19,25]; //Prop 2
var quarantineArray = [4,10,17,24]; //Prop 3
var minigameArray = [5,9,12,18,23]; //Prop 4
//#endregion

//#region *** Game Piece Settings ***
var gamePieceX = boardX;
var gamePieceY = boardY;
//Colors should be all lowercase hex values
var gamePieceColor = ["#9d46ff","#ff0000"];
var gamePieceBorderColor = ["#0a00b6","#8b0000"];
var gamePieceName = ["Player One","Player Two"];
var gamePieceImage = ['images/game/p1.png', 'images/game/p2.png']
var gamePieceImageSize = 32;
var areYouHuman = [true, false];
var gamePieceBorderWidth = 6;
var gamePieceRadius = 20;
//Used to draw rings around the player 
var ringRadiusMax = gamePieceRadius + 25;
var ringRadius = gamePieceRadius;
var ringSpeed = .5;
var ringWidth = 4;
var ringOpacityMax = 1;
var ringOpacity = 1;
var ringFadeSpeed = .05;
//0 to Math.PI * 2 gives us a radian that will create a circle
var gamePieceStartAngle = 0;
var gamePieceEndAngle = Math.PI * 2;
var moveForward = true;
//At the moment this only works right if the value is a 
//factor of the BoardSpaceWidth
const movementX = 5;
const movementY = 5;
//#endregion

//#region *** Score Boxes ***
var boxCenter = canvas.width/(totalPlayers+1); 
var scoreBoxHeight = 100;
var scoreBoxWidth = 180; //Even numbers for best results
var scoreBoxOpacity = .95;
var scoreBoxBorder = 2;
var scoreBoxFontSize = 20
var scoreBoxLineBreakSize = 5;
var scoreBoxFont = scoreBoxFontSize + "px Arial";
var scoreBoxTextAlign = "center"; 
var scoreBoxTextBaseline = "middle";
var scoreBoxTextColor = "#ffffff";
//#endregion

//#region *** Dice Panel ***
var panelCenterH = canvas.width/2; 
var panelCenterV = (canvas.height/2 - 25); 
var dicePanelHeight = 200;
var dicePanelWidth = 400; //Even numbers for best results
var dicePanelColor = "#ffffff";
var dicePanelBorderColor = "#000000";
var dicePanelOpacity = .95;
var dicePanelBorder = 2;
var dicePanelFontSize = 20
var dicePanelLineBreakSize = 5;
var dicePanelFont = dicePanelFontSize + "px Arial";
var dicePanelTextAlign = "center"; 
var dicePanelTextBaseline = "middle";
var dicePanelTextColor = "#000000";
var panelTextHorizontalOffset = 100;
var diceButtonWhiteSpace = 30;
var diceButtonHeight = 60;
var diceButtonWidth = 140;
var diceButtonBorderWidth = 3;
var diceButtonColor = '#efefef';
var diceButtonBorderColor = '#000000';
var diceButtonFontSize = 20
var diceButtonText = "Roll the Dice!";
var diceButtonTextGameOver = "New Game";
var diceButtonFont = dicePanelFontSize + "px Arial";
var diceButtonTextAlign = "center"; 
var diceButtonTextBaseline = "middle";
var diceButtonTextColor = "#000000";
var diceButtonHoverColor = "#cddcf2";
var diceButtonClickColor = "#96accc";
var diceButtonClickState = 0; //Control what color state the button is in
//#endregion

//Functions********************************************************************************

//#region *** Listeners ***
//Listener for the move button
/*document.getElementById("moveButton").addEventListener("click", function(){
    if (gameOver){
        newGame()
    } else {
        document.getElementById("moveButton").disabled = true;
        rollDice();
    }
    
});*/
//#endregion

//#region *** Game Start Functions ***

//Prepares a new game
function newGame(){
    console.log("Starting a new game");
    //Set the button text
    //document.getElementById("moveButton").innerHTML = "Roll the dice!";
    //document.getElementById("diceSpan").innerHTML = "Dice Value: " + 0;

    playerTurn = 0;

    //Game is no longer over
    gameOver = false;

    //Creates the array of players
    createPlayers();

    //Set the score
    //updateScore();

    //Draw cards for later
    initializeCards();
    
    //Begin
    //main();
}

//Get one of each card for the cardArray
function initializeCards(){
    //We'll load some cards when the game starts.
    //Cause
        requestCard(0, getRandomInt(causeMax, 0));
    //Prevent
        requestCard(1, getRandomInt(preventMax, causeMax + 1));
    //Spread
        requestCard(2, getRandomInt(spreadMax, preventMax + 1));
    //Quarantine
        requestCard(3, getRandomInt(quarantineMax, spreadMax + 1));
}

//Populates the player array with player objects
function createPlayers(){

    //We set the array to 0 to clear it. This will update all references to the array as well.
    //gamePlayer.length = [] is not correct because the array is referenced elsewhere.
    gamePlayer.length = 0;

    for (let index = 0; index < totalPlayers; index++) {
        //Creates the player object with various atrributes
         var player = {
            name: gamePieceName[index],
            score: 0,
            space: 0,
            previousPosition: 0,
            startX: gamePieceX,
            startY: gamePieceY,
            color: gamePieceColor[index],
            colorBorder: gamePieceBorderColor[index],
            isHuman: areYouHuman[index],
            imagePath: gamePieceImage[index]
        };

        //Push the player on to the array
        gamePlayer.push(player); 
    }
    
}

//#endregion

//#region *** Main Functions ***

//Main animation loop
function main(){
    //console.log("Drawing");
    c.clearRect(0, 0, innerWidth, innerHeight)

    //Draw the game board
    drawBoard();

    //Draw the pice roll panel
    drawDicePanel();

    //Move Piece
    if (movePiece == true){
        movePlayer();
    }    

    //always check for score changes after moving
    //updateScore();
    drawScoreBoxes();

    //Check Space Property - only activates when the player rolled the dice
    if (playerMoved == true ) {
        
        playerMoved = false;

        if (diceRolled == true) {
            checkSpaceProperty();
        } else {
            endTurnFlag = true;
        }
        
    }

    if (playMinigame == true) {
        playMinigame = false;
        minigame();
    }

    //End the turn
    if (endTurnFlag == true) {
        endTurn()
    }

    /*
    //Save data
    if (condition) {
        
    }

    */

    //Draw the player pieces
    //Calls the function to draw the game piece
    drawPlayers();
    drawGamePieceRing()
    

    requestAnimationFrame(main);
}

//Draws the game board. This will be necessary every time something is animated.
function drawBoard(){

    //We set the array to 0 to clear it. This will update all references to the array as well.
    //boardSpace.length = [] is not correct because the array is referenced elsewhere.
    boardSpace.length = 0;

    var originX = boardX;
    var originY = boardY; 

    var keepDrawing = true;
    var spaceProperty;
    var letterValue;

    //Set the game background image
    base_image = new Image();
    base_image.src = 'images/game/map.jpg';
    c.drawImage(base_image, 0, 0);

    do{        
        //Creates the square
        
        c.fillStyle = 'rgba(' + hexToRgb(boardSpaceColor).r + ',' +
        hexToRgb(boardSpaceColor).g + ',' + 
        hexToRgb(boardSpaceColor).b + ',' + 
        boardSpaceOpacity + ')';

        c.fillRect(getHCorner(boardX, boardSpaceWidth), 
        getVCorner(boardY, boardSpaceHeight), 
        boardSpaceWidth, boardSpaceHeight);

        //Draw letters
        letterValue = "";
        spaceProperty = -1;

        //console.log("Check letter value arrays for " + boardSpace.length);
        if (causeArray.includes(boardSpace.length)) {
            //console.log(boardSpace.length + " is in C");
            letterValue = "C";
            spaceProperty = 0;
        }

        if (preventArray.includes(boardSpace.length)) {
            //console.log(boardSpace.length + " is in P");
            letterValue = "P";
            spaceProperty = 1;
        }

        if (spreadArray.includes(boardSpace.length)) {
            //console.log(boardSpace.length + " is in S");
            letterValue = "S";
            spaceProperty = 2;
        }

        if (quarantineArray.includes(boardSpace.length)) {
            //console.log(boardSpace.length + " is in Q");
            letterValue = "Q";
            spaceProperty = 3;
        }

        if (minigameArray.includes(boardSpace.length)) {
            //console.log(boardSpace.length + " is in M");
            letterValue = "M";
            spaceProperty = 4;
        }

        //console.log("Letter Value: " + letterValue);
        if(letterValue !== ""){
            c.beginPath();
            //console.log("Writing " + letterValue);
            c.fillStyle = boardSpaceLetterColor;
            c.font = "30px Arial";
            //c.fillText(letterValue, boardX - 12, boardY + 10);
            c.fillText(letterValue, boardX, boardY);

        }

        //Creates the border for the square
        c.beginPath();
        c.strokeStyle = boardSpaceBorderColor;
        c.lineWidth = boardSpaceBorderWidth;
        c.rect(getHCorner(boardX, boardSpaceWidth), 
        getVCorner(boardY, boardSpaceHeight),
        boardSpaceWidth, boardSpaceHeight);
        c.stroke();

        //Change direction so we draw a rectangle.
        if (boardX === originX + (boardSpaceWidth * (boardSpacesH-1)) && direction === "E"){
            direction = "S";
        } 

        if (boardY === originY + (boardSpaceHeight * (boardSpacesV-1)) && direction === "S"){
            direction = "W";
        } 

        if (boardX === originX && direction === "W"){
            direction = "N";
        } 

        if (boardY === originY && direction === "N"){
            direction = "E";
        } 

        //Creates the object for space to be referenced later
        var space = {
            height: boardSpaceHeight,
            width: boardSpaceWidth,
            startX: boardX,
            startY: boardY,
            property: spaceProperty,
            nextDirection: direction
        };

        //Add the boardSpace to the array for later use
        boardSpace.push(space);

        //console.log(space);


        switch(direction){
            case "E":
                console.log
                boardX += boardSpaceWidth;
                break;
            
            case "S":
                boardY += boardSpaceHeight;
                break;

            case "W":
                boardX -= boardSpaceWidth;
                break;

            case "N":
                boardY -= boardSpaceHeight;
                break;

        }
    
    
        //console.log("We did it");
        
        if (boardX === originX && boardY === originY){
            //console.log("X and Y are at the begining, the board is complete.");
            keepDrawing = false;
        }
    }
    while( keepDrawing);

    //console.log("Board complete. Squares drawn: " + boardSpace.length);


    
}

//Draw the game piece
function drawPlayers(){

    //draw all player except for the current player
    for (let index = 0; index < gamePlayer.length; index++) {

        if (index == playerTurn) {
            continue;
        }

        drawGamePiece(gamePlayer[index].startX, gamePlayer[index].startY, gamePlayer[index].color,
            gamePlayer[index].colorBorder, gamePlayer[index].imagePath)
      
    }

    //draw the current player last = ensures current player is always visible
    drawGamePiece(gamePlayer[playerTurn].startX, gamePlayer[playerTurn].startY, gamePlayer[playerTurn].color,
        gamePlayer[playerTurn].colorBorder, gamePlayer[playerTurn].imagePath)


    //console.log("Game pieces drawn. Players: " + gamePlayer.length);
}

//Draw the game piece
function drawGamePiece(gamePieceXNumber, gamePieceYNumber, gamePieceColorNumber,
    gamePieceBorderColorNumber, gamePieceImagePath){

        //Create the game piece using given values
        c.beginPath();
        c.lineWidth = gamePieceBorderWidth;
        c.arc(gamePieceXNumber, gamePieceYNumber, gamePieceRadius, 
        gamePieceStartAngle, gamePieceEndAngle, false);
        c.strokeStyle = gamePieceBorderColorNumber;
        c.fillStyle = gamePieceColorNumber;
        c.stroke();
        c.fill();  
        
        //Set game piece image
        pieceImage = new Image();
        pieceImage.src = gamePieceImagePath;
        //Keep the image centered, images should always be square
        //console.log(gamePieceXNumber - gamePieceImageSize)
        c.drawImage(pieceImage, 
            (gamePieceXNumber - gamePieceImageSize/2), 
            (gamePieceYNumber - gamePieceImageSize/2));
       
}

function drawGamePieceRing(){
    //Create the game piece
    c.beginPath();
    c.lineWidth = ringWidth;
    c.arc(gamePlayer[playerTurn].startX, gamePlayer[playerTurn].startY, ringRadius, 
    gamePieceStartAngle, gamePieceEndAngle, false);
    c.strokeStyle = 'rgba(' + hexToRgb(gamePlayer[playerTurn].color).r +
    ',' +hexToRgb(gamePlayer[playerTurn].color).g +
    ',' +hexToRgb(gamePlayer[playerTurn].color).b +
    ', ' + ringOpacity +')';
    c.stroke();

    if (ringRadius < ringRadiusMax) {
        ringRadius += ringSpeed;
    }else{
        if (ringOpacity > 0) {
            ringOpacity -= ringFadeSpeed;
        } else {
            ringRadius = gamePieceRadius;
            ringOpacity = ringOpacityMax;
        }
        
    }
}

function drawScoreBoxes(){
    for (let i = 0; i < totalPlayers; i++) {
        var boxStartX = (boxCenter * (i + 1)) - (scoreBoxWidth/2)       
        var boxStartY = canvas.height - scoreBoxHeight; 
        var boxColor = gamePlayer[i].color;
        var boxBorderColor = gamePlayer[i].colorBorder;

        c.fillStyle = 'rgba(' + hexToRgb(boxColor).r + ',' +
        hexToRgb(boxColor).g + ',' +
        hexToRgb(boxColor).b + ',' + 
        scoreBoxOpacity + ')';
        c.fillRect(boxStartX, boxStartY, scoreBoxWidth, scoreBoxHeight);

        c.beginPath();
        c.strokeStyle = boxBorderColor;
        c.lineWidth = scoreBoxBorder;
        c.rect(boxStartX, boxStartY, scoreBoxWidth, scoreBoxHeight);
        c.stroke();
        
        var scoreBoxMessage = "Score: " + gamePlayer[i].score;

        c.beginPath();
        c.font= scoreBoxFont;
        c.textAlign = scoreBoxTextAlign; 
        c.textBaseline = scoreBoxTextBaseline;
        c.fillStyle = scoreBoxTextColor;
        c.fillText(gamePlayer[i].name, boxStartX+(scoreBoxWidth/2), boxStartY+(scoreBoxHeight/2) - ((scoreBoxFontSize/2) + (scoreBoxLineBreakSize/2)));
        c.fillText(scoreBoxMessage, boxStartX+(scoreBoxWidth/2), boxStartY+(scoreBoxHeight/2) + ((scoreBoxFontSize/2) + (scoreBoxLineBreakSize/2)));
        

    }
    
}

function drawDicePanel(){
    
        var panelStartX = (panelCenterH - (dicePanelWidth/2));      
        var panelStartY = panelCenterV - (dicePanelHeight/2); 
        var panelColor = dicePanelColor;
        var panelBorderColor = dicePanelBorderColor;

        //Draw panel
        var colorWithOpa = 'rgba(' + hexToRgb(panelColor).r + ',' +
        hexToRgb(panelColor).g + ',' +
        hexToRgb(panelColor).b + ',' + 
        dicePanelOpacity + ')';
        //c.fillStyle = colorWithOpa;
        //c.fillRect(panelStartX, panelStartY, dicePanelWidth, dicePanelHeight);

        roundRect(panelStartX, panelStartY, dicePanelWidth, dicePanelHeight, 10, colorWithOpa, true, 0);

        //Draw border
        /*c.beginPath();
        c.strokeStyle = panelBorderColor;
        c.lineWidth = dicePanelBorder;
        c.rect(panelStartX, panelStartY, dicePanelWidth, dicePanelHeight);
        c.stroke(); */

        roundRect(panelStartX, panelStartY, dicePanelWidth, dicePanelHeight, 10, panelBorderColor, false, dicePanelBorder);

        var dicePanelMessage = "Dice Value: " + diceNum;
        
        c.beginPath();
        c.font= dicePanelFont;
        c.textAlign = dicePanelTextAlign; 
        c.textBaseline = dicePanelTextBaseline;
        c.fillStyle = dicePanelTextColor;
        c.fillText(dicePanelMessage, panelStartX +(dicePanelWidth/2) + panelTextHorizontalOffset, panelStartY+(dicePanelHeight/2) );

        
        //Draw the button
        //Start X and Y are defined globally; needed to allow clicking
        diceButtonStartX = (panelCenterH - ((dicePanelWidth)/2) + diceButtonWhiteSpace );      
        diceButtonStartY = panelCenterV - (diceButtonHeight/2); 
        
        var buttonColor = diceButtonColor;
        switch (diceButtonClickState) {
            case 0:
                buttonColor = diceButtonColor;
                break;
        
            case 1:
                buttonColor = diceButtonHoverColor;
                break;
            
            case 2:
                buttonColor = diceButtonClickColor;
                break;
            
            default:
                buttonColor = diceButtonColor;
                break;
        }


        var buttonBorderColor = diceButtonBorderColor;



        c.fillStyle = buttonColor;
        c.fillRect(diceButtonStartX, diceButtonStartY, diceButtonWidth, diceButtonHeight);

        //Draw border
        c.beginPath();
        c.strokeStyle = buttonBorderColor;
        c.lineWidth = diceButtonBorderWidth;
        c.rect(diceButtonStartX, diceButtonStartY, diceButtonWidth, diceButtonHeight);
        c.stroke(); 
        
        if (gameOver) {
            var diceButtonMessage = diceButtonTextGameOver; 
        } else {
            var diceButtonMessage = diceButtonText; 
        }
        
        
        c.beginPath();
        c.font= diceButtonFont;
        c.textAlign = diceButtonTextAlign; 
        c.textBaseline = diceButtonTextBaseline;
        c.fillStyle = diceButtonTextColor;
        c.fillText(diceButtonMessage, diceButtonStartX+(diceButtonWidth/2), diceButtonStartY+(diceButtonHeight/2) );
        

    
    
}
//Check if a point is inside a region
function isInside(mouseX, mouseY, startX, startY, height, width){
    return mouseX > startX && mouseX < startX + width && 
    mouseY < startY + height && mouseY > startY;
}

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}


canvas.addEventListener('click', function(evt) {
	var mousePos = getMousePos(canvas, evt);
    //debugger;
    //Click Dice Roll
	if (canClickRoll == true &&
        isInside(mousePos.x, mousePos.y, diceButtonStartX, diceButtonStartY, diceButtonHeight, diceButtonWidth)) {
        //alert('clicked inside rect');
        //document.getElementById("moveButton").disabled = true;
        diceButtonClickState = 2;
        
        if (gameOver) {
          newGame();  
        } else {
          canClickRoll = false;
          rollDice();  
        }
        setTimeout(function(){
            diceButtonClickState = 1;
        }, 50);
    }
}, false);

canvas.onmousemove = function(e){
    var mousePos = getMousePos(canvas, e);
    //debugger;
    //Click Dice Roll
	if (canClickRoll == true &&
        isInside(mousePos.x, mousePos.y, diceButtonStartX, diceButtonStartY, diceButtonHeight, diceButtonWidth)) {
        diceButtonClickState = 1;
    }else{
        diceButtonClickState = 0;
    }
}

canvas.onmousedown = function(e){
    var mousePos = getMousePos(canvas, e);
    //debugger;
    //Click Dice Roll
	if (canClickRoll == true &&
        isInside(mousePos.x, mousePos.y, diceButtonStartX, diceButtonStartY, diceButtonHeight, diceButtonWidth)) {
        //alert('clicked inside rect');
        diceButtonClickState = 2;
    }
}

canvas.onmouseup = function(e){
    var mousePos = getMousePos(canvas, e);
    //debugger;
    //Click Dice Roll
	if (canClickRoll == true &&
        isInside(mousePos.x, mousePos.y, diceButtonStartX, diceButtonStartY, diceButtonHeight, diceButtonWidth)) {
        //alert('clicked inside rect');
        diceButtonClickState = 1;
    }
}

function roundRect(x, y, width, height, radius, color, fill, lineWidth, stroke) {
    if (typeof stroke == "undefined" ) {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }

    if (typeof lineWidth === "undefined") {
        lineWidth = 5;
      }

    c.beginPath();
    c.strokeStyle = color;
    c.lineWidth = lineWidth;
    c.moveTo(x + radius, y);
    c.lineTo(x + width - radius, y);
    c.quadraticCurveTo(x + width, y, x + width, y + radius);
    c.lineTo(x + width, y + height - radius);
    c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    c.lineTo(x + radius, y + height);
    c.quadraticCurveTo(x, y + height, x, y + height - radius);
    c.lineTo(x, y + radius);
    c.quadraticCurveTo(x, y, x + radius, y);
    c.closePath();
    if (stroke) {
      c.stroke();
    }
    if (fill) {
      c.fillStyle = color;
      c.fill();
    }        
  }

//Helper function to convert hex values to rgb.
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rollDice(){
    moveForward = true;
    diceRolled = true;
    var spacesToMove = getRandomInt(diceValue, 1);
    diceNum = spacesToMove;
    movesLeft = spacesToMove;
    //document.getElementById("diceSpan").innerHTML = "Dice Value: " + spacesToMove;
    movePiece = true;
}

//Move the current player
function movePlayer(){
    
            var currentPosition = gamePlayer[playerTurn].space;
            //console.log(currentPosition);
            var newPosition = currentPosition;

            if (moveForward) {
                if (currentPosition === boardSpace.length-1) {
                    newPosition = 0;
                } else {
                    newPosition++;
                }
            } else {
                if (currentPosition === 0) {
                    newPosition = boardSpace.length-1;
                } else {
                    newPosition--;
                }
            }
            
            //console.log(newPosition);

            var currentSpace = boardSpace[currentPosition];
            //console.log(currentSpace);
            var nextSpace = boardSpace[newPosition];
            //console.log(nextSpace);

            var playerCurX = gamePlayer[playerTurn].startX;
            var playerCurY = gamePlayer[playerTurn].startY

            var playerNextX = nextSpace.startX;
            var playerNextY = nextSpace.startY;

            var moveX = true;
            var moveY = true;

            var moveNextDirection;
            if (moveForward) {
                moveNextDirection = currentSpace.nextDirection;
            } else {
                moveNextDirection = reverseDirection(nextSpace.nextDirection);
            }

            //This will incriment the game piece's x coordinate as it moves across
            //the game board. 
        
            // Check if the X coordinate is the same or not. If it is then we don't move in this direction
            if (playerCurX !== playerNextX ) {
                //Check if the difference between positions is bigger than the movementX variable
                if (Math.abs(playerNextX - playerCurX) > movementX ) {
                    //If east then we add
                    if (moveNextDirection === "E") {
                        gamePlayer[playerTurn].startX = playerCurX+= movementX;
                    } 
                    //If west we subtract to go the other way
                    if (moveNextDirection === "W") {
                        gamePlayer[playerTurn].startX = playerCurX-= movementX;
                    }

                //Since the difference is smaller we should only move that amount to stay centered
                }else{
                    if (moveNextDirection === "E") {
                        gamePlayer[playerTurn].startX = playerCurX+= Math.abs(playerNextX - playerCurX);
                    } 
                    if (moveNextDirection === "W") {
                        gamePlayer[playerTurn].startX = playerCurX-= Math.abs(playerNextX - playerCurX);
                    }
                }
            //If these are the same then don't move anymore. 
            } else {
                moveX = false;
            }

            // Check if the Y coordinate is the same or not. If it is then we don't move in this direction
            if (playerCurY !== playerNextY ) {
                //Check if the difference between positions is bigger than the movementY variable
                if (Math.abs(playerNextY - playerCurY) > movementY ) {
                    //If south then we add
                    if (moveNextDirection === "S") {
                        gamePlayer[playerTurn].startY = playerCurY+= movementY;
                    } 
                    //If north we subtract to go the other way
                    if (moveNextDirection === "N") {
                        gamePlayer[playerTurn].startY = playerCurY-= movementY;
                    }

                //Since the difference is smaller we should only move that amount to stay centered
                } else {
                    if (moveNextDirection === "S") {
                        gamePlayer[playerTurn].startY = playerCurY+= Math.abs(playerNextY - playerCurY);
                    } 
                    if (moveNextDirection === "N") {
                        gamePlayer[playerTurn].startY = playerCurY-= Math.abs(playerNextY - playerCurY);
                    }
                }

            } else {
                moveY = false;
            }

            console.log("X movement is: " + movementX + " Y is " + movementY);

            if(!moveX && !moveY){
                
                gamePlayer[playerTurn].space = newPosition;
                //console.log("Player new position: " + gamePlayer[playerTurn].space);
                movesLeft--;
                console.log(movesLeft);
                
                if (movesLeft === 0) {
                    //reset movement to default to ensure that there are no errors.
                    moveForward = true;
                    movePiece = false;
                    if(diceRolled){
                        gamePlayer[playerTurn].score+=10;  
                    }
                    playerMoved = true;
                    
                } 
            }
       
        //} 

}

//Check the property of the player's current space
function checkSpaceProperty(){
    //if the property is being checked the die has already been rolled. This will prevent this method 
    //from calling itself after it moves the piece based on a card value.
    diceRolled = false;
    var currentSpaceProperty = boardSpace[gamePlayer[playerTurn].space].property
    console.log("Checking Property, value is: " + currentSpaceProperty)
    if(currentSpaceProperty === -1){
        endTurnFlag = true;
        return;
    }

    var cardType;
    var cardDescription;
    var cardMovement;
    var cardId;
    //var playMinigame = false;
    //var minigamePoints = 20;
    console.log(currentSpaceProperty);
    var currentCard;
    
    //The actual method to get the data will go here....
    switch (currentSpaceProperty) {
        case 0: //Cause
            currentCard = cardArray[0];
            cardType = "Cause"
            cardId = getRandomInt(causeMax, 0)
            break;

        case 1: //Prevent
            currentCard = cardArray[1];
            cardType = "Prevent"
            cardId = getRandomInt(preventMax, causeMax+1)
            break;
            
        case 2: //Spread
            currentCard = cardArray[2];
            cardType = "Spread"
            cardId = getRandomInt(spreadMax, preventMax+1)
            break;

        case 3: //Quarantine
            currentCard = cardArray[3];
            cardType = "Quarantine"
            cardId = getRandomInt(quarantineMax, spreadMax+1)
            break;

        case 4: //Minigame
            playMinigame = true;
            return;

        default:
            break;
    }
            lastCardId = currentCard.CardID;
            cardDescription = currentCard.Description;
            cardMovementInt = currentCard.Movement;
            cardMovement = "Move ";
            //If the card is a quarantine card then no movemnt occurs
            //if the value of movement times -1 is positive then the value is negative
            //and therefore the player moves back
            if (cardMovementInt == 0 ){
                console.log("There is no movement.");
                cardMovement = "Lose a turn!"
            } else {
                if ((cardMovementInt * -1) === Math.abs(cardMovementInt)) {
                    console.log("Movement is negative");
                    cardMovement+= "back ";
                    moveForward = false;
                } else {
                    console.log("Movement is positive")
                    cardMovement+= "forward ";
                    moveForward = true;
                }
                cardMovement+= Math.abs(cardMovementInt) + " spaces."
            }

            //********************************************
            alert(gamePlayer[playerTurn].name + " draws a " + cardType + " card." +
            "\n\n" + cardDescription + 
            "\n\n" + cardMovement);

            console.log("Card drawn, movement is " + cardMovementInt);
            
            movesLeft = Math.abs(cardMovementInt);

            if (cardMovementInt == 0) {
                endTurnFlag = true;
            }else{
                movePiece = true;
            }

            //Replace the card we just used
            requestCard(currentSpaceProperty, cardId);
    
}

//Load a minigame
function minigame(){
    alert("Minigame"+
            "\n\n"+gamePlayer[playerTurn].name + " plays a minigame and wins " +
            minigamePoints + "!");
            gamePlayer[playerTurn].score+=minigamePoints;
            //updateScore();
            endTurn();

}

//End the players turn. 
function endTurn(){
    endTurnFlag = false;
    saveGameData();
    //If the player has won, end the game , or set up for the next turn.
            if (playerWins()) {
                console.log("player wins");
                //Did the player win?
                gameOver = true;
                alert(gamePlayer[playerTurn].name + " wins!");
                //document.getElementById("moveButton").innerHTML = "New Game";
                //document.getElementById("moveButton").disabled = false; 
                canClickRoll = true;
            } else {
                console.log("no winner yet");
                playerTurn++
                if (playerTurn >= gamePlayer.length) {
                    playerTurn = 0;
                }
                
                alert(gamePlayer[playerTurn].name + "'s turn.");
                
                //If the next player is the computer then roll the dice for them.
                if (gamePlayer[playerTurn].isHuman) {
                    //player is human they should control
                    //document.getElementById("moveButton").disabled = false; 
                    canClickRoll =true;
                } else {
                    //player is bot, automate
                    rollDice();
                }

            }
        //Save game

        
}

//Send game data to the database
function saveGameData(){
            
        //make database request for saved data like space,cardid,dice,score,playernumber
        var xmlhttp = new XMLHttpRequest();
        

        var gameInfo = {"Dice": diceNum,
            "Score": gamePlayer[playerTurn].score,
            "Space": gamePlayer[playerTurn].space,
            "PlayerNumber":playerTurn,
            "CardID": lastCardId,
            "TotalPlayers": totalPlayers};
        console.log(gameInfo);
        var dbParam = JSON.stringify(gameInfo);
        xmlhttp.onreadystatechange = function() {
           if(this.readyState == 4 && this.status == 200)
           {
              console.log(this.responseText);
           }
        };

        xmlhttp.open("POST","game/savedGameData.php?", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("Obj=" + dbParam);
          
        
}

//#endregion 

//#region *** Helper Functions ***

//Request a card from the database
function requestCard(cardParam, cardId){
    //Make database request for the cards
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //When the request is successfuly completed do this:
            res = this.responseText;
            console.log("PHP response: " + res);
            cardArray [cardParam] = JSON.parse(res);
            //console.log(cardArray [cardParam]);
        }
    };

    //Send the request
    console.log("Requested Card: " + cardId );
    xmlhttp.open("GET", "game/getCard.php?cardid=" + cardId, true);
    xmlhttp.send();
    

}

//Check if the player has met the win condition
function playerWins(){
    if (gamePlayer[playerTurn].score >= winningScore) {
        return true;
    } else {
        return false;
    }
}

function getHCenter(xPosNum, widthNum){
    return xPosNum + widthNum/2;
}

function getVCenter(yPosNum, heightNum){
    return yPosNum + heightNum/2;
}

//Gets the coordinate for the center of the square
function getHCorner(xPosNum, widthNum){
    return xPosNum - widthNum/2;
}

function getVCorner(yPosNum, heightNum){
    return yPosNum - heightNum/2;
}

function getRandomInt(max, min) {
    //Math.random always generates a number start with 0, use min to offset the value.
    return Math.floor(Math.random() * Math.floor((max - min))) + min;
}

function reverseDirection(currentDirection){
    var reversedDirection = "";
    switch (currentDirection) {
        case "N":
            reversedDirection = "S"    
            break;
    
        case "E":
            reversedDirection = "W"    
            break;

        case "S":
            reversedDirection = "N"    
            break;

        case "W":
            reversedDirection = "E"    
            break;

    }
    return reversedDirection;
}

//#endregion

//Initialize
newGame();
//Start the game
main();
