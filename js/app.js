
    var app = angular.module("oss", ["ngResource"]);

    app.controller("ProdutosController", 
        [
            "$scope",
            "ClienteService",
            function($scope, ClienteService){
                // controller da aplicacao
                $scope.telefones = ClienteService.query();
                ClienteService.update({ id: 1 });

                $scope.novo = function(){
                    $scope.telefones.push({ddd: "35", num: "xxx"});
                }
            }
        ]
    );

    app.factory('ClienteService', ['$resource',
      function($resource){
        return $resource('api.php?res=/cliente/:id', {}, {
          query:  { method: 'GET', params:{ id:'' }, isArray: true },
          post:   { method: 'POST' },
          update: { method: 'PUT', params: { id: '@id'}},
          remove: { method: 'DELETE' }
        });
     }]);







   





