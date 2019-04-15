<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $doctorName = $_POST["doctorName"];
  $password = $_POST["password"];

  exec("export TERM=xterm");
  exec("./addDoctor.sh ".$doctorName." ".$password." >/dev/null 2>&1 &", $output);
}

?>

