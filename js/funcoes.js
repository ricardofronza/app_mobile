$(document).ready(function() {
    $(".logar").click(function(){
        $("#login").show("slow");
    });
    
    $(".btn-cancelar").click(function() {
        $("#login").hide("slow");
    });
    
    $(".btn-logar").click(function() {
        var email = $("#email").val();
        var senha = $("#senha").val();
        
        $.post("http://localhost/Projeto/json/login.php",
            {email:email,senha:senha},
            function(dados) {
                var msg = dados.split(";");
                if (msg[0] == "erro") {
                    alert(msg[1]);
                } else {
                    localStorage.setItem("email",email);
                    sessionStorage.setItem("id",msg[1]);
                    sessionStorage.setItem("nome",msg[2]);
                    location.href = "index.html";
                }
            }
        );
        
    });
    
    var idCliente = 
            sessionStorage
            .getItem("id");
    if (idCliente) {
        var nomeCliente =
                sessionStorage
                .getItem("nome");
        var texto = "Seja bem vindo "
        +nomeCliente+" (ID: "+idCliente+" )\n\
        <br /><br />\n\
        <button type='button'\n\
        class='btn btn-danger btn-sm btn-cancelar'>\n\
        Cancelar</button>\n\
        <button type='button' \n\
        class='btn btn-danger \n\
        btn-sair btn-sm'>Sair</button>";
        
        $("#login form").html(texto);
        
        $(".btn-cancelar").click(function() {
            $("#login").hide("slow");
        });
    }
     
    $(".btn-sair").click(function() {
        if (confirm("Você deseja mesmo sair?")) {
            sessionStorage.clear();
            location.href = "index.html";
        }
    });
    $(".busca").click(function() {
        $("#busca").show("fast");
    });
    
    var c = localStorage.getItem("menuCategorias");
    
    if (c) {
        var cache = JSON.parse(c);
        console.log(cache);
        preencherCategorias(cache);
    } else {
        console.log("Carregando menu do JSON");
        $.getJSON("http://localhost/Projeto/json/categorias.php",
        function() {
            $("#msg").html(
                "<div class='alert alert-danger'>\n\
                <img src='imgs/load.gif' /> Carregando...\n\
                </div>"
            );
        }).done(function(dados) {
            var cache = JSON.stringify(dados);
            localStorage.setItem("menuCategorias",cache);
            preencherCategorias(cache);
        }).fail(function() {
            $("#msg").html(
                "<div class='alert alert-danger'>\n\
                Erro na requisição....</div>"
            );
        });
    }
});

function preencherCategorias(dados) {
    $("#msg").html("");
    $.each(dados, function(key, val) {
        console.log(val.nome);
        $(".navbar-nav").prepend(
        "<li>\n\
        <a href='categorias.html?id="+val.id+"'>\n\
        "+val.nome+"</a>\n\
        </li>"
        );
    });
}

function retornaPagina() {
    var url = window.location.href;
    var id = url.split("=");
    console.log("Id: "+id);
    if (id.length > 1) {
        id = id[1];
    }
    return id;
}