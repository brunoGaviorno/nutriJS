var titulo = document.querySelector(".titulo");
console.log(titulo.textContent);

titulo.addEventListener("click", function() { // addEventListener permite que o JS fique escutando o elemento e avite determinada função após ouvi-lo.
    console.log("Olá eu fui clicado!");
});

var botaoAdicionar = document.querySelector('#adicionar-paciente');

botaoAdicionar.addEventListener('click', function(event) {

    event.preventDefault(); //preventDefault() impede que eventos padrões ocorram, como o limpar tela e atualizar a pagina (padrão do botão existente em um form)

    var form = document.querySelector('#formAdiciona'); //uma vez que o a mãe form tenha sido capturada, é possível capturar os valores dos filhos via "nome-da-var-criada-para-mãe.nome-do-filho.value", sem necessidade do querySelectorAll
    // Extrai informações do form

    var paciente = obtemPacienteFormulario(form);

    // Cria td e tr para incluir paciente


    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        exibeMensagensDeErro(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente);

    form.reset();
    var mensagensErro = document.querySelector('.mensagens-erro');
    mensagensErro.innerHTML = '';

})

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector('#tabela-pacientes');
    tabela.appendChild(pacienteTr); //aqui, capturamos o elemento da tabela existente no html que contém os pacientes já cadastrados para que possamos atribuir a essa tabela uma nova tr como filha (pacienteTr) que já possui seus filhos também (tds)

}

function obtemPacienteFormulario(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente) {

    var pacienteTr = document.createElement('tr'); //createElement permite criar elementos html e posteriormente declarar algum valor via textContent.
    pacienteTr.classList.add('paciente');

    pacienteTr.appendChild(montaTd(paciente.nome, 'info-nome')); //appendChild atribui elementos à um elemento mãe, "var-criada-para-mãe.appendChild(var-criada-para-filho)"
    pacienteTr.appendChild(montaTd(paciente.peso, 'info-peso'));
    pacienteTr.appendChild(montaTd(paciente.altura, 'info-altura'));
    pacienteTr.appendChild(montaTd(paciente.gordura, 'info-gordura'));
    pacienteTr.appendChild(montaTd(paciente.imc, 'info-imc'));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement('td');
    td.textContent = dado;
    td.classList.add(classe);

    return td;

}

function validaPaciente(paciente) {

    var erros = []

    if (paciente.nome.length == 0) {
        erros.push('Nome não pode ser em branco');
    }

    if (!validaPeso(paciente.peso)) {
        erros.push('O Peso é inválido.');
    }

    if (!validaAltura(paciente.altura)) {
        erros.push('A Altura é inválida');
    }

    if (paciente.peso.length == 0) {
        erros.push('Peso não pode ser em branco.')
    }

    if (paciente.altura.length == 0) {
        erros.push('Altura não pode ser em branco.')
    }

    if (paciente.gordura.length == 0) {
        erros.push('Gordura não pode ser em branco');
    }

    return erros;

}

function exibeMensagensDeErro(erros) { // comentar sobre o forEach com o pessoal da equipe    
    var ul = document.querySelector('.mensagens-erro');
    ul.innerHTML = '';
    erros.forEach(function(erro) {
        var li = document.createElement('li');
        li.textContent = erro;
        ul.appendChild(li);
    })
}