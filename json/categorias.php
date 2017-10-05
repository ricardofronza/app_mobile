<?php
    header("Content-type:application/json");
    
    include_once('config.php');
    
    $sql = "select * from categoria"
            . " order by nome";
    $res = $pdo->prepare($sql);
    $res->execute();
    
    while ($l=$res->fetch(PDO::FETCH_OBJ)) {
        $dados[$l->id]=$l;
    }
    echo json_encode($dados);
    