<?php
    $json = file_get_contents('php://input');

    $telefones = array();
    for($i=0; $i<30; $i++){
        $telefones[] = array(
            "ddd"=>$i.$i,
            "num"=>$i.$i.$i);
    };

    echo json_encode($telefones);