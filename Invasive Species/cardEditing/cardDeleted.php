<!DOCTYPE html>
<html lang="en">
<head>
    <title>The Invaders: Cards</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="../style.css" rel="stylesheet" type="text/css">
   
    
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

</head>

<body>

    <!-- Header -->
    <?php include 'headerSub.php';?>
    <?php include 'cardInfo.php';?>

    
        
        
        <!-- Confirmation Message -->
    <div class="row">
        <div class="col">
        <h2>Card successfully deleted.</h2>
    </div>
    </div>

       
    <!-- Content -->
    <?php 
    //creates an array that holds all of the card objects (which were stored as a session varaible)
    $array = json_decode($_SESSION["cards"], true);
    $x=0;
    //goes through the array and displays them three per row, with text overlaying the appropiate background image
    foreach($array as $item) {
        if($x % 3 == 0){
                echo "<div class='row'>";
        }
        echo "<div class='col-md-4'>";
        echo "<div class='card bg-dark text-white'>";
        if($item['Type'] == 'cause'){
                echo "<img class='card-img' src='../images/causeCard.jpg' alt='Card image'>";
        }
        if($item['Type'] == 'spread'){
                echo "<img class='card-img' src='../images/spreadCard.jpg' alt='Card image'>";
        }
        if($item['Type'] == 'prevent'){
                echo "<img class='card-img' src='../images/preventCard.jpg' alt='Card image'>";
        }
        if($item['Type'] == 'quarantine'){
                echo "<img class='card-img' src='../images/quarantineCard.jpg' alt='Card image'>";
        }
        echo "<div class='card-img-overlay'>";
        echo "<br>";
        echo "<h4 class='card-title'> </h4>";
        echo "<br>";
        echo "<h5> Card ID: ";
        echo $item['CardID'];
        echo "</h5>";
        echo "<p class='card-text'>";
        echo $item['Description'];
        echo "</p>";
        echo "<p class='card-text' class='move'>Move ";
        echo $item['Movement'];
        echo " spaces</p>";
        echo "<br>";
     
     echo "</div>";
     echo "</div>";
     echo "</div>";
     if($x % 3 == 2){
             echo "</div>";
             echo "<br>";
     }
     $x = $x +1;
        }
    ?>
    <div class="row justify-content-start">

<!--form to add a card -->
<div class="addCard col col-md-6">
        <br>
        <h1 style="background-color: #f1f1f1">Add a Card</h1>
        <br>
        <form action="addCard.php" method="post">
            <!--Descript-->
            <label for="des">Card text: </label>
            <input style= "background-color: white" type="text" placeholder="Enter Card Text" name="des" required>
            <br>
    <br>
            <!--Type-->
            <label for="type">Type: </label>
            <input style= "background-color: white" type="text" placeholder="cause, spread, prevent" name="type" required>
            <br>
    <br>
            <!--Movement-->
            <label for="move">Movement:  </label>
            <input style="background-color: white" type="number" placeholder="Enter Movement" name="move" required>
            <br />
    <br>
            <button type="submit" class="btn btn-primary" id="add">Add Card</button>
        </form>
    </div>
    <br>
    
    <!--form to delete a card -->
<div class = "deleteCard col col-md-6">
<br>
        <h1 style="background-color: #f1f1f1">Delete a Card</h1>
        <br>
        <form action="confirmDelete1.php" method="post">
            <label for="del">Enter the ID of the card you wish to delete. </label>
            <input style= "background-color: white" type="number" placeholder="Enter Card ID" name="del" required>
            <br>
            <br>
            <button type="submit" class="btn btn-primary" id="delete">Delete Card</button>
        </form>

</div>
</div>
</body>
</html>