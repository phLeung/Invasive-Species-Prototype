/*canvas variable allows modification of the canvas object
in HTML. This will mainly be used to set the height/width
and create the context variable*/
var canvas = document.querySelector('canvas');
canvas.width = 1200;
canvas.height = 787;

/*c is the context variable. This is used to interact with 
the canvas element and draw within it.*/
var c = canvas.getContext("2d");

//Array of board spaces
var boardSpace = [];
var gamePlayer = [];

var playerTurn = 0;
var totalPlayers = 2; //temp value
var diceValue = 6; //Max Value of the die
var movesLeft = 0;

//Variables for all the components of the board
const boardX = 150;
const boardY = 150;
const boardSpaceWidth = 100;
const boardSpaceHeight = 100;
const boardSpacesH = 10;
const boardSpacesV = 5;
const direction = "E";
const boardSpaceColor = "white";
const boardSpaceBorderColor = "black";
const boardSpaceBorderWidth = 3;
const boardSpaceLetterColor = "black";

//What if it was a circle
const boardSpaceCircleBorderWidth = 3;
const boardSpaceCircleRadius = 45;
//0 to Math.PI * 2 gives us a radian that will create a circle
const boardSpaceCircleStartAngle = 0;
const boardSpaceCircleEndAngle = Math.PI * 2;

//Arrays with locations of each card
const causeArray = [1,7,13,21,26]; //Prop 0 
const spreadArray = [3,11,14,22]; //Prop 1
const preventArray = [2,15,19,25]; //Prop 2
const quarantineArray = [4,10,17,24]; //Prop 3
const minigameArray = [5,9,12,18,23]; //Prop 4


/*Variables for the game piece. The piece will always be
created in the center of the first board squar e. */
const gamePieceX = boardX;
const gamePieceY = boardY;
const gamePieceColor = ["#9d46ff","red"];
const gamePieceBorderColor = ["#0a00b6","darkred"];
const gamePieceName = ["Player One","Player Two"];
const areYouHuman = [true, false];
const gamePieceBorderWidth = 6;
const gamePieceRadius = 20;
//0 to Math.PI * 2 gives us a radian that will create a circle
const gamePieceStartAngle = 0;
const gamePieceEndAngle = Math.PI * 2;
var moveForward = true;
var diceRolled = false;
//At the moment this only works right if the value is a 
//factor of the BoardSpaceWidth
const movementX = 5;
const movementY = 5;

//Flag used to prevent an endless refresh for the animation
var runAnimation = false;

//Cards are indexed in order use these to generate values:
var causeMax = 10;
var preventMax = 20;
var spreadMax = 30;
var quarantineMax = 35;

//Win condition
const winningScore = 100;
var gameOver = false;

//need diceNumber rolled
var diceNum = 0;

//Start the game
newGame();

//Functions
//---------------------------------------------------------------------
//Listener for the move button
document.getElementById("moveButton").addEventListener("click", function(){
    if (gameOver){
        newGame()
    } else {
        document.getElementById("moveButton").disabled = true;
        rollDice();
    }
    
});

function rollDice(){
    moveForward = true;
    diceRolled = true;
    var spacesToMove = getRandomInt(diceValue, 1);
    diceNum = spacesToMove;
    movesLeft = spacesToMove;
    moveGamePiece(spacesToMove);
}

function newGame(){
    console.log("Starting a new game");
    //Set the button text
    document.getElementById("moveButton").innerHTML = "Roll the dice!";
    document.getElementById("diceSpan").innerHTML = "Dice Value: " + 0;
    playerTurn = 0;


    //Game is no longer over
    gameOver = false;

    //Calls the function to draw the board using global variables
    drawBoard(boardX, boardY, boardSpaceWidth, boardSpaceHeight, boardSpacesH,
        boardSpacesV, direction, boardSpaceColor, boardSpaceBorderColor, 
        boardSpaceBorderWidth, boardSpaceLetterColor);

    //Creates the array of players
    createPlayers(gamePieceName, totalPlayers, gamePieceX, gamePieceY, 
        gamePieceColor, gamePieceBorderColor, areYouHuman);

    //Set the score
        updateScore();

    //Calls the function to draw the game piece
        drawGamePiece(gamePieceRadius, gamePieceStartAngle, gamePieceEndAngle, gamePieceBorderWidth);
    
}

