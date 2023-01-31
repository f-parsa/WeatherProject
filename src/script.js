//Get Date And Time
function getDateAndTime(){
    let weekDays= ["Sunday", "Monday", "Tuesday", "Wednsday", "Tursday","Friday", "Saturday"];
    let currentDate = new Date();
    let day = weekDays[currentDate.getDay()];
    let hours = currentDate.getHours();
    if (hours < 10){
      hours = `0${hours}`;
    }
    let minutes = currentDate.getMinutes();
    if (minutes < 10){
      minutes = `0${minutes}`;
    }
    let dateAndTime =day + " " + hours + ":" + minutes;
    return dateAndTime
  }
  let currentDateTag = document.querySelector("#currentDateTime");
  currentDateTag.innerHTML = getDateAndTime();
  
  
 

  //Get City And Temperature and ...
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  
  function showInformation(response){
    // console.log(response);
    let cityTag = document.querySelector("#cityTag");
    let temperatureTag = document.querySelector("#temperatureTag");
    celcius = Math.round(response.data.main.temp);
    if (celcius < 10){
      temperatureTag.innerHTML = `0${celcius}`;
    }else{

      temperatureTag.innerHTML = celcius;
    }
    cityTag.innerHTML = response.data.name;
    
    let description = document.querySelector("#descriptionTag");
    description.innerHTML = response.data.weather[0].description;
    
    let humidityTag = document.querySelector("#humidityTag");
    humidityTag.innerHTML = response.data.main.humidity;
  
    let visibilityTag = document.querySelector("#visibilityTag");
    visibilityTag.innerHTML = response.data.visibility/1000;
  
    let feelslikeTag = document.querySelector("#feelslikeTag");
    feelslikeTag.innerHTML = response.data.main.feels_like;
  
    let windSpeedTag = document.querySelector("#windSpeedTag");
    windSpeedTag.innerHTML = response.data.wind.speed;
  
    let sunriseTag = document.querySelector("#sunriseTag");
    let sunrise = new Date(response.data.sys.sunrise * 1000);
    sunriseTag.innerHTML = sunrise.getHours() + ":" + sunrise.getMinutes() + " AM";
  
    let sunset = new Date(response.data.sys.sunset * 1000);
    let sunsetTag = document.querySelector("#sunsetTag");
    sunsetTag.innerHTML = sunset.getHours() + ":" + sunset.getMinutes() + " PM";

    let weatherIconTag = document.querySelector("#weatherIcon");
    let iconNum = response.data.weather[0].icon;
    weatherIconTag.setAttribute("src", `http://openweathermap.org/img/wn/${iconNum}@2x.png`)

    let pressureTag = document.querySelector("#pressureTag");
    pressureTag.innerHTML = response.data.main.pressure;
    
    getForecast(response.data.coord);
    getChart(response.data.coord);
  }

  function formatDate(date){
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = new Date(date * 1000);
    return days[day.getDay()]; 
  }


  //Show Information of forecast days
  function showForecast(response){
    let forecastTag = document.querySelector("#forecastTag");
    
    let forecastDays = response.data.daily;
    let forecastHtml ="";
    forecastDays.forEach(function (forecast, index){
      if (index < 5){
               
      forecastHtml = forecastHtml + `
        <div class="d-flex justify-content-around flex-fill border m-1 p-1">
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weatherIcon1" class="weatherIcon">
          <span id="weekDay1">${formatDate(forecast.dt)}</span>
          <span id="maxTag">${Math.round(forecast.temp.max)}°</span>
          <span id="minTag">${Math.round(forecast.temp.min)}°</span>
        </div>
        `;
      }
    });
    forecastTag.innerHTML = forecastHtml;
    
  }
  
  //get information of forecast days
  function getForecast(coordinates){
    let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`;
    axios.get(apiURL).then(showForecast);
    
  }

function formatHour(data){
  let hours =[];
  for (let i=0; i<5; i++){
    let hour = new Date(data[i].dt * 1000);
    hours[i] = hour.getHours();
  }

  return hours;

}

//Show Charts
function showCharts(response){
  console.log(response);
  //windChart

  var xValues = formatHour(response.data.hourly);
  var yValuesWind = [];
  for (let i=0 ; i<5 ; i++){
    yValuesWind[i] = response.data.hourly[i].wind_speed;
  }
    var windChart = new Chart("windChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{ 
              color: "rgba(255,255,255,0.7)",
              borderColor: "rgba(255,255,255,0.5)",
              data: yValuesWind
              }]
        },
        options: {
            legend:{
              display: false
            }
        }
      });
  
  let yValuesUV = [];
  for (let i=0; i<5; i++){
    yValuesUV[i] = response.data.hourly[i].uvi;
  }

  var uvChart = new Chart("uvChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{ 
          color: "rgba(255,255,255,0.7)",
          borderColor: "rgba(255,255,255,0.5)",
          data: yValuesUV
          }]
    },
    options: {
        legend:{
          display: false
        }
    }
  });

}

//get charts Info
  function getChart(coordinates){
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=daily,minutely&units=metric&appid=${apiKey}`;
    axios.get(apiURL).then(showCharts)
    
  }

  function getTemperature(event){
    event.preventDefault();
    let searchInput = document.querySelector("#searchText");
    let city = searchInput.value.toLowerCase().trim();    
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiURL).then(showInformation);
  }
  
  let searchForm = document.querySelector("#searchForm");
  searchForm.addEventListener("submit", getTemperature);
  
  //Get Current Position Info
  function handlePosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    axios.get(apiURL).then(showInformation);
  }
  function currentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(handlePosition);
  }
  function convertTofahrenheit(event){
    event.preventDefault();
    let fahrenheit = (celcius * 9/5) + 32;
    let temperatureTag = document.querySelector("#temperatureTag");
    temperatureTag.innerHTML = Math.round(fahrenheit);

    fahrenheitTag.classList.add("active");
    celciusTag.classList.remove("active");
  }

  function convertTocelcius(event){
    event.preventDefault();
    let temperatureTag = document.querySelector("#temperatureTag");
    if (celcius < 10){
      temperatureTag.innerHTML = `0${celcius}`;
    }else{
      temperatureTag.innerHTML = celcius;
    }

    celciusTag.classList.add("active");
    fahrenheitTag.classList.remove("active");
  }
  let locationTag = document.querySelector("#locationTag");
  locationTag.addEventListener("click", currentLocation);

  let celcius = 00;

  let fahrenheitTag = document.querySelector("#fahrenheitTag");
  fahrenheitTag.addEventListener("click", convertTofahrenheit);

  let celciusTag = document.querySelector("#celciusTag");
  celciusTag.addEventListener("click", convertTocelcius);

  //google map
  let map;

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }
  
  window.initMap = initMap;