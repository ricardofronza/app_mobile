<?php
    $palavra = "%".trim($_GET["palavra"])."%";
        
    $sql = "select * from produto "
            . "where nome like ?";

    $res = $pdo->prepare($sql);
    $res->bindParam(1, $palavra);