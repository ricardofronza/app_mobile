<?php
    $sql = "select * from produto "
                . "where destaque = 'S' "
                . "order by rand() "
                . "limit 4";
        
    $res = $pdo->prepare($sql);