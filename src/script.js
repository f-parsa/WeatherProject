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
    console.log(response);
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
  }
  
  function getTemperature(event){
    event.preventDefault();
    let searchInput = document.querySelector("#searchText");
    let city = searchInput.value.toLowerCase().trim();    
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&current.uvi&units=metric&appid=${apiKey}`;
    axios.get(apiURL).then(showInformation);
  }
  
  let searchForm = document.querySelector("#searchForm");
  searchForm.addEventListener("submit", getTemperature);
  
  //Get Current Position Info
  function handlePosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&current.uvi&units=metric&appid=${apiKey}`;
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
  }

  function convertTocelcius(event){
    event.preventDefault();
    let temperatureTag = document.querySelector("#temperatureTag");
    if (celcius < 10){
      temperatureTag.innerHTML = `0${celcius}`;
    }else{
      temperatureTag.innerHTML = celcius;
    }
  }
  let locationTag = document.querySelector("#locationTag");
  locationTag.addEventListener("click", currentLocation);

  let celcius = null;

  let fahrenheitTag = document.querySelector("#fahrenheitTag");
  fahrenheitTag.addEventListener("click", convertTofahrenheit);

  let celciusTag = document.querySelector("#celciusTag");
  celciusTag.addEventListener("click", convertTocelcius);