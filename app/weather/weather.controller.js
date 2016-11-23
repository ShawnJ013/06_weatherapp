(function() {
    'use strict';

    angular
        .module('app')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$http', 'toastr'];

    function WeatherController($http, toastr) {
      var vm = this;
    vm.callWeatherController = callWeatherController;
    vm.searchHistory = [];

    
      ////////////////////////////////
      
        
    
    /* @ngInject */
    function callWeatherController(city) {
        $http
          .get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=be8ee0f726c82cdb324f387227fd875d')
          .then(function(response){
            toastr.success('API call worked!', 'Origin Weather App: Success');
            
           vm.weatherinfo = response.data;
            vm.searchHistory.push({event: vm.weatherinfo.name,time: new Date(new Date().getTime()).toLocaleTimeString(), date: new Date(new Date().getTime()).toLocaleDateString()})
      
            
            vm.weatherinfo.main.temp = (vm.weatherinfo.main.temp * (9/5) - 459.67).toFixed(2);
            vm.weatherinfo.main.temp_min = (vm.weatherinfo.main.temp_min * (9/5) - 459.67).toFixed(2);
            vm.weatherinfo.main.temp_max = (vm.weatherinfo.main.temp_max * (9/5) - 459.67).toFixed(2);


            // console.log(vm.weatherinfo);
           
          
          })

      .catch(function(error) {
          toastr.error('API call failed. Not a valid city :(', 'Origin Weather App: Error');
      });
          

       
    }

    }
})();