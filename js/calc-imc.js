var pacientes = document.querySelectorAll('.paciente'); //querySelectorAll captura toda a lista como uma array

for (var i = 0; i < pacientes.length; i++) { //sempre usar < quando se tratar de uma array e nunca <=

    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector('.info-peso'); // uma vez que tenha capturado a tag mãe, as filhas podem ser consultadas via "var-criada-para-tag-mãe.querySelector(tag-filha)"
    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector('.info-altura');
    var altura = tdAltura.textContent;

    var tdImc = paciente.querySelector('.info-imc');

    var pesoValido = validaPeso(peso);
    var alturaValida = validaAltura(altura);

    if (!pesoValido) {
        tdImc.textContent = 'Peso inválido.';
        pesoValido = false;
        paciente.classList.add("paciente-invalido")

        //classList é usada para atribuir uma classe à determinado elemento, assim, mudando as configurações dessa classe no css, o JS a inputará no html.

    } else if (!alturaValida) {
        tdImc.textContent = 'Altura inválida.';
        alturaValida = false;
        paciente.classList.add("paciente-invalido")
    }

    if (alturaValida && pesoValido) {
        var imc = peso / (altura * altura);
        tdImc.textContent = imc.toFixed(2); //toFixed limita a quantidade de casas decimais, será feito um round automaticamente.
    } else {
        imc = 0;
    }

}

function validaPeso(peso) {
    if (peso >= 0 && peso < 1000) {
        return true;
    } else {
        return false;
    }
}

function validaAltura(altura) {
    if (altura >= 0 && altura < 3.0) {
        return true;
    } else {
        return false;
    }
}


function calculaImc(peso, altura) { //sempre criar funções quando precisarmos reurilizar alfo em outro local.
    var imc = 0

    imc = peso / (altura * altura);

    return imc.toFixed(2);
}