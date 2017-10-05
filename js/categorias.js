$(document).ready(function() {
    var id = retornaPagina();
    
    var c = localStorage
            .getItem("categoria"+id);
    if (c) {
        var dados = JSON.parse(c);
        preencherDados(dados);
    } else {
        $.getJSON("http://localhost/Projeto/json/produtos.php?op=categoria&id="+id,
        function() {
            $("#msg").html(
            "<div class='alert alert-warnig'>\n\
            <img src='imgs/load.gif'/> Carregando...\n\
            </div>"     
            );
        }).done(function(dados) {
            localStorage.setItem(
            "categoria"+id,
            JSON.stringify(dados)
            );
            preencherDados(dados);
        });
    }
    
});

function preencherDados(dados) {
    $.each(dados, function(key, val) {
        $(".row").append(
            "<div class='col-md-6 col-sm-6 \n\
            text-center'>\n\
            <div class='thumbnail'>\n\
            "+val.imagem+"\n\
            <p>"+val.nome+"</p>\n\
            <p class='valor'>"+val.valor+"</p>\n\
            <a href='produto.html?id="+val.id+"' \n\
            class='btn btn-danger'>Detalher\n\
            <a/></div></div>");
    });
    $("#msg").html("");
}