
    var app = angular.module("oss", ["ngResource", "ngRoute"]);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/clientes', {
            templateUrl: 'partials/clientes-list.html',
            controller: 'ClientesController'
          }).
          when('/cliente/:clienteId', {
            templateUrl: 'partials/clientes-edit.html',
            controller: 'ClientesEditController'
          }).
          otherwise({
            redirectTo: '/clientes'
          });
      }]);

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







   