//Draws the game board. This will be necessary every time something is animated.
function drawBoard(boardXNumber, boardYNumber, boardSpaceWidthNumber, 
    boardSpaceHeightNumber, boardSpacesHNumber, boardSpacesVNumber, directionValue,
    boardSpaceColorValue, boardSpaceBorderColorValue, boardSpaceBorderWidthNumber, 
    boardSpaceLetterColorValue ){

    //We set the array to 0 to clear it. This will update all references to the array as well.
    //boardSpace.length = [] is not correct because the array is referenced elsewhere.
    boardSpace.length = 0;

    var originX = boardXNumber;
    var originY = boardYNumber; 

    var keepDrawing = true;
    var spaceProperty;
    var letterValue;

    base_image = new Image();
    base_image.src = 'images/map.jpg';
    c.drawImage(base_image, 0, 0);
    
    

    do{

        //console.log("lets DO this");
        //console.log("X Coordinate: " + boardXPos);
        //console.log("Y Coordinate: " + boardYPos);
        
        /*
        //Creates the square
        c.fillStyle = boardSpaceColorValue;

        c.fillRect(getHCorner(boardXNumber, boardSpaceWidthNumber), 
        getVCorner(boardYNumber, boardSpaceHeightNumber), 
        boardSpaceWidthNumber, boardSpaceHeightNumber);
*/

        //What if it was a circle instead
        c.beginPath();
        c.lineWidth = boardSpaceCircleBorderWidth;
        c.arc(boardXNumber, boardYNumber, boardSpaceCircleRadius, 
        boardSpaceCircleStartAngle, boardSpaceCircleEndAngle, false);
        c.strokeStyle = boardSpaceBorderColorValue;
        c.fillStyle = boardSpaceColorValue;
        c.stroke();
        c.fill();   

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
            //console.log("Writing " + letterValue);
            c.fillStyle = boardSpaceLetterColorValue;
            c.font = "30px Arial";
            c.fillText(letterValue, boardXNumber - 12, boardYNumber + 10);
        }
/*
        //Creates the border for the square
        c.beginPath();
        c.strokeStyle = boardSpaceBorderColorValue;
        c.lineWidth = boardSpaceBorderWidthNumber;
        c.rect(getHCorner(boardXNumber, boardSpaceWidthNumber), 
        getVCorner(boardYNumber, boardSpaceHeightNumber),
        boardSpaceWidthNumber, boardSpaceHeightNumber);
        c.stroke();*/

        //Change direction so we draw a rectangle.
        if (boardXNumber === originX + (boardSpaceWidthNumber * (boardSpacesHNumber-1)) && directionValue === "E"){
            directionValue = "S";
        } 

        if (boardYNumber === originY + (boardSpaceHeightNumber * (boardSpacesVNumber-1)) && directionValue === "S"){
            directionValue = "W";
        } 

        if (boardXNumber === originX && directionValue === "W"){
            directionValue = "N";
        } 

        if (boardYNumber === originY && directionValue === "N"){
            directionValue = "E";
        } 

        //Creates the object for space to be referenced later
        var space = {
            height: boardSpaceHeightNumber,
            width: boardSpaceWidthNumber,
            startX: boardXNumber,
            startY: boardYNumber,
            property: spaceProperty,
            nextDirection: directionValue
        };

        //Add the boardSpace to the array for later use
        boardSpace.push(space);

        //console.log(space);


        switch(directionValue){
            case "E":
                console.log
                boardXNumber += boardSpaceWidthNumber;
                break;
            
            case "S":
                boardYNumber += boardSpaceHeightNumber;
                break;

            case "W":
                boardXNumber -= boardSpaceWidthNumber;
                break;

            case "N":
                boardYNumber -= boardSpaceHeightNumber;
                break;

        }
    
    
        //console.log("We did it");
        
        if (boardXNumber === originX && boardYNumber === originY){
            //console.log("X and Y are at the begining, the board is complete.");
            keepDrawing = false;
        }
    }
    while( keepDrawing);

    //console.log("Board complete. Squares drawn: " + boardSpace.length);


    
}

