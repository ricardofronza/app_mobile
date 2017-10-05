$(document).ready(function() {
    var id = retornaPagina();
    console.log(id);
    
    var produto = localStorage.getItem("produto"+id);
    
    if (produto) {
        console.log("Produto Cache.");
        dados = JSON.parse(localStorage.getItem("produto"));
        preencherProdutos(dados);
    } else {
        $.getJSON("http://localhost/Projeto/json/produtos.php?op=produto&id="+id,function() {
            
        }).done(function(dados) {
            console.log("Carregado da API");
            localStorage.setItem("produto", JSON.stringify(dados));
            localStorage.setItem("produto"+1, JSON.stringify(dados));
            preencherProduto(dados);
        });
    }
    
});

function preencherProduto(dados) {
    $.each(dados, function(key, val) {
        $(".foto").html(val.imagem);
        $(".descricao").html(
                "<p>"+val.descricao+"</p>\n\
                <p class='text-center'><a href='carrinho.html?op=add' \n\
                class='btn btn-danger btn-sm'>Comprar</a>"
                );
        $("h1").html(val.nome);
    });
}