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
 $_SESSION['tempName'] = $name; 
// Get password from db
$sql="SELECT security_question FROM user WHERE username = '$name'";
$result = mysqli_query($link,$sql);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
if(isset($row)){ 
      $_SESSION['question'] = $row['security_question'];
     
      echo '<script type="text/javascript">window.location.href="forgotpassword2.php";</script>';
} else {
    echo '<script type="text/javascript">window.location.href="wrongusername.php";</script>';
}

      
    
    
?>