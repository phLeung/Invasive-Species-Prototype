<?php
/* Attempt MySQL server connection.*/
$link = mysqli_connect("localhost", "p_f18_3", "ygtaqf", "p_f18_3_db");
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
 
// Escape user inputs for security
$name = mysqli_real_escape_string($link, $_REQUEST['username']);
$pass = mysqli_real_escape_string($link, $_REQUEST['password']);
$avatar =mysqli_real_escape_string($link, $_REQUEST['pic']);
$code = mysqli_real_escape_string($link, $_REQUEST['adminCode']);
$secQuestion = mysqli_real_escape_string($link, $_REQUEST['security']);
$secAnswer = mysqli_real_escape_string($link, $_REQUEST['answer']);
$admin = false;

//if the admin code is correct, the user is set as an 
$admin = "false"
if($code == "1234"){
    $admin = "true";
}

 // Attempt insert query execution
$sql = "INSERT INTO user VALUES ('$name', '$pass', null, null, null, '$avatar', '$admin', '$secQuestion', '$secAnswer')";
if(mysqli_query($link, $sql)){
    //echo "Records added successfully.";
    session_start();
    $_SESSION["user"] = $name;
    $_SESSION["question"] = $secQuestion;
    $_SESSION["educator"] = $admin;
    mysqli_close($link);
    echo '<script type="text/javascript">window.location.href="newaccount.php";</script>';
}else{
    // Close connection
    mysqli_close($link);
    echo '<script type="text/javascript">window.location.href="tryagainreg.php";</script>';
}
?>