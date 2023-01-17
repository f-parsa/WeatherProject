//Get Date And Time
function getDateAndTime(){
    let weekDays= ["Sunday", "Monday", "Tuesday", "Wednsday", "Tursday","Friday", "Saturday"];
    let currentDate = new Date();
    let day = weekDays[currentDate.getDay()];
    let dateAndTime =day + " " + currentDate.getHours() + ":" + currentDate.getMinutes();
    return dateAndTime
  }
  let currentDateTag = document.querySelector("#currentDateTime");
  currentDateTag.innerHTML = getDateAndTime();
  
  //Get City And Temperature
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  
  function showInformation(response){
    console.log(response);
    let cityTag = document.querySelector("#cityTag");
    let temperatureTag = document.querySelector("#temperatureTag");
    let degree = Math.round(response.data.main.temp);
    temperatureTag.innerHTML = degree;
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
    console.log(sunrise);
    sunriseTag.innerHTML = sunrise.getHours() + ":" + sunrise.getMinutes() + " AM";
  
    let sunset = new Date(response.data.sys.sunset * 1000);
    let sunsetTag = document.querySelector("#sunsetTag");
    sunsetTag.innerHTML = sunset.getHours() + ":" + sunset.getMinutes() + " PM";
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
  let locationTag = document.querySelector("#locationTag");
  locationTag.addEventListener("click", currentLocation);