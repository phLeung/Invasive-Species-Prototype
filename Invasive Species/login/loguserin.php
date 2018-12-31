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
$pass = $_REQUEST['password'];
 
// Get password from db
$sql="SELECT password FROM user WHERE username = '$name' AND password = '$pass' ";
$result = mysqli_query($link,$sql);
$check = mysqli_fetch_array($result);

//if the username and password combination exist, 
//stores the user's name in a session variable and redirects to the successfully logged in page
if(isset($check)){
    // Close connection
    mysqli_close($link);
    session_start();
    $_SESSION["user"] = $name;
    //sets other user information as session varaiables
    echo '<script type="text/javascript">window.location.href="loggedin.php";</script>';

//if the username and password combination don't exist, 
//it redirects the users to a try again page where they can enter a new username and password combination
    }else{
    // Close connection
    mysqli_close($link);
    echo '<script type="text/javascript">window.location.href="tryagain.php";</script>';
    

    }

?>