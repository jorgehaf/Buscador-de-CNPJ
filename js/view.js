window.addEventListener("load", function () {
    var _view = view.getInstance();
    _view.start();
});

var view = (function () {
    var instance;

    function init() {
        var infosCNPJ,
            objInfosPrincipais = {
                razaoSocial: '',
                cnpj: '',
                municipio: '',
                uf: ''
            },
            objInfosDetalhes = {
                razaoSocial: '',
                principalAtividade: '',
                situacao: '',
                presidente: '',
                abertura: '',
                email: '',
                telefone: '',
                municipio: '',
                uf: ''
            };

        var start = function () {
            eventsInput()
        };

        var eventsInput = function () {
            document.querySelector('#fieldBuscar').addEventListener('keypress', function onEvent(event) {
                if (event.key === "Enter") {
                    buscarCNPJ()
                }
            });
            document.querySelector('#button').addEventListener('click', buscarCNPJ);
            document.querySelector('#detalhes').addEventListener('click', abrirDetalhes);
        };

        function buscarCNPJ() {
            infosCNPJ = '';
            let cnpj = document.querySelector('#fieldBuscar').value.replace(/[^a-zA-Z 0-9]/g, '');

            $.ajax({
                'url': `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
                'type': 'GET',
                'dataType': 'jsonp',
                'success': function (dado) {
                    infosCNPJ = dado;
                    salvaDados(infosCNPJ);
                    preencheDadosIniciais();
                }
            });

        };

        function abrirDetalhes() {
            criaDivDetalhes();
            habilitaBotaoVoltar();
            preencheDadosDetalhes()
        };

        function criaDivDetalhes() {
            let div = document.createElement('div');
            div.setAttribute('class', 'divDetalhesEmpresa');
            let html =
                `<div class="divMenuDetalhes">
                    <div>
                        <button id="buttonVoltar" type="button" class="btn btn-secondary btn-sm"> ??? Voltar</button>
                    </div> 
                    <h2 id="tituloDetalhes">Detalhes do CNPJ</h2>
                </div>
                <div class="mainDivEmpresa">
                    <div class="row">
                        <div class="col-lg-12 field">
                            <label>Raz??o social</label>
                            <input id="razaoSocialDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8 field">
                            <label>Principal atividade</label>
                            <input id="principalAtividadeDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                        <div class="col-lg-4 field">
                            <label>Situa????o</label>
                            <input id="situacaoDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8 field">
                            <label>Presidente</label>
                            <input id="presidenteDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                        <div class="col-lg-4 field">
                            <label>Abertura</label>
                            <input id="aberturaDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 field">
                            <label>E-mail</label>
                            <input id="emailDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                        <div class="col-lg-6 field">
                            <label>Telefone</label>
                            <input id="telefoneDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8 field">
                            <label>Munic??pio</label>
                            <input id="municipioDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                        <div class="col-lg-4 field">
                            <label>UF</label>
                            <input id="ufDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                    </div>                    
                </div>`;
            div.innerHTML = html;
            document.getElementById('main').appendChild(div);
        }

        function habilitaBotaoVoltar() {
            const botaonVoltar = document.querySelector('#buttonVoltar');
            botaonVoltar.addEventListener('click', fecharDetalhes);
        }

        function fecharDetalhes() {
            var elemento = document.querySelector('.divDetalhesEmpresa');
            elemento.parentNode.removeChild(elemento);
        }

        function salvaDados(retorno) {
            // Atribui????o via desestrutura????o
            let {
                nome = 'N??o encontrado.',
                    cnpj = 'N??o encontrado.',
                    municipio = 'N??o encontrado.',
                    uf = 'N??o encontrado.',
                    atividade_principal: [{
                        text: principalAtividade = 'N??o encontrado.'
                    }],
                    situacao = 'N??o encontrado.',
                    qsa: [{
                        nome: nomePresidente = 'N??o encontrado.'
                    }],
                    data_situacao: abertura = 'N??o encontrado.',
                    email = 'N??o encontrado.',
                    telefone = 'N??o encontrado.',
            } = retorno;

            objInfosPrincipais.razaoSocial = nome;
            objInfosPrincipais.cnpj = cnpj;
            objInfosPrincipais.municipio = municipio;
            objInfosPrincipais.uf = uf;

            objInfosDetalhes.razaoSocial = nome;
            objInfosDetalhes.principalAtividade = principalAtividade;
            objInfosDetalhes.situacao = situacao;
            objInfosDetalhes.presidente = nomePresidente;
            objInfosDetalhes.abertura = abertura;
            objInfosDetalhes.email = email;
            objInfosDetalhes.telefone = telefone;
            objInfosDetalhes.municipio = municipio;
            objInfosDetalhes.uf = uf;
        }

        function preencheDadosIniciais() {
            $('#razaoSocialPrincipal').val(objInfosPrincipais.razaoSocial)
            $('#cnpjPrincipal').val(objInfosPrincipais.cnpj)
            $('#municipioPrincipal').val(objInfosPrincipais.municipio)
            $('#ufPrincipal').val(objInfosPrincipais.uf)

        }

        function preencheDadosDetalhes() {
            $('#razaoSocialDivDetalhes').val(objInfosDetalhes.razaoSocial)
            $('#principalAtividadeDivDetalhes').val(objInfosDetalhes.principalAtividade)
            $('#situacaoDivDetalhes').val(objInfosDetalhes.situacao)
            $('#presidenteDivDetalhes').val(objInfosDetalhes.presidente)
            $('#aberturaDivDetalhes').val(objInfosDetalhes.abertura)
            $('#emailDivDetalhes').val(objInfosDetalhes.email)
            $('#telefoneDivDetalhes').val(objInfosDetalhes.telefone)
            $('#municipioDivDetalhes').val(objInfosDetalhes.municipio)
            $('#ufDivDetalhes').val(objInfosDetalhes.uf)
        }

        return {
            start
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }

            return instance;
        },
    };
})();
