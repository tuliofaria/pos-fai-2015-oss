
var app = angular.module("oss", ["ngResource", "ngRoute"]);

// register the interceptor as a service
app.factory('authInterceptor', function($q, $location) {
    return {
        /*/ optional method
         'request': function(config) {
         // do something on success
         return config;
         },
         
         // optional method
         'requestError': function(rejection) {
         // do something on error
         if (canRecover(rejection)) {
         return responseOrNewPromise
         }
         return $q.reject(rejection);
         },
         
         
         
         // optional method
         'response': function(response) {
         // do something on success
         console.log("intercepted!");
         return response;
         },*/

        // optional method
        'responseError': function(rejection) {
            // do something on error
            /*if (canRecover(rejection)) {
             return responseOrNewPromise
             }*/
            if (rejection.status == 401) {
                $location.path("/login");
                return $q.reject(rejection);
            }
        }
    };
});

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/login', {
                    templateUrl: 'partials/clientes-list.html',
                    //controller: 'ClientesController'
                }).
                when('/clientes', {
                    templateUrl: 'partials/clientes-list.html',
                    controller: 'ClientesController'
                }).
                when('/cliente/:clienteId', {
                    templateUrl: 'partials/clientes-edit.html',
                    controller: 'ClientesEditController'
                }).
                when('/produtos', {
                    templateUrl: 'partials/produtos-list.html',
                    controller: 'ProdutosController'
                }).
                when('/produto/:produtoId', {
                    templateUrl: 'partials/produtos-edit.html',
                    controller: 'ProdutosEditController'
                }).
                when('/cardapios/:produtoId', {
                    templateUrl: 'partials/cardapios-list.html',
                    controller: 'CardapiosController'
                }).
                when('/cardapio/:produtoId/:cardapioId', {
                    templateUrl: 'partials/cardapios-edit.html',
                    controller: 'CardapiosEditController'
                }).
                otherwise({
                    redirectTo: '/clientes'
                });
    }]);
          when('/login', {
            templateUrl: 'partials/clientes-list.html',
            //controller: 'ClientesController'
          }).

          when('/clientes', {
            templateUrl: 'partials/clientes-list.html',
            controller: 'ClientesController'
          }).
          when('/ordens', {
            templateUrl: 'partials/ordem-servico-list.html',
            controller: 'OrdemServicoController'
          }).
          when('/cliente/:clienteId', {
            templateUrl: 'partials/clientes-edit.html',
            controller: 'ClientesEditController'
          }).

          when('/equipamentos',{
            templateUrl: 'partials/equipamentos-list.html',
            controller: 'EquipamentosController'
          }).
          when('/equipamento/:equipamentoId',{
            templateUrl: 'partials/equipamentos-edit.html',
            controller:'EquipamentosEditController'
          }).

          when('/ordens',{
            templateUrl: 'partials/ordens-list.html',
            controller: 'OrdensController'
          }).
          when('/ordem/:ordemId',{
            templateUrl: 'partials/ordens-edit.html',
            controller:'OrdensEditController'
          }).


		  when('/funcionarios',{
			templateUrl: 'partials/funcionarios-list.html',
			controller: 'FuncionariosController'
		  }).
		  when('/funcionario/:funcionarioId',{
			templateUrl: 'partials/funcionarios-edit.html',
			controller: 'FuncionariosEditController'
		  }).
          otherwise({
            redirectTo: '/clientes'
          });
      }]);

    app.controller("OrdensController", 
        [
            "$scope",
            "OrdemService",
            function($scope, OrdemService){
                $scope.novaordem = {
                    data_abertura: "",
                    data_finalizado: "",
                    valor: "",
                    contato_id: "",
                    cliente_id: ""
                };

                $scope.ordens = OrdemService.query();
                $scope.novaOrdem = function(){
                    OrdemService.post($scope.novaordem, function(){
                        OrdemService.query(function(ordens){
                            $scope.ordens = ordens;
                        });
                    });
                    $scope.mostrarForm = false;
                }
                $scope.removeOrdem = function(ordem){
                    OrdemService.delete({ id: ordem.id }, function(){
                        OrdemService.query(function(ordens){
                            $scope.ordens = ordens;
                        });
                    });
                }
            }
        ]
    );

    app.controller("EquipamentosController", 
        [
            "$scope",
            "EquipamentoService",
            function($scope, EquipamentoService){
                $scope.novoeqp = {
                    nome: "",
                    descricao: "",
                    patrimonio: "",
                    observacoes: "",
                    cliente_id: "",
                    contato_id: ""
                };

                $scope.equipamentos = EquipamentoService.query();
                $scope.novoEquipamento = function(){
                    EquipamentoService.post($scope.novoeqp, function(){
                        EquipamentoService.query(function(equipamentos){
                            $scope.equipamentos = equipamentos;
                        });
                    });
                    $scope.mostrarForm = false;
                }
                $scope.removeEquipamento = function(equipamento){
                    EquipamentoService.delete({ id: equipamento.id }, function(){
                        EquipamentoService.query(function(equipamentos){
                            $scope.equipamentos = equipamentos;
                        });
                    });
                }
            }
        ]
    );

    app.controller("ClientesController", 
app.controller("ClientesController",
        [
            "$scope",
            "ClienteService",
            function($scope, ClienteService) {
                $scope.novo = {
                    nome: "",
                    cpf_cnpj: "",
					email:"",
					observacoes:""
                };

                $scope.clientes = ClienteService.query();
                //ClienteService.update({ id: 1 });

                $scope.novoCliente = function() {
                    ClienteService.post($scope.novo, function() {
                        ClienteService.query(function(clientes) {
                            $scope.clientes = clientes;
                        });
                    });
                    $scope.mostrarForm = false;
                }
                $scope.removeCliente = function(cliente) {
                    ClienteService.delete({id: cliente.id}, function() {
                        ClienteService.query(function(clientes) {
                            $scope.clientes = clientes;
                        });
                    });
                }
            }
        ]
        );

// controller

    app.controller("OrdensEditController", 
        [
            "$scope",
            "$routeParams",
            "$location",
            "OrdemService",
            function($scope, $routeParams, $location, OrdemService){
                $scope.novaordem = {
                    data_abertura: "",
                    data_finalizado: "",
                    valor: "",
                    contato_id: "",
                    cliente_id: ""
                };
                $scope.novaordem = OrdemService.queryById({id: $routeParams.ordemId});

                $scope.salvarOrdem = function(){
                    OrdemService.update($scope.novaordem, function(){
                        $location.path("/ordens");
                    });
                }
                
            }
        ]
    );

    app.controller("ClientesEditController", 
app.controller("ClientesEditController",
        [
            "$scope",
            "$routeParams",
            "$location",
            "ClienteService",
            function($scope, $routeParams, $location, ClienteService) {
                $scope.novo = {
                    nome: "",
                    cpf_cnpj: "",
					email:"",
					observacoes:"",
                };
                $scope.novo = ClienteService.queryById({id: $routeParams.clienteId});

                $scope.salvarCliente = function() {
                    ClienteService.update($scope.novo, function() {
                        $location.path("/clientes");
                    });
                }

            }
        ]
        );

app.factory('ClienteService', ['$resource',
    function($resource) {
    app.controller("EquipamentosEditController", 
        [
            "$scope",
            "$routeParams",
            "$location",
            "EquipamentoService",
            function($scope, $routeParams, $location, EquipamentoService){
                $scope.novoeqp = {
                    nome: "",
                    descricao: "",
                    patrimonio: "",
                    observacoes: ""
                };
                $scope.novoeqp = EquipamentoService.queryById({id: $routeParams.equipamentoId});

                $scope.salvarEquipamento = function(){
                    EquipamentoService.update($scope.novoeqp, function(){
                        $location.path("/equipamentos");
                    });
                }
            }
        ]
    );


// service

    //Ordem de Servico CONTROLLER -> NESSE CARA IREMOS FAZER INSERT, READ, DELETE
    app.controller("OrdemServicoController", 
        [
            "$scope",
            "OrdemServicoService",
            function($scope, OrdemServicoService){
                $scope.novo = {
                    valor: ""
                };

                $scope.ordens = OrdemServicoService.query();
                //ClienteService.update({ id: 1 });
                //INSERIR NOVA ORDEM DE SERVICO
                $scope.novaOrdemServico = function(){
                    OrdemServicoService.post($scope.novo, function(){
                        OrdemServicoService.query(function(ordens){
                            $scope.ordens = ordens;
                        });
                    });
                    $scope.mostrarForm = false;
                }
                //EXCLUIR A ORDEM DE SERVICO
                $scope.removeOrdemServico = function(ordem){
                    OrdemServicoService.delete({ id: ordem.id }, function(){
                        OrdemServicoService.query(function(os){
                            $scope.os = os;
                        });
                    });
                }
            }
        ]
    );

    app.factory('ClienteService', ['$resource',
      function($resource){
        return $resource('api.php?res=/cliente/:id', {}, {
            query: {method: 'GET', params: {id: ''}, isArray: true},
            queryById: {method: 'GET', params: {id: '@id'}, isArray: false},
            post: {method: 'POST'},
            update: {method: 'PUT', params: {id: '@id'}},
            remove: {method: 'DELETE'}
        });
    }]);

app.controller("ProdutosController",
        [
            "$scope",
            "ProdutoService",
            function($scope, ProdutoService) {
                $scope.novo = {
                    nome: ""
                };
    app.factory('EquipamentoService', ['$resource',
      function($resource){
        return $resource('api.php?res=/equipamento/:id', {}, {
          query:  { method: 'GET', params:{ id:'' }, isArray: true },
          queryById:  { method: 'GET', params:{ id: '@id' }, isArray: false },
          post:   { method: 'POST' },
          update: { method: 'PUT', params: { id: '@id'}},
          remove: { method: 'DELETE' }
        });
     }]);

                $scope.produtos = ProdutoService.query();
/** Funcionários **/
     app.factory('OrdemServicoService', ['$resource',
      function($resource){
        return $resource('api.php?res=/ordens/:id', {}, {
          query:  { method: 'GET', params:{ id:'' }, isArray: true },
          queryById:  { method: 'GET', params:{ id: '@id' }, isArray: false },
          post:   { method: 'POST' },
          update: { method: 'PUT', params: { id: '@id'}},
          remove: { method: 'DELETE' }
        });
     }]);

app.controller("FuncionariosController", 
        [
            "$scope",
            "FuncionarioService",
            function($scope, FuncionarioService){
                $scope.novo = {
                    nome: "",
                    email: "",
					senha:""
                };
                $scope.novoProduto = function() {
                    ProdutoService.post($scope.novo, function() {
                        ProdutoService.query(function(produtos) {
                            $scope.produtos = produtos;
                        });
                    });
                    $scope.mostrarForm = false;
                }
                $scope.removeProduto = function(produto) {
                    ProdutoService.delete({id: produto.id}, function() {
                        ProdutoService.query(function(produtos) {
                            $scope.produtos = produtos;
                        });
                    });
                }
            }
        ]
        );

                $scope.funcionarios = FuncionarioService.query();
                //ClienteService.update({ id: 1 });
app.controller("ProdutosEditController",
        [
            "$scope",
            "$routeParams",
            "$location",
            "ProdutoService",
            function($scope, $routeParams, $location, ProdutoService) {
                $scope.novo = {
                    nome: ""
                };
                $scope.novo = ProdutoService.queryById({id: $routeParams.produtoId});

                $scope.novoFuncionario = function(){
                    FuncionarioService.post($scope.novo, function(){
                        FuncionarioService.query(function(funcionarios){
                            $scope.funcionarios = funcionarios;
                        });
                    });
                    $scope.mostrarForm = false;
                }
                $scope.removeFuncionario = function(funcionario){
                    FuncionarioService.delete({ id: funcionario.id }, function(){
                        FuncionarioService.query(function(funcionarios){
                            $scope.funcionarios = funcionarios;
                        });
                    });
                }
            }
        ]
    );
                $scope.salvarProduto = function() {
                    ProdutoService.update($scope.novo, function() {
                        $location.path("/produtos");
                    });
                }

	app.controller("FuncionariosEditController", 
        [
            "$scope",
            "$routeParams",
            "$location",
            "FuncionarioService",
            function($scope, $routeParams, $location, FuncionarioService){
                $scope.novo = {
                    nome: "",
                    email: "",
					senha:""
                };
                $scope.novo = FuncionarioService.queryById({id: $routeParams.funcionarioId});
            }
        ]
        );

                $scope.salvarFuncionario = function(){
                    FuncionarioService.update($scope.novo, function(){
                        $location.path("/funcionarios");
                    });
                }
                
            }
        ]
    );

app.factory('ProdutoService', ['$resource',
    function($resource) {
        return $resource('api.php?res=/produto/:id', {}, {
            query: {method: 'GET', params: {id: ''}, isArray: true},
            queryById: {method: 'GET', params: {id: '@id'}, isArray: false},
            post: {method: 'POST'},
            update: {method: 'PUT', params: {id: '@id'}},
            remove: {method: 'DELETE'}
        });
    }]);
    app.factory('FuncionarioService', ['$resource',
      function($resource){
        return $resource('api.php?res=/funcionario/:id', {}, {
          query:  { method: 'GET', params:{ id:'' }, isArray: true },
          queryById:  { method: 'GET', params:{ id: '@id' }, isArray: false },
          post:   { method: 'POST' },
          update: { method: 'PUT', params: { id: '@id'}},
          remove: { method: 'DELETE' }
        });
     }]);

   


app.controller("CardapiosController",
        [
            "$scope",
            "$routeParams",
            "CardapioService",
            "ProdutoService",
            function($scope, $routeParams, CardapioService, ProdutoService) {
                $scope.novo = {
                    qtd: "",
                    produto_id: $routeParams.produtoId,
                    cardapio_id: ""
                };

                $scope.cardapios = CardapioService.query({produto: $routeParams.produtoId});
                $scope.produto = ProdutoService.queryById({id: $routeParams.produtoId});
                $scope.produtos = ProdutoService.query();

                $scope.novoCardapio = function() {
                    CardapioService.post($scope.novo, function() {
                        CardapioService.query({produto: $routeParams.produtoId}, function(cardapios) {
                            $scope.cardapios = cardapios;
                        });
                    });
                    $scope.mostrarForm = false;
                }
                $scope.removeCardapio = function(cardapio) {
                    CardapioService.delete({id: cardapio.id}, function() {
                        CardapioService.query({id: $routeParams.produtoId}, function(cardapios) {
                            $scope.cardapios = cardapios;
                        });
                    });
                }
            }
        ]
        );

app.controller("CardapiosEditController",
        [
            "$scope",
            "$routeParams",
            "$location",
            "CardapioService",
            "ProdutoService",
            function($scope, $routeParams, $location, CardapioService, ProdutoService) {
                $scope.novo = {
                    qtd: "",
                    produto_id: "",
                    cardapio_id: "",
                    produto: ""
                };

                $scope.novo = CardapioService.queryById({produto: $routeParams.produtoId, id: $routeParams.cardapioId});
                $scope.produto = ProdutoService.queryById({id: $routeParams.produtoId});
                $scope.produtos = ProdutoService.query();

                $scope.salvarCardapio = function() {
                    CardapioService.update($scope.novo, function() {
                        $location.path("/produtos");
                    });
                }
            }
        ]
        );

app.factory('CardapioService', ['$resource',
    function($resource) {
        return $resource('api.php?res=/cardapio/:produto/:id', {}, {
            query: {method: 'GET', params: {produto: '@produto', id: ''}, isArray: true},
            queryById: {method: 'GET', params: {produto: '@produto', id: '@id'}, isArray: false},
            post: {method: 'POST'},
            update: {method: 'PUT', params: {produto: '@produto', id: '@id'}},
            remove: {method: 'DELETE'}
        });
    }]);
