/**
 * Created by zdonato on 1/20/2016.
 */

homepage.controller('HomePageController', ['$scope', '$http',
    function ($scope, $http) {

        $http.get('../json/links.json')
            .success( function (response) {
                $scope.links = response.data;
            })
    }
]);