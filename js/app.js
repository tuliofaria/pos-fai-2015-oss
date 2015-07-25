
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
          if(rejection.status==401){
            $location.path("/login");
            return $q.reject(rejection);
          }
        }
      };
    });

    app.config(['$httpProvider', function($httpProvider){
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
        [
            "$scope",
            "ClienteService",
            function($scope, ClienteService){
                $scope.novo = {
                    nome: "",
                    cpf_cnpj: ""
                };

                $scope.clientes = ClienteService.query();
                //ClienteService.update({ id: 1 });

                $scope.novoCliente = function(){
                    ClienteService.post($scope.novo, function(){
                        ClienteService.query(function(clientes){
                            $scope.clientes = clientes;
                        });
                    });
                    $scope.mostrarForm = false;
                }
                $scope.removeCliente = function(cliente){
                    ClienteService.delete({ id: cliente.id }, function(){
                        ClienteService.query(function(clientes){
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
        [
            "$scope",
            "$routeParams",
            "$location",
            "ClienteService",
            function($scope, $routeParams, $location, ClienteService){
                $scope.novo = {
                    nome: "",
                    cpf_cnpj: ""
                };
                $scope.novo = ClienteService.queryById({id: $routeParams.clienteId});

                $scope.salvarCliente = function(){
                    ClienteService.update($scope.novo, function(){
                        $location.path("/clientes");
                    });
                }
                
            }
        ]
    );

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

    app.factory('ClienteService', ['$resource',
      function($resource){
        return $resource('api.php?res=/cliente/:id', {}, {
          query:  { method: 'GET', params:{ id:'' }, isArray: true },
          queryById:  { method: 'GET', params:{ id: '@id' }, isArray: false },
          post:   { method: 'POST' },
          update: { method: 'PUT', params: { id: '@id'}},
          remove: { method: 'DELETE' }
        });
     }]);

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

  app.factory('OrdemService', ['$resource',
      function($resource){
        return $resource('api.php?res=/ordem/:id', {}, {
          query:  { method: 'GET', params:{ id:'' }, isArray: true },
          queryById:  { method: 'GET', params:{ id: '@id' }, isArray: false },
          post:   { method: 'POST' },
          update: { method: 'PUT', params: { id: '@id'}},
          remove: { method: 'DELETE' }
        });
     }]);
