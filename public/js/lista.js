function transferirDados(id){
    var elementos = document.getElementById(id+"***").querySelectorAll('*');
    document.getElementById('cidade').innerHTML = "<b>Cidade: </b>" + elementos[0].innerText;
    document.getElementById('empresa').innerHTML = "<b>Empresa: </b>" + elementos[1].innerText;
    document.getElementById('site').innerHTML = "<b>Site: </b>" + elementos[2].innerText;
    document.getElementById('endereco').innerHTML = "<b>Endereço: </b>" + elementos[3].value;
    document.getElementById('telefone').innerHTML = "<b>Telefone: </b>" + elementos[4].value;
    document.getElementById('whatsapp').innerHTML = "<b>WhatsApp: </b>" + elementos[5].value;
    document.getElementById('email').innerHTML = "<b>Email: </b>" + elementos[6].value;
    document.getElementById('observacoes').innerHTML = "<b>Observações: </b>" + elementos[7].value;
}

function transferirValores(id){
    var elementos = document.getElementById(id+"***").querySelectorAll('*');
    document.getElementById('cidade').value = elementos[2].value;
    document.getElementById('empresa').value = elementos[0].innerText;
    document.getElementById('site').value = elementos[3].value;
    document.getElementById('endereco').value = elementos[4].value;
    document.getElementById('telefone').value = elementos[5].value;
    document.getElementById('whatsapp').value = elementos[6].value;
    document.getElementById('email').value = elementos[7].value;
    document.getElementById('observacoes').value = elementos[8].value;
    document.getElementById('id').value = elementos[9].value;
}

function transferirInfoUsuario(id){
    var elementos = document.getElementById(id+"***").querySelectorAll('*');
    document.getElementById('idUsuario').value = elementos[7].value;
}

function transferirDadosLista(id){
    var elementos = document.getElementById(id+"***").querySelectorAll('*');
    document.getElementById('nomeLista2').value = elementos[0].innerText;
    document.getElementById('descricao2').value = elementos[1].innerText;
    
    if(elementos[5].value == "true"){
        document.getElementById('renderizarStatus').innerHTML = "Status: <span class='badge badge-success'>Ativo</span>"
    }else{
        document.getElementById('renderizarStatus').innerHTML = "Status: <span class='badge badge-danger'>Inativo</span>"
    }

    document.getElementById('imagemLista2').value = elementos[9].value;
    document.getElementById('linkCompra2').value = elementos[10].value;
    document.getElementById('idLista2').value = id;
}

function transferirCatalogo(id){
    var elementos = document.getElementById(id+"***").querySelectorAll('*');
    document.getElementById('produtoQuestao').innerText = elementos[2].innerText;
    document.getElementById('idLista').value = id;
}

function transferirOperacao(id){
    document.getElementById('idOperacao2').value = id;
}

function transferirTicketResponder(id){
    document.getElementById('idTicket2').value = id;
}

function transferirTicketExcluir(id){
    document.getElementById('idTicket3').value = id;
}