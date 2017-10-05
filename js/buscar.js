$(document).ready(function() {
    var palavra = retornaPagina();
    
    $("#msg").html("<img src='imgs/load.git'/> Aguarde, carregando.");
    
    $.getJSON("http://localhost/Projeto/json/produtos.php?op=busca&palavra="+palavra, function() {
        
    }).done(function(dados) {
        $.each(dados, function(key, val) {
            $(".row").append(
                "<div class='col-md-3 col-sm-6 text-center'\n\
                <div class='thumbnail'>"+val.imagem+"\n\
                <h2>"+val.nome+"</h2>\n\
                <p class='valor'>R$ "+val.valor+"</p>"+
                "<p><a href='produto.html?id='"+val.id+" class='btn btn-danger btn-lg'>Detalhes</a></p></div></div>"
                    );
        });
        $("#msg").html("Resultado da busca por: <b>"+palavra+"</b>");
    });
});