<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $patientName = $_POST["patientName"];
  $password = $_POST["password"]
 
  exec("export TERM=xterm");
  exec("./addPatitent ".$patientName." ".$password." >/dev/null 2>&1 &", $output
}

?>

