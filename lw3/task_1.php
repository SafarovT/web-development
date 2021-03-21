<?php
  $str = $_GET["text"];
  $str = preg_replace('/\s+/', ' ', $str); //заменяет все последовательности (+) пробелов (\s) на один пробел
  header("Content-Type: text/plain");
  echo trim($str); 
