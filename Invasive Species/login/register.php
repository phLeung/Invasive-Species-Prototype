<?php
 session_start();
/* Attempt MySQL server connection.*/
$link = mysqli_connect("localhost", "p_f18_3", "ygtaqf", "p_f18_3_db");
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
 
//Escape user inputs for security (inputs of the password type were not escaped because it caused errors)
$pass = $_REQUEST['password'];
$name = mysqli_real_escape_string($link, $_REQUEST['username']);
$avatar = $_REQUEST['pic'];
$code = $_REQUEST['adminCode'];
$secQuestion = mysqli_real_escape_string($link, $_REQUEST['security']);
$secAnswer =  $_REQUEST['answer'];
$admin = false;

//if the admin code is correct, the user is set as an educator/admin

if($code == "1234"){
    $admin = "true";
}

 // Attempt insert query execution
$sql = "INSERT INTO user VALUES ('$name', '$pass', null, null, null, '$avatar', '$admin', '$secQuestion', '$secAnswer')";

//If a new user has successfully been added to the table, 
//then it stores user's info as session varaibles and redirects user to a welcome message
if(mysqli_query($link, $sql)){
    $_SESSION["user"] = $name;
    $_SESSION["question"] = $secQuestion;
    $_SESSION["educator"] = $admin;
    mysqli_close($link);
    echo '<script type="text/javascript">window.location.href="newaccount.php";</script>';

//If a new user hasn't been added to the table, something was most likely wrong with the inputs,
//so it redirects the user to a try agian page where they can fill out the register form again
}else{
    // Close connection
    mysqli_close($link);
    echo '<script type="text/javascript">window.location.href="tryagainreg.php";</script>';
}
?>
