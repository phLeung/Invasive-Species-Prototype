<?php
   session_start();
?>
<?php
//connect to MySQL server
$link = mysqli_connect("localhost", "p_f18_3","ygtaqf", "p_f18_3_db");

//Check for connection
if($link === false)
{
   die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Escape user inputs for security
$new = $_REQUEST['newpassword'];
$confirm = $_REQUEST['confirm'];
$username = $_SESSION['tempName'];
//update or alter the password for the user
if($new === $confirm)//new password and confirmed match
{
   $sql = "UPDATE user SET password='$new' WHERE username='$username'";
}
else
{
  mysqli_close($link);
  echo '<script type="text/javascript">window.location.href="setPwagain.php";</script>';

}
if(mysqli_query($link,$sql))
{
  mysqli_close($link);
  echo '<script type="text/javascript">window.location.href="NewPasswordSet.php";</script>';

}
else
{
   mysqli_close($link);
   echo "Error: " . mysqli_error($link);
}

?>
