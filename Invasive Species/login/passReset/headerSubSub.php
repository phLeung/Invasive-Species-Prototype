<?php
session_start();

?>

<!-- Meta -->
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link href='https://fonts.googleapis.com/css?family=Abel' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=Cutive' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=Coustard' rel='stylesheet'>

<!-- Header -->
<header style="padding:.5em 1em; color:white; background-color:black;">
    <img style="padding-bottom:30px" src="../../images/eyes.jpg" alt="eyes">
    <span style="font-family: 'Cutive', sans-serif; font-size:48px; color:white; padding-left:20px;">The Invaders</span>
</header>

    <!-- The navigation menu -->
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top" style="background-color:#008000; padding:0">
    <!-- Navbar content -->
    <div style="font-family:Cutive; font-size:20px" class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <!--Home-->
            <li class="nav-item active">
                <a class="nav-link" href="../../index.php">Home</a>
            </li>
            <!--Learn-->
            <li class="nav-item dropdown active" style="padding-right:10px;">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Invasives
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="padding:0">
                <a style="color:black" class="dropdown-item" href="../../learn.php">Learn</a>
                <a style="color:black" class="dropdown-item" href="../../flashcards.php">Review</a>
                <a style="color:black" class="dropdown-item" href="../../examples.php">Examples</a>
                <a style="color:black" class="dropdown-item" href="https://www.lhprism.org/resources">More Info</a>
                </div>
            </li>
            <!--Game-->
            <li class="nav-item dropdown active" style="padding-right:10px">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Game
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="padding:0">
                <a style="color:black" class="dropdown-item" href="../../game.php">Play Now!</a>
                <a style="color:black" class="dropdown-item" href="../../rules.php">How to Play</a>
                <?php
                if (isset($_SESSION["educator"]) && $_SESSION["educator"] === "true"){
                    echo "<a style='color:black' class='dropdown-item' href='../../editCards.php'>Cards</a>";
                }
                ?>
                </div>
            </li>
            <!--Trivia-->
            <li class="nav-item active">
                <a class="nav-link" href="../../trivia.php">Trivia</a>
            </li>
        </ul>
        <!--User-->
        <form class="form-inline my-2 my-lg-0">
            <div style="margin-right:2px" id="greeting">
            <?php
                if (!isset($_SESSION["user"])){
                    echo "<a class='nav-link active' style='color:white' href='../../signup.php' >Sign Up/Log In";
                        
                }else{
                    echo "<a href='../../account.php' style='color:white' class='nav-link active'>Hello, ". $_SESSION["user"] . "!";
                }
            ?>
            </a></div>
        </form>
    </div>
    </nav>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>