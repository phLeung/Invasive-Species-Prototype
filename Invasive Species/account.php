<!DOCTYPE html>
<html lang="en">
<head>
    <title>The Invaders: Home</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="style.css" rel="stylesheet" type="text/css">
    <style>
        .centered{
            text-align:center;
            margin:auto;
            margin-top:30px;
            margin-bottom:30px;
        }
        .inner {
            display:inline-block;
        }
    </style>
</head>

<body>

    <!-- Header -->
    <?php include 'header.php';?>
       
    <!-- Displays user info and greeting -->
    <!-- Content -->
    <div class="centered">
        <div class="inner">
        <h1 style="font-family:Coustard">Hello, <?php echo $_SESSION['user']?>!</h1>
        <br>
        <br>
    <!-- Displays the avatar that the user choose when logging on -->
    <?php
        if($_SESSION["avatar"] == "1"){
            echo "<img src='images\p1.png' alt='avatar'>";
        }
        if($_SESSION["avatar"] == "2"){
            echo "<img src='images\p2.png' alt='avatar'>";
        }
        if($_SESSION["avatar"] == "3"){
            echo "<img src='images\p3.png' alt='avatar'>";
        }
        if($_SESSION["avatar"] == "4"){
            echo "<img src='images\p4.png' alt='avatar'>";
        }
    ?>



        <img src="images\p1.png" alt="avatar">
        <br>
        <br>
        <h2 style="font-family: 'Abel', serif;">Welcome to your account</h2>
        <a type="button" class="btn btn-primary btn-success" href="logout.php">Log Out</a>
        </div>
     </div>
</body>
</html>