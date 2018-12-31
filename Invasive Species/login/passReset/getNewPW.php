<?php
session_start();
?>
<?php
  include('connection.php');
  //remember $conn is the connection variable
  //Escape user inputs for security
  $answer = $_REQUEST['answer'];
  $username = $_SESSION['tempName'];
  // get security answer
  $query = "SELECT security_answer FROM user WHERE username = '$username' AND security_answer = '$answer' ";
  $result = mysqli_query($conn,$query);
  $check = mysqli_fetch_array($result);
  if(isset($check))
  {
     mysqli_close($conn);
     echo '<script type="text/javascript">window.location.href="setNewPW.php";</script>';
           
  } else  {
     mysqli_close($conn);
     echo '<script type="text/javascript">window.location.href="getItRight.php";</script>';

}
?>
