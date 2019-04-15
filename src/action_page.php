<!DOCTYPE html>  
<html>
<head>
  <link rel="stylesheet" type="text/css" href="./style.css">
</head>
<body>  

<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $servername = "localhost";
  $username = $_POST["docName"];
  $password = "pass";
  $dbname = "records";

  $conn = new mysqli($servername, $username, $password, $dbname);
  
  $docName = $_POST["docName"];
  $prescritption = $_POST["prescritption"];
  $patientName = $_POST["patientName"];
  $tableName = $docName. "_" . $patientName;
  $sql = "INSERT INTO $tableName
  VALUES ('".$prescritption."','".$docName."')";
  if ($conn->query($sql) === TRUE) {
      echo "Student Data was recorded successfully <br>";
  } else {
      echo "Error adding Student Data: " . $conn->error . " <br>";
  }
}
$conn->close();
?>

<button type="button" onclick="location.href = './index.html';">Close</button>


</body>
</html>