//Populates the player array with player objects
function createPlayers(nameValue, totalPlayers, xCoordinate, yCoordinate, 
    pieceColor, pieceBorderColor, areYouHumanValue){

    //We set the array to 0 to clear it. This will update all references to the array as well.
    //gamePlayer.length = [] is not correct because the array is referenced elsewhere.
    gamePlayer.length = 0;

    for (let index = 0; index < totalPlayers; index++) {
        //Creates the player object with various atrributes
         var player = {
            name: nameValue[index],
            score: 0,
            space: 0,
            previousPosition: 0,
            startX: xCoordinate,
            startY: yCoordinate,
            color: pieceColor[index],
            colorBorder: pieceBorderColor[index],
            isHuman: areYouHumanValue[index]
        };

        //Push the player on to the array
        gamePlayer.push(player); 
    }
    
}

//Draw the game piece
function drawGamePiece(gamePieceRadiusNumber, gamePieceStartAngleNumber, gamePieceEndAngleNumber,
    gamePieceBorderWidthNumber){

    for (let index = 0; index < gamePlayer.length; index++) {
        var gamePieceXNumber = gamePlayer[index].startX;
        var gamePieceYNumber = gamePlayer[index].startY;
        var gamePieceColorNumber = gamePlayer[index].color;
        var gamePieceBorderColorNumber = gamePlayer[index].colorBorder;

        //Create the game piece
        c.beginPath();
        c.lineWidth = gamePieceBorderWidthNumber;
        c.arc(gamePieceXNumber, gamePieceYNumber, gamePieceRadiusNumber, 
        gamePieceStartAngleNumber, gamePieceEndAngleNumber, false);
        c.strokeStyle = gamePieceBorderColorNumber;
        c.fillStyle = gamePieceColorNumber;
        c.stroke();
        c.fill();    
            
    }

    //console.log("Game pieces drawn. Players: " + gamePlayer.length);
}

//Move the game piece; the player turn begins
function moveGamePiece(movementValue){
    console.log("Movement Value: " + movementValue)

    if (diceRolled) {
        document.getElementById("diceSpan").innerHTML = "Dice Value: " + movementValue;
    }
    
    if (movesLeft !== 0){
        runAnimation = true;
        animateMovement();
    }

    


}

function animateMovement(){
    
        //Flag to prevent this function from endlessly calling itself.
        if (runAnimation == true){
            
            //Causes the canvas tag to refresh allowing for the illusion
            //of movement
            requestAnimationFrame(animateMovement);
            //console.log("Are we there yet?"); //Well, are we?
        
            //Clears the entire board so that the game piece can look like its
            //moving. Otherwise the piece will just be drawn repeatedly on itself
            c.clearRect(0, 0, innerWidth, innerHeight)

            //The board needs to be drawn again. 
            drawBoard(boardX, boardY, boardSpaceWidth, boardSpaceHeight, boardSpacesH, boardSpacesV,
            direction, boardSpaceColor, boardSpaceBorderColor, boardSpaceBorderWidth,
            boardSpaceLetterColor);


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

            //redraw the game pieces, with the current one changing it's position
            drawGamePiece(gamePieceRadius, gamePieceStartAngle, gamePieceEndAngle, gamePieceBorderWidth);

            
            if(moveX || moveY){
                //console.log("X Movement: " + moveX + " Y Movement: " + moveY);
                //console.log("X Pos: " + gamePlayer[playerTurn].startX);
                //console.log("Y Pos: " + gamePlayer[playerTurn].startY);
            }else{
                //stop the function from being run
                
                //console.log("We're there!");
                //Double check to see that this is done correctly
                //console.log("X Pos: " + gamePlayer[playerTurn].startX);
                //console.log("Y Pos: " + gamePlayer[playerTurn].startY);
                gamePlayer[playerTurn].space = newPosition;
                //console.log("Player new position: " + gamePlayer[playerTurn].space);
                movesLeft--;
                console.log(movesLeft);
                
                if (movesLeft === 0) {
                    //reset movement to default to ensure that there are no errors.
                    moveForward = true;
                    runAnimation = false;
                    endTurn();
                    
                } else {
                    //console.log("Not done yet")
                }
            }
       
        } 

}

