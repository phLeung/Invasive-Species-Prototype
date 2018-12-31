<?php 
      
      header("Content-Type: application/json; charset=UTF-8");
      $dbParam = $_GET["cardid"];

      $server = "localhost";
      $username = "p_f18_3";
      $password = "ygtaqf";
      $dbname = "p_f18_3_db";
      $query = "SELECT * FROM card WHERE cardid=". intval($dbParam) ." ";
      $link = mysqli_connect($server,$username,$password,$dbname);
      //check connection
      if(!$link)
      {
	  die("ERROR: " . "Could not connect." . mysqli_connect_error());
      }
      if(!(mysqli_select_db($link,$dbname)))
      {
          die("Could not open database");
      }
      if(!($res = mysqli_query($link,$query)))
      {
          die(mysqli_error($link));
      }
      //$arr = array();
      
      if(mysqli_num_rows($res) > 0)
      {
        $row = mysqli_fetch_array($res);

        //PHP 5.4 and later enables "option strict" by default
        //Meaning you can't assign values to an undeclared object.
        //This prevents such a warning from interefering with the ajax call
        $arr = array('CardID' => $row['cardid'], 
        'Description' => $row['description'], 
        'Type' => $row['type'], 
        'Movement' => $row['movement']
        );
        
        /*
        $myObj->CardID = $row['cardid'];
        $myObj->Description = $row['description'];
        $myObj->Type = $row['type'];
        $myObj->Movement = $row['movement'];

          while($row = mysqli_fetch_array($res))
          {
               $row_arr['CardID'] = $row['cardid'];
               $row_arr['Description'] = $row['description'];
               $row_arr['Type'] = $row['type'];
               $row_arr['Movement'] = $row['movement'];
               array_push($arr,$row_arr);
          }
          *///$result = json_encode($arr);

        //$result = json_encode($myObj);
        $result = json_encode($arr);

        echo $result;
      } else {
        echo "No results.";
      }

        
      
      
?>
