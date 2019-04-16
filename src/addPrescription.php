<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $doctorName = $_POST["doctorName"];
  $patientName = $_POST["patientName"];
  $prescription = $_POST["prescription"];

  $servername = "localhost";
  $username = $doctorName;
  $password = $doctorName;
  $dbname = "records";

  $conn = new mysqli($servername, $username, $password, $dbname);
  
  
  $tableName = $patientName;
  $sql = "INSERT INTO ".$tableName." VALUES ('".$prescription."','".$doctorName."')";



  if ($conn->query($sql) === TRUE) {
      echo "Record added successfully <br>";
  } else {
      echo "Error adding records: " . $conn->error . " <br>";
  }

  $conn->close();

}

?>

