<?php
/* Attempt MySQL server connection.*/
$link = mysqli_connect("localhost", "p_f18_3", "ygtaqf", "p_f18_3_db");

      $name = $_SESSION["user"];      

      //mySQL command to get the user's record n the table
      $query = "SELECT * FROM user WHERE username = '$name'";
      //check connection
      if(!$link)
      {
	  die("ERROR: " . "Could not connect." . mysqli_connect_error());
      }
      if(!($res = mysqli_query($link,$query)))
      {
          die(mysqli_error($link));
      }
      //stores the result of the sql query into mulitple session variables
      if(mysqli_num_rows($res) > 0)
      { 
          while($row = mysqli_fetch_array($res))
            {
                $_SESSION["educator"] = $row["educator"];
                $_SESSION["avatar"] = $row["avatar"];
                $_SESSION["highscore"] = $row["highscore"];
            }
      }

mysqli_close($link);

?>