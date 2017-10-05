$(document).ready(function() {
    $(".btn-limpar").click(function(){
        localStorage.clear();
        location.href="index.html";
    });
    $(".btn-continuar").click(function() {
        location.href="index.html";
    });
    var op = retornaPagina();
    if (op=="add") {
        var produto = JSON.parse(localStorage.getItem("produto"));
        var carrinho = JSON.parse(localStorage.getItem("carrinho"));
        
        if (!carrinho) {
            carrinho = [];
        }
        
        $.each(produto, function(key, val) {
            produto = {
                id: val.id,
                nome: val.nome,
                imagem: val.imagem,
                valor: val.valor
            }
            console.log(val.id);
        });
        carrinho.push(produto);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
    
    carrinho = localStorage.getItem("carrinho");
    if (carrinho) {
        produto = JSON.parse(carrinho);
        var total = 0;
        
        $.each(produto, function(key, val) {
            $("tbody").append(
                    "<tr id='linha"+key+"'><td>"+val.imagem+"</td><td>"+val.nome+"<td>"+val.valor+"</td>\n\
                    <button type='button' class='btn btn-danger' onclick='removerItem("+key+")>\n\
                    <i class='glyphicon glyphicon-remove'></i></button></td></tr>");
            var valor = formatar(val.valor);
            total += valor;

        });
        total = formatarReal(total);
        $(".tfoot").html(
        "<tr>\n\
            <td colspan='2'>TOTAL: </td>\n\
            <td colsapn='2'>R$ "+total+"</td>\n\
         </tr>"
        );
    }
});

function removerItem(key) {
    if (confirm("Deseja realmente excluír este item?")) {
        var carrinho = localStorage.getItem("carrinho");
        carrinho = JSON.parse(carrinho);
        carrinho.splice(key, 1);
        localStorage.setItem("carrinho",JSON.stringify(carrinho));
        $("#linha"+key).hide("fast");
        location.href="carrinho.html"
    }
}

function formatar(valor) {
    valor = valor.replace(".","");
    return parseFloat(valor.replace(",","."));
}

function formatarReal(valor) {
    valor = valor.toFixed(2).split(".");
    valor[0] = valor[0].split(/(?=(?:...)*$)/).join('.');
    return valor.join(',');
}