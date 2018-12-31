<?php
   header("Content-Type: application/json; charset=UTF-8");
   $obj = json_decode($_POST["Obj"], false);//the player object info should be sent as a json object
   
   $diceValue = $obj->Dice;
   $scoreValue = $obj->Score;
   $currentSpace = $obj->Space;
   $playerNumber = $obj->PlayerNumber;
   $cardID = $obj->CardID;
   $totalPlayers = $obj->TotalPlayers; //number of players in game

   $fileName = 'saves/test.txt';


   
   //put the player info in a text file called saved and
   // don't overwrite player info. use a+ to append and/or update the 
   //player info and preserve exisiting player info saved
   //fopen creates file if filename does not exist
   $savedFile = fopen("$fileName","a+") or die("Cannot open file");
   fwrite($savedFile, $obj);
   fclose($savedFile);
   

   
   
   
   $link = mysqli_connect("localhost", "p_f18_3", "ygtaqf", "p_f18_3_db");
   if($link === false)
   {
      die("ERROR: Could not connect. " . mysqli_connect_error());
   }
   if(!(mysqli_select_db($link, "p_f18_3_db")))
   {
      die("Could not open database");
   }
   //if the game id has been auto incremented when the board_game
   // table was created, then there is no need to increment the 
   // the game id
   $sql = "INSERT INTO board_game (`number_of_players`, `playerinfo`)
              VALUES ('". $totalPlayers ."', '". $fileName ."')";   
   echo json_last_error(); 

   if ($link->query($sql) === TRUE) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $link->error;
  }
  
  $link->close();
   
?>

