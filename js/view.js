window.addEventListener("load", function () {
    var _view = view.getInstance();
    _view.start();
});

var view = (function () {
    var instance;

    function init() {
        var infosCNPJ,
            arrayInfosPrincipais = {
                razaoSocial: '',
                cnpj: '',
                municipio: '',
                uf: ''
            },
            arrayInfosDetalhes = {
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
                        <button id="buttonVoltar" type="button" class="btn btn-secondary btn-sm"> ↶ Voltar</button>
                    </div> 
                    <h2 id="tituloDetalhes">Detalhes do CNPJ</h2>
                </div>
                <div class="mainDivEmpresa">
                    <div class="row">
                        <div class="col-lg-12 field">
                            <label>Razão social</label>
                            <input id="razaoSocialDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8 field">
                            <label>Principal atividade</label>
                            <input id="principalAtividadeDivDetalhes" class="form-control" type="text" readonly>
                        </div>
                        <div class="col-lg-4 field">
                            <label>Situação</label>
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
                            <label>Município</label>
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
            // Atribuição via desestruturação
            let {
                nome = 'Não encontrado.',
                    cnpj = 'Não encontrado.',
                    municipio = 'Não encontrado.',
                    uf = 'Não encontrado.',
                    atividade_principal: [{
                        text: principalAtividade = 'Não encontrado.'
                    }],
                    situacao = 'Não encontrado.',
                    qsa: [{
                        nome: nomePresidente = 'Não encontrado.'
                    }],
                    data_situacao: abertura = 'Não encontrado.',
                    email = 'Não encontrado.',
                    telefone = 'Não encontrado.',
            } = retorno;

            arrayInfosPrincipais.razaoSocial = nome;
            arrayInfosPrincipais.cnpj = cnpj;
            arrayInfosPrincipais.municipio = municipio;
            arrayInfosPrincipais.uf = uf;

            arrayInfosDetalhes.razaoSocial = nome;
            arrayInfosDetalhes.principalAtividade = principalAtividade;
            arrayInfosDetalhes.situacao = situacao;
            arrayInfosDetalhes.presidente = nomePresidente;
            arrayInfosDetalhes.abertura = abertura;
            arrayInfosDetalhes.email = email;
            arrayInfosDetalhes.telefone = telefone;
            arrayInfosDetalhes.municipio = municipio;
            arrayInfosDetalhes.uf = uf;
        }

        function preencheDadosIniciais() {
            $('#razaoSocialPrincipal').val(arrayInfosPrincipais.razaoSocial)
            $('#cnpjPrincipal').val(arrayInfosPrincipais.cnpj)
            $('#municipioPrincipal').val(arrayInfosPrincipais.municipio)
            $('#ufPrincipal').val(arrayInfosPrincipais.uf)

        }

        function preencheDadosDetalhes() {
            $('#razaoSocialDivDetalhes').val(arrayInfosDetalhes.razaoSocial)
            $('#principalAtividadeDivDetalhes').val(arrayInfosDetalhes.principalAtividade)
            $('#situacaoDivDetalhes').val(arrayInfosDetalhes.situacao)
            $('#presidenteDivDetalhes').val(arrayInfosDetalhes.presidente)
            $('#aberturaDivDetalhes').val(arrayInfosDetalhes.abertura)
            $('#emailDivDetalhes').val(arrayInfosDetalhes.email)
            $('#telefoneDivDetalhes').val(arrayInfosDetalhes.telefone)
            $('#municipioDivDetalhes').val(arrayInfosDetalhes.municipio)
            $('#ufDivDetalhes').val(arrayInfosDetalhes.uf)
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