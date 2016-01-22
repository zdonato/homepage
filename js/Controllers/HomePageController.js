/**
 * Created by zdonato on 1/20/2016.
 */

homepage.controller('HomePageController', ['$scope', '$http', '$interval',
    function ($scope, $http, $interval) {

        $http.get('js/json/links.json')
            .success( function (response) {
                $scope.links = response;
            });

        $http.get('apiKey.txt')
            .success( function (response) {
                this.apiKey = response;

                getWeather();
            });

        var update = function () {
            $scope.currDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        };

        var getWeather = function() {

            $http.get('http://api.wunderground.com/api/2951699d2fd11ad7/forecast/geolookup/conditions/q/NJ/Hoboken.json')
                .success(function (response) {
                    var forecast = response.forecast.simpleforecast.forecastday[0];

                    $scope.weather = {
                        high : forecast.high.fahrenheit,
                        low: forecast.low.fahrenheit,
                        condition : forecast.conditions,
                        icon : forecast.icon_url
                    }
                })
                .error( function (error) {

                });
        };

        update();
        $interval(update, 1000);
    }
]);