<?php
    header("Content-type:application/json");
    
    include_once('config.php');
    
    $op = "";
    
    if (isset($_GET["op"])) $op = trim($_GET["op"]);

    if (empty($op)) {
        $sql = "select * from produto";
        $res = $pdo->prepare($sql);
    } else if ($op == 1) {
        include_once 'produtos_busca.php';
    } else if ($op == "destaques") {
        include_once 'produtos_destaque.php';
    } else if ($op == "produto") {
        $id = $_GET["id"];
        
        $sql = "select * from produto "
                . "where id = ?";
        $res = $pdo->prepare($sql);
        $res->bindParam(1,$id);
    } else if ($op == "categoria") {
        $id = $_GET["id"];
        
        $sql = "select p.*, c.nome as categoria, "
                . "from produto p "
                . "inner join categoria c on "
                . "(c.id = p.categoria_id) "
                . "where p.categoria_id = ?";
        $res = $pdo->prepare($sql);
        $res->bindParam(1, $id);
    }
    
    $res->execute();
    while ($l = $res->fetch(PDO::FETCH_OBJ)) {
        $l->imagem = "<img "
                . "src=\"http://localhost/Projeto/imgs"
                . "/{$l->imagem}\">";
        $l->valor = number_format($l->valor,
                2, ",", ".");
        $dados[$l->id] = $l;
    }
    
    if (!isset($dados)) $dados = "";
    
    echo json_encode($dados);