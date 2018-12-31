<!DOCTYPE html>
<html lang="en">
  <head>
        <title>Forgot Password</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="../../style.css" rel="stylesheet" type="text/css">
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

    <!-- Header -->
    <?php include 'headerSubSub.php';?>
        
        <!-- Forgot password section -->
        <div class="forgot">
            <br>
            <h1 style="background-color: #f1f1f1">Forgot Password</h1>
            <br>
            <p>That username wasn't found. Please make sure you enter it correctly. </p>
            <form action="getQuestion.php" method="post">
                <!--Username-->
                <label for="username">Username:  </label>
                <input type="text" placeholder="Enter Username" name="username" required>
                <br>
                <button type="submit" class="btn btn-primary btn-success" id="newPW">Continue</button>
            </form>
        </div>


            
        </div>
</div>
