'use strict';

// Variables
let lon;
let lat;

let temperature = document.querySelector('.temp');
let windSpeed = document.querySelector('.wind');
let summary = document.querySelector('.summary');
let loc = document.querySelector('.location');
let icon = document.querySelector('.icon');

const kelvin = 273;

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      // API ID
      const api = 'c9f6251cee0b5b02d4f36a2e49e6e117';
      // API URL
      const base =
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
        `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df&` +
        '&lang=pl';

      // Calling the API
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          temperature.textContent = Math.floor(data.main.temp - kelvin) + '°C';
          summary.textContent = data.weather[0].description;
          loc.textContent = data.name;

          let icon1 = data.weather[0].icon;
          icon.innerHTML = `<img src='img/${icon1}.png' style= 'height:10rem'/>`;

          let windSpeed1 = data.wind.speed;
          const windSpeedInKm = (windSpeed1 * 3.6).toFixed(1);

          windSpeed.textContent = windSpeedInKm + ' km/h';
        });
    });
  }
});
