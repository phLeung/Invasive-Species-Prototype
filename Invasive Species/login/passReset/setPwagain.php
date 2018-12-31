<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
   <title> Passwords don't match</title>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
 </head>
<body>
   <?php include 'headerSubSub.php';?>
   <h1>Try again</h1>
   <p>Make sure new password and confirmed password match</p>
   <div class="SetPW" align="center">
    <div class="NewPW">
       <br>
        <h1 style="background-color: #f1f1f1">Set New Password</h1>
        <br>
        <form action="changePassWord.php" method="post">
        <label for="newpassword">Enter New Password: </label>
        <input style="background-color: white" type="password" placeholder="Enter New Password" name="newpassword" required>
        <br>
        <label for="confirm">Confirm new Password (retype new password): </label>
        <input style= "background-color: white" type="password" placeholder="Confirm New Password" name="confirm" required>
        <br />
        <button type="submit" class="btn btn-primary" id="NewPW">Submit</button>
        </form>
     </div>
   </div>
 </body>
</html>
