<?php
    session_start();
    header("Content-Type:application/json");
    
    include_once 'config.php';
    
    $msg = "";
    
    if (!isset($_SESSION["usuario"])) {
        $msg = array("erro"=>1
            ,"mensagem"=>"O usuário não logado");
        die();
    }
    if ($_POST) {
        $id = "";
        if (isset($_POST["id"])) {
            $id = trim($_POST["id"]);
        }
        $sql = "select *, "
                . "date_format(data,'%d/%m/%Y') dt "
                . "from pedido "
                . "where cliente_id = ? "
                . "order by data";
        $res = $pdo->prepare($sql);
        $res->binParam(1,$id);
        $res->execute();
        while ($l = $res->fetch(PDO::FETCH_OBJ)) {
            $l->imagem = 
                    "http://localhost/Projeto/imgs/".$l->imagem;
            $dados[$l->id]=$l;
        }
    }
    echo json_encode($dados);