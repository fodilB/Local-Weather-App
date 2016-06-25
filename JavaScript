$(document).ready(function() {
  
  geolocaliseMe();
  
  function geolocaliseMe()
  {
     $.get('http://ipinfo.io',
      function(location){
       console.log(location);
       $('#location')
       .append(location.city+", ")
       .append(location.region);

       var units =           getUnits(location.country);
       getWeather(location.loc,units);

     },"jsonp");
  
  }
  
  function getWeather(loc,units){
    longitude=loc.split(",")[1];
    latitude=loc.split(",")[0];
    var weatherApiUrl=        'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&units='+units+'&appid=e2db5b0453a25a492e87ad8b03046a7c';
    
    //81f79b3f3fe73146b6f264a5f25b6baf
    console.log(weatherApiUrl);
   $.get(weatherApiUrl,function(weather){
     var temper=weather.main.temp;
     var unitLabel;
     
      if (units === "imperial") {
        unitLabel = "F";
      } else {
        unitLabel = "C";
      }
     temper = parseFloat((temper).toFixed(1));
     console.log(weather);
     
     $('#icon').append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");
     
     $('#temper').append(temper + " " + unitLabel);
     
     $('#weather').append(weather.weather[0].description);
     
   }, "jsonp"); 
  };
  
    function getUnits(country) {
    var imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'];

    if (imperialCountries.indexOf(country) === -1) {
      var units = 'metric';
    } else {
      units = 'imperial';
    }

    console.log(country, units);
    return units;
  }
  
  
});
