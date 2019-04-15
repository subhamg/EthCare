<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $patientName = $_POST["patientName"];
  $password = $_POST["password"];

  exec("export TERM=xterm");
  exec("./addPatient.sh ".$patientName." ".$password." >/dev/null 2>&1 &", $output);
}

?>

  