//Determine if the turn is over or not
function endTurn(){
    //We only check the card property if the played roll the die. 
        //Players only draw cards/minigames and get scored for moves if they 
        //rolled the die.
        if (diceRolled) {
            gamePlayer[playerTurn].score+=10;
            updateScore();
            diceRolled = false;
            checkSpaceProperty();
        } else {
            if (playerWins()) {
                console.log("player wins");
                //Did the player win?
                gameOver = true;
                alert(gamePlayer[playerTurn].name + " wins!");
                document.getElementById("moveButton").innerHTML = "New Game";
                document.getElementById("moveButton").disabled = false; 
            } else {
                console.log("no winner yet");
                playerTurn++
                if (playerTurn >= gamePlayer.length) {
                    playerTurn = 0;
                }
                
                alert(gamePlayer[playerTurn].name + "'s turn.");
                
                if (gamePlayer[playerTurn].isHuman) {
                    //player is human they should control
                    document.getElementById("moveButton").disabled = false; 
                } else {
                    //player is bot, automate
                    rollDice();
                }

            }
            
                    
            
        }

        
}

function checkSpaceProperty(){
    //if the property is being checked the die has already been rolled. This will prevent this method 
    //from calling itself after it moves the piece based on a card value.
    diceRolled = false;
    var currentSpaceProperty = boardSpace[gamePlayer[playerTurn].space].property
    console.log("Checking Property, value is: " + currentSpaceProperty)
    if(currentSpaceProperty === -1){
        endTurn();
        return;
    }

    var cardType;
    var cardDescription;
    var cardMovement;
    var cardId;
    var playMinigame = false;
    var minigamePoints = 20;
    console.log(currentSpaceProperty);
    
    
    //The actual method to get the data will go here....
    switch (currentSpaceProperty) {
        case 0: //Cause
            cardType = "Cause"
            cardId = getRandomInt(causeMax, 0)
            break;

        case 1: //Prevent
            cardType = "Prevent"
            cardId = getRandomInt(preventMax, causeMax+1)
            break;

            
        case 2: //Spread
            cardType = "Spread"
            cardId = getRandomInt(spreadMax, preventMax+1)
            break;

        case 3: //Quarantine
            cardType = "Quarantine"
            cardId = getRandomInt(quarantineMax, spreadMax+1)
            break;

        case 4: //Minigame
            playMinigame = true;
    
        default:
            break;
    }



    if (playMinigame) {
        alert("Minigame"+
            "\n\n"+gamePlayer[playerTurn].name + " plays a minigame and wins " +
            minigamePoints + "!");
            gamePlayer[playerTurn].score+=minigamePoints;
            updateScore();
            endTurn();
        
    } else {

        //Make database request for the cards
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //When the request is successfuly completed do this:
            res = this.responseText;
            //console.log("PHP response: " + res);
            var myObj = JSON.parse(res);
            console.log(myObj);

            cardDescription = myObj.Description;
            cardMovementInt = myObj.Movement;
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
                endTurn();
            }else{
                moveGamePiece();
            }
            
            }
            //************************************************************
        };

        //Send the request
        console.log("Requested Card: " + cardId );
        xmlhttp.open("GET", "turn.php?cardid=" + cardId, true);
        xmlhttp.send();


        /*
        //make database request for saved data like space,cardid,dice,score,playernumber
        var xmlhttp2 = new XMLHttpRequest();
        var players = gamePlayer.length;
        var score = gamePlayer[playerTurn].score;
        var space = gamePlayer[playerTurn].space;
        var playerNumber = gamePlayer[playerTurn].name;
        var cardID = cardId;
        var jsonObj = {"Dice": diceNum,"Score":score,"Space":space,
                       "PlayerNumber":playerNumber,"CardID":cardID,"TotalPlayers": players};
        var dbParam2 = JSON.stringify(jsonObj);
        xmlhttp2.onreadystatechange = function() {
           if(this.readyState == 4 && this.status == 200)
           {
              alert(this.responseText);
           }
        };
        xmlhttp2.open("GET","savedGameData.php?Obj=" + dbParam2,true);
        xmlhttp2.send();
          
        */

        
        
    }
}

function playerWins(){
    if (gamePlayer[playerTurn].score >= winningScore) {
        return true;
    } else {
        return false;
    }
}

//Gets the coordinate for the center of the square
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

function updateScore(){
    for (let i = 0; i < gamePlayer.length; i++) {
        document.getElementById("scoreSpan" + i).innerHTML = gamePlayer[i].name 
        + ": " + gamePlayer[i].score + " Points";
    }
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

