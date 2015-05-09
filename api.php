<?php

    $conn = mysql_connect("localhost", "root", "123456");
    $db = mysql_select_db("oss");

    $json = file_get_contents('php://input');
    $method = $_SERVER["REQUEST_METHOD"];

    echo $method;