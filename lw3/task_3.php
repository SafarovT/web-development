<?php
    $pass = $_GET["password"];
    $safety = 0;

    $pass_array = str_split($pass);
    preg_match_all('/[a-z]/', $pass, $letters_lowercase);
    preg_match_all('/[A-Z]/', $pass, $letters_uppercase);
    preg_match_all('/[0-9]/', $pass, $numbers);

    $letters_lowercase_amount = count($letters_lowercase[0]);
    $letters_uppercase_amount = count($letters_uppercase[0]);
    $numbers_amount = count($numbers[0]);
    $pass_length = count($pass_array);

    $safety = ($letters_lowercase_amount + $letters_uppercase_amount) * 4 + $numbers_amount * 4;
    if ($letters_lowercase_amount !== 0)
    {
        $safety = $safety + ($pass_length - $letters_lowercase_amount) * 2;
    }
    if ($letters_uppercase_amount !== 0)
    {
        $safety = $safety + ($pass_length - $letters_uppercase_amount) * 2;
    }
    if (($letters_lowercase_amount === 0 && $letters_uppercase_amount === 0) || $numbers_amount === 0)
    {
        $safety = $safety - $pass_length;
    }

    $repeats = array_count_values($pass_array);
    foreach ($repeats as $symbol => $symbol_number)
    {
        if ($repeats[$symbol] > 1) $safety = $safety - $repeats[$symbol];
    }


    header("Content-Type: text/plain");
    echo $safety;
