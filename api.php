<?php

    $conn = mysql_connect("localhost", "root", "");
    $db = mysql_select_db("oss");

    $json = file_get_contents('php://input');
    $method = $_SERVER["REQUEST_METHOD"];

    $res = $_GET["res"];
    $parts = explode("/", $res);

    $result = false;
    $modelLocation = "model/".$parts[1].".php";
    if(isset($parts[1])&&$parts[1]!=""){
        $modelClass = ucfirst($parts[1]);
        if(is_file($modelLocation)){
            include($modelLocation);

            $param1 = "";
            if(isset($parts[2])){
                $param1 = $parts[2];
            }

            // espera-se ter uma classe com o mesmo nome no arquivo
            $model = new $modelClass();
            if($method=="GET"){
                if($param1!=""){
                    $result = $model->get($param1);
                }else{
                    $result = $model->getAll($param1);
                }
            }else if($method=="POST"){
                $result = $model->insert(json_decode($json));
            }else if($method=="PUT"){
                $result = $model->update(json_decode($json));
            }else if($method=="DELETE"){
                $result = $model->delete($param1);
            }
        }
    }
	
    echo json_encode($result);
    exit;