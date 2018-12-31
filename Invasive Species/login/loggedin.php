<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>The Invaders: Home</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="../style.css" rel="stylesheet" type="text/css">
</head>

<body>
    <!-- Header -->
    <?php include 'headerSub.php';?>
    
    <!-- Displays welcome message to user-->
    <!-- Content -->
    <div  style="text-align:center; margin:40px">
        <h2 style="font-family:Coustard">Welcome back!</h2>
        <p style="font-family: 'Abel', serif;">You've successfully logged on!</p>
     </div>
</body>
</html>