
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

app.controller("ClientesController",
        [
            "$scope",
            "ClienteService",
            function($scope, ClienteService) {
                $scope.novo = {
                    nome: "",
                    cpf_cnpj: ""
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

app.controller("ClientesEditController",
        [
            "$scope",
            "$routeParams",
            "$location",
            "ClienteService",
            function($scope, $routeParams, $location, ClienteService) {
                $scope.novo = {
                    nome: "",
                    cpf_cnpj: ""
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

                $scope.produtos = ProdutoService.query();

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

                $scope.salvarProduto = function() {
                    ProdutoService.update($scope.novo, function() {
                        $location.path("/produtos");
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

                $scope.cardapios = CardapioService.query({id: $routeParams.produtoId});
                $scope.produto = ProdutoService.queryById({id: $routeParams.produtoId});
                $scope.produtos = ProdutoService.query();

                $scope.novoCardapio = function() {
                    CardapioService.post($scope.novo, function() {
                        CardapioService.query(function(cardapios) {
                            $scope.cardapios = cardapios;
                        });
                    });
                    $scope.mostrarForm = false;
                }
                $scope.removeCardapio = function(cardapio) {
                    CardapioService.delete({id: cardapio.id}, function() {
                        CardapioService.query(function(cardapios) {
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
                $scope.novo = CardapioService.queryAll({produto:$routeParams.produtoId, id: $routeParams.cardapioId});                
                $scope.produtos = ProdutoService.query();


                $scope.salvarCardapio = function() {
                    CardapioService.update($scope.novo, function() {
                        $location.path("/cardapios");
                    });
                }

            }
        ]
        );

app.factory('CardapioService', ['$resource',
    function($resource) {
        return $resource('api.php?res=/cardapio/:id', {}, {
            query: {method: 'GET', params: {id: '@id'}, isArray: true},
            queryById: {method: 'GET', params: {id: '@id'}, isArray: false},
            queryAll: {method: 'GET', params: {produto: '@produto',id: '@id'}, isArray: true},
            post: {method: 'POST'},
            update: {method: 'PUT', params: {id: '@id'}},
            remove: {method: 'DELETE'}
        });
    }]);
