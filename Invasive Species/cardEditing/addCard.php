<?php
/* Attempt MySQL server connection.*/
$link = mysqli_connect("localhost", "p_f18_3", "ygtaqf", "p_f18_3_db");
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
 
// Escape user inputs for security
$des = mysqli_real_escape_string($link, $_REQUEST['des']);
$type = mysqli_real_escape_string($link, $_REQUEST['type']);
$move = $_REQUEST['move'];

// Attempt insert query execution
$sql = "INSERT INTO card VALUES (default, '$des', '$type', '$move')";
if(mysqli_query($link, $sql)){
    //if card has been inserted, close connection and  redirect to confirmation page
    mysqli_close($link);
    echo '<script type="text/javascript">window.location.href="../editCards.php";</script>';
} else{
    //if card has not been inserted, close connection and give an error message
    mysqli_close($link);
    echo "Error with input";
}
?>