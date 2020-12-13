<?php

    $connect = mysqli_connect('localhost', 'root', '', 'tttdb');

    if (!$connect) {
        die('Error connect to DataBase');
    }