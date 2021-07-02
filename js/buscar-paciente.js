var botaoAdicionar = document.querySelector('#buscar-paciente');

botaoAdicionar.addEventListener('click', function() {
    console.log('buscando.');

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api-pacientes.herokuapp.com/pacientes');

    xhr.addEventListener('load', function() {

        if (xhr.status == 200) {

            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);

            pacientes.forEach(function(paciente) {
                adicionaPacienteNaTabela(paciente);
            });
        } else {
            alert('Falha no carregamento dos dados');
        }
    })

    xhr.send();

})