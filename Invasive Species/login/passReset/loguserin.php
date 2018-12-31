<?php
session_start();
?>
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
 
// Get password from db
$sql="SELECT * FROM user WHERE username = '$name' AND password = '$pass' ";
$result = mysqli_query($link,$sql);
$check = mysqli_fetch_array($result);
if(isset($check)){
    // Close connection
    mysqli_close($link);
    //setCookie(user, "'$name'", time() + (86400 * 30)); 
    //setCookie(admin, "'$admin'", time() + (86400 * 30));
    //forget about cookies. Let's try sessions.
    session_start();
    $_SESSION["user"] = $name;
    //$_SESSION["educator"] = $admin;
    //echo session_id() . "    ";
    echo '<script type="text/javascript">window.location.href="loggedin.php";</script>';
    }else{
    // Close connection
    mysqli_close($link);
    echo '<script type="text/javascript">window.location.href="tryagain.php";</script>';
    

    }

?>