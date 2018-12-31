<!DOCTYPE html>
<html lang="en">
  <head>
        <title>The Invaders: Log in/Sign up</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="../style.css" rel="stylesheet" type="text/css">
        
        <style>
            input[type=text], input[type=password] {
                width: 50%;
                padding: 10px;
                margin: 5px 0 5px 0;
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
    <?php include 'headerSub.php';?>
        
    <div class="split">
        <!-- Log In Section -->
        <div class="login">
            <p style="background-color: #f1f1f1; font-size:40px">Welcome Back</p>
            <br>
            <form style="margin-left:20px" action="loguserin.php" method="post">
                <!--Username-->
                <label for="username">Username: </label>
                <input style= "background-color: white" type="text" placeholder="Enter Username" name="username" required>
                <br>
                <!--Password-->
                <label for="pass">Password:  </label>
                <input style="background-color: white" type="password" placeholder="Enter Password" name="password" required>
                <br>
                <a href="passReset/forgotpassword.php">Forgot Password?</a>
                <br>
                <br>
                <button type="submit" class="btn btn-primary btn-success" id="login">Submit</button>
            </form>
             
        </div>
        

        <!--Sign up Section-->
        <div class="signup">
                <p style="font-size:40px">Sign Up</p>
                <p style="font-size:20px">Don't have an account yet?</p>

                <!-- alerts user of the problem. Becuase of the required atrributes and input types, 
                the only probable error is that the username is not unique. -->  
                <p>Sorry, that username is already taken.</p>
                <!--Username-->
                <form style="margin-left: 20px" action="register.php" method="post">
                    <label for="username">Choose a Username:</label>
                    <input type="text" placeholder="Enter Username" name="username" required>
                    <br>
                    <!--Password-->
                    <label for="password">Choose a Password:</label>
                    <input type="password" placeholder="Enter Password" name="password" required>
                    <br>
                    <!-- Security -->
                    <label for="admin">Educator Code (not required):</label>
                    <input type="text" placeholder= "Educator Code" name="adminCode">
                    <br>
                    <label for="security">Enter a security question: </label>
                    <input type="text" placeholder="Security Question" name="security" required>
                    <br>
                    <label for="answer">Enter answer: </label>
                    <input type="password" placeholder="Security Answer" name="answer" required>
                    <br>
                    <br>
                    <!--Avatar-->
                    <p> Choose an avatar: </p>

                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="img" value="1"><img src="../images/p1.png" alt="ladybug">
                        </label>
                    
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="img" value="2"><img src="../images/p2.png" alt="moth">
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="img" value="3"><img src="../images/p3.png" alt="butterfly">
                        </label>
                    
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="img" value="4"><img src="../images/p4.png" alt="dragonfly">
                        </label>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary btn-success" id="register">Submit</button>
                </form>
            </div>

            
        </div>


</body>
</html>
