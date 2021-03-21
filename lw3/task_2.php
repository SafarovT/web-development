<?php
  $ident = $_GET["identifier"];
  header("Content-Type: text/plain");
  if (preg_match('/[^0-9a-zA-Z]/', $ident) !== 0)  
  {
      echo "В вашем идентификаторе присутсвуют неподходящие символы!";
      if (preg_match('/^[0-9]/', $ident) !== 0) echo "\nВаш индентификатор начинается с цифры - это неприемлимо!";
  }
  else
  {
    if (preg_match('/^[0-9]/', $ident) !== 0) echo "Ваш индентификатор начинается с цифры - это неприемлимо!";
    else echo "Ваш идентификатор полностью подоходит!"; 
  }
