<!DOCTYPE html>
<html lang="en">
  <head>
        <title>Forgot Password2</title>
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
            <h1>Forgot Password</h1>
            <br>
            <p>Incorrect security answer. Please try again.</p>
            <form action="getNewPW.php" method="post">
                <p>Security Question: <?php echo $_SESSION["question"];?></p>
                <!--Password-->
                <label for="answer">Security Answer:  </label>
                <input type="password" placeholder="Enter Answer" name="answer" required>
                <br />
                <button type="submit" class="btn btn-primary btn-success" id="newPW">Submit</button>
            </form>
        </div>


            
        </div>
</div>
