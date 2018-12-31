<?php 
//changes the session variable delete to the user's input in order to confirm delete, 
//and then redirects to the next delete confirmation webpage
session_start();
$_SESSION["delete"]=$_REQUEST['del']; 
echo '<script type="text/javascript">window.location.href="confirmDelete2.php";</script>';
?>