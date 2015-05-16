<?php

    $conn = mysql_connect("localhost", "root", "123456");
    $db = mysql_select_db("oss");

    $json = file_get_contents('php://input');
    $method = $_SERVER["REQUEST_METHOD"];

    $res = $_GET["res"];
    $parts = explode("/", $res);

    if($method=="GET"){
        header('HTTP/1.0 401 Unauthorized');
        exit;
        if(isset($parts[2])){
            $q = mysql_query("select * from clientes where id = ".$parts[2]);
            $d = mysql_fetch_array($q);
            $clientes = $d;
        }else{
            // buscar todos os clientes
            $clientes = array();
            $q = mysql_query("select * from clientes");
            while($d = mysql_fetch_array($q)){
                $clientes[] = $d;
            }
        }
        echo json_encode($clientes);
        exit;
    }else if($method=="POST"){
        $obj = json_decode($json);
        mysql_query("insert into clientes (nome, cpf_cnpj) values('".$obj->nome."', '".$obj->cpf_cnpj."')");
        echo json_encode(true);
        exit;
    }else if($method=="PUT"){
        $obj = json_decode($json);
        mysql_query("update clientes set nome = '".$obj->nome."', cpf_cnpj='".$obj->cpf_cnpj."' where id = ".$obj->id);
        echo json_encode(true);
        exit;
    }else if($method=="DELETE"){
        $id = $parts[2];
        mysql_query("delete from clientes where id = ".$id);
        echo json_encode(true);
        exit;
    }
    echo $method;