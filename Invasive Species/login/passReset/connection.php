<?php
     //For simplicity, just include this file into another php file
     // so you don't have to write the same code over and over again
     // for connecting to the database
     $server = "localhost";
     $username = "p_f18_3";
     $password = "ygtaqf";
     $dbname = "p_f18_3_db";
     $conn = mysqli_connect($server,$username,$password,$dbname);
     //check connection
     if(!$conn)
     {
         die("ERROR: " . "Could not connect." . mysqli_connect_error());
     }
     if(!(mysqli_select_db($conn,$dbname)))
     {
         die("Could not open database");
     }
     
     
     
?>
