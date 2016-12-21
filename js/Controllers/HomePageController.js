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

                // Get the current coordinates.
                navigator.geolocation.getCurrentPosition( function (pos) {
                    var lat = pos.coords.latitude,
                        long = pos.coords.longitude;

                    getLocation(lat, long)
                        .then( function (obj) {

                            console.log(obj.state, obj.city);
                            getWeather(obj.state, obj.city);
                        })
                });
            });

        var update = function () {
            $scope.currDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        };

        var getLocation = function(lat, long) {
            return new Promise( function(resolve, reject) {
                $http.get('http://api.wunderground.com/api/' + this.apiKey + '/geolookup/q/' + lat + ',' + long + '.json')
                    .success( function (response) {
                        var obj = {
                            city: response.location.city,
                            state: response.location.state
                        };

                        $scope.city = obj.city;

                        resolve(obj);
                    })
            });
        };

        var getWeather = function(state, city) {

            $http.get('http://api.wunderground.com/api/' + this.apiKey + '/forecast/geolookup/conditions/q/' + state + '/' + city + '/.json')
                .success(function (response) {
                    var forecast = response.forecast.simpleforecast.forecastday[0];

                    $scope.weather = {
                        high : forecast.high.fahrenheit,
                        low: forecast.low.fahrenheit,
                        condition : forecast.conditions,
                        icon : forecast.icon_url,
                        currentIcon : response.current_observation.icon_url,
                        currentCondition : response.current_observation.weather,
                        currentTemp : response.current_observation.temp_f,
                        forecastLink : response.current_observation.forecast_url + '?apiref=d2081443386915b3',
                        feelsLike : response.current_observation.feelslike_f
                    }
                })
                .error( function (error) {

                });
        };

        $scope.checkKey = function ($event) {
            if ($event.which === 13) {
                document.getElementById("champggLink").click();
            }
        };

        update();
        $interval(update, 1000);
    }
]);
