<?php
session_start();
/* Attempt MySQL server connection.*/
$link = mysqli_connect("localhost", "p_f18_3", "ygtaqf", "p_f18_3_db");
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
 

// Attempt delete query execution
$x=$_SESSION["delete"];
$sql = "DELETE FROM card WHERE cardid='$x'" ;
if(mysqli_query($link, $sql)){
    //if the card is successfully removed from the database, the session varaible delete is set to null,
    //and the user is redirected to a page that gives them a successful deletion method
    $_SESSION["delete"]=null;
    mysqli_close($link);
    echo '<script type="text/javascript">window.location.href="cardDeleted.php";</script>';
} else{
    //if the card is not removed, then an error message is produced
    mysqli_close($link);
    echo "Error with input";
}
?>