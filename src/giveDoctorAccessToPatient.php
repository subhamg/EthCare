<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $doctorName = $_POST["doctorName"];
  $patientName = $_POST["patientName"];

  exec("export TERM=xterm");
  exec("./giveDoctorAccessToPatient.sh ".$doctorName." ".$patientName." >/dev/null 2>&1 &", $output);
}

?>

