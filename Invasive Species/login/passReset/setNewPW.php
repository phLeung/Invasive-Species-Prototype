<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
 <head>
    <title>Set new Password</title>
    <meta charset="utf-8">
    <meta name ="viewport" content="width=device-width, initial-scale=1">
	<style>
	.forgot {
		padding: 20px 40px;
	}
	input[type=text], input[type=password] {
                width: 50%;
                padding: 10px;
                margin: 5px 0 22px 0;
                display: inline-block;
                border: none;
                background: #f1f1f1;
            }

            input[type=text]:focus, input[type=password]:focus {
                background-color: #ddd;
                outline: none;
            }
	</style>
 </head>
<body>
   <?php include 'headerSubSub.php';?>


    <div class="NewPW forgot">
     <br>
     <h1 style="background-color: #f1f1f1">Set New Password</h1>
     <br>
     <form action="changePassWord.php" method="post">
     <!--New Password-->
     <label for="newpassword">Enter New Password: </label>
     <input type="password" placeholder="Enter New Password" name="newpassword" required>
     <br>
     <!--confirm new password -->
     <label for="confirm">Confirm new Password: </label>
     <input type="password" placeholder="Confirm New Password" name="confirm" required>
     <br />
     <button type="submit" class="btn btn-primary btn-success" id="NewPW">Submit</button>
    </form>
    </div>
   </div>
</body>
</html>    
