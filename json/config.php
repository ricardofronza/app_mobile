<?php
    ini_set("display_errors", 1);
    ini_set("display_startup_errors", 1);
    error_reporting(E_ALL);
    
    try {
        $servidor= "localhost";
        $banco = "api_ecommerce";
        $usuario = "root";
        $senha = "1234";
        $port = "3306";
        /* @var $pdo PDO */
        $pdo = new PDO("mysql:host={$servidor};port={$port};dbname={$banco};charset=utf8", $usuario, $senha);
    } catch (PDOException $exc) {
        echo "Erro de Conexão ".$exc->getMessage()."\n";
        die();
    }