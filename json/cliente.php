<?php
    session_start();
    header("Content-type:application/json");
    
    include_once 'config.php';
    
    $msg = "";
    
    if ($_POST) {
        
    } else {
        $msg = array("erro"=>1
            , "mensagem"=>"Requisição inválida");
    }
    
    echo json_encode($msg);