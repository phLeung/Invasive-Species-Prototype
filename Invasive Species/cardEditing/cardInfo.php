<?php
/* Attempt MySQL server connection.*/
$link = mysqli_connect("localhost", "p_f18_3", "ygtaqf", "p_f18_3_db");

      
      $query = "SELECT * FROM card";
      //check connection
      if(!$link)
      {
	  die("ERROR: " . "Could not connect." . mysqli_connect_error());
      }
      if(!($res = mysqli_query($link,$query)))
      {
          die(mysqli_error($link));
      }
      //stores the result of the sql query into an array, 
      //and then makes that array accessable by making it a session varaible
      $arr = array();
      if(mysqli_num_rows($res) > 0)
      { 
          while($row = mysqli_fetch_array($res))
            {
             $row_arr['CardID'] = $row['cardid'];
             $row_arr['Description'] = $row['description'];
             $row_arr['Type'] = $row['type'];
             $row_arr['Movement'] = $row['movement'];
             array_push($arr,$row_arr);
            }
      }
      $result = json_encode($arr);
      $_SESSION["cards"]=$result;
      $_SESSION["num_of_card"]=sizeOf($arr);

mysqli_close($link);

?>