<!DOCTYPE html>
<html lang="en">
<head>
    <title>The Invaders: Game</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="style.css" rel="stylesheet" type="text/css">
    <style type="text/css">
        
            canvas {
                border: 1px solid black;
                background: #001f94;
                margin: auto;
                display:block;
                margin-top:30px;
                margin-bottom: 30px;
            }

            body{
                margin: 0px;
            }

            button{
                font-family: Arial, Helvetica, sans-serif;
                font-size: 20px;
                margin: 10px;
                padding: 10px;
                height: 50px;
                
                
            }

            span{
                font-family: Arial, Helvetica, sans-serif;
                font-size: 20px;
                padding-left: 40px;
            }
        </style>
</head>

<body>
	<!-- This statement includes the header file and adds it's contents to the page when the server renders it. -->
    <!-- Header -->
    <?php include 'header.php';?>
    
    <!--
        <div>
       <-- <button id="moveButton">Roll the dice!</button>
        <span id = "diceSpan">Dice Value: 0</span>
        <span id= "scoreSpan0"></span>
        <span id= "scoreSpan1"></span>
        <span id= "scoreSpan2"></span>
        <span id= "scoreSpan3"></span>--

    </div>
    -->

            
    <div class="game" id="gameArea" >
            
        

        <!--Canvas is my new favorite thing in the whole 
        world. This is where the game board will render.-->
        <canvas> </canvas>
        <!--This script tag needs to load after the canvas
        tag or it breaks.-->
        <script src="game/canvas.js"></script>

    </div>
    
    

</body>
</html>