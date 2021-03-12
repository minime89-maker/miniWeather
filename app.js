
const api = {
    key: '29571ad697bb54af0c8984f653a6c318',
    base: 'https://api.openweathermap.org/data/2.5/weather?',
};


/* Extract on User input */
const input = document.getElementById('input');
input.addEventListener('keypress', (event) => {
    if(event.keyCode == 13) {
        getWeather(input.value);
        const date = moment();
        document.getElementById('date').innerHTML = date.format('llll');
        document.querySelector('.container').style.display = 'block';
        document.querySelector('.main-weather').style.display = 'block'; 
        document.querySelector('.content').style.display= 'block';
        loadImg();
    } 
});

/* Weather Image */
function createImagesArray(data) {
    const imageNodes = [];
    for(let i = 0;i < data.results.length;i++){
      imageNodes[i] = document.createElement("div");
      imageNodes[i].className = "img";
      imageNodes[i].style.backgroundImage = "url("+data.results[i].urls.raw+")";
      document.getElementById("grid").insertAdjacentElement("beforeend", imageNodes[i]);
    }
  }
  
  // create the function for loadImg
  function loadImg() {
    removeImages();
    const url = "https://api.unsplash.com/search/photos?query='"+input.value+"'&per_page=9&client_id=Pwuo0Pbq3m332WiSLM_D3GnWwLzv8uvmbGOY_T-fGmc";
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => { 
      createImagesArray(data);
    });    
  }
  function removeImages(){
    var i = 0;
    var list = document.getElementById("grid");
    while(i < list.childNodes.length){
      list.removeChild(list.childNodes[i]);
    }
  }
  
/* Get Weather data from Api */
function getWeather(city){
    fetch(`${api.base}q=${city}&appid=${api.key}&units=metric`)
        .then((details) => {
            return details.json();
        })
        .then(showWeather);
}

function showWeather(details){
/* Main Weather Section */
    let city = document.getElementById('city');
    city.innerHTML = `${details.name}, ${details.sys.country}`;
    document.getElementById('img').src = `http://openweathermap.org/img/wn/${details.weather[0].icon}@4x.png`;
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(details.main.temp)}°C`;
    let minMax = document.getElementById('min-max');
    minMax.innerHTML = `&downarrow; ${Math.round(details.main.temp_min)}°  &uparrow; ${Math.round(details.main.temp_max)}°`;
    let weatherType = document.getElementById('weather-type');
    weatherType.innerHTML = `${details.weather[0].description}`;;
    let feelsLike = document.querySelector('.feel-value');
    feelsLike.textContent= `${Math.round(details.main.feels_like)}°`;

/* Weather details Section  */
    let pressure = document.querySelector('.pres-value');
    pressure.textContent = `${details.main.pressure}`;
    let humidity = document.querySelector('.hum-value');
    humidity.textContent = `${details.main.humidity}`;
    let windSpeed = document.querySelector('.wind-value');
    windSpeed.textContent = `${details.wind.speed}`;
    let windD = document.querySelector('.wd-value');
    windD.textContent = `${details.wind.deg}`;
     let unixSunrise = `${details.sys.sunrise}`;
     let dateNew = new Date(unixSunrise * 1000); //unix timestamp convert
     let hoursNew = dateNew.getHours();;
     let minutesNew = dateNew.getMinutes();
     let sunriseTime = `${hoursNew}:${minutesNew}`;
    let sunrise = document.querySelector('.sunrise-value');
    sunrise.textContent = `${sunriseTime}`;
    let unixSunset = `${details.sys.sunset}`;
    let date = new Date(unixSunset * 1000); //unix timestamp convert
    let hours = date.getHours();;
    let minutes = date.getMinutes();
    let sunsetTime = `${hours}:${minutes}`;
    let sunset = document.querySelector('.sunset-value');
    sunset.textContent = `${sunsetTime}`;

/* background change on Weather condition */
    let color = document.querySelector('.container');
    if(details.weather[0].description === 'overcast clouds' || details.weather[0].description === 'broken clouds'){
        document.body.style.backgroundColor = '#d8dee3';
    } else if (details.weather[0].description === 'scattered clouds') {
        document.body.style.backgroundColor = '#dfdedf';
    } else if (details.weather[0].description === 'few clouds') {
        document.body.style.backgroundColor = '#f0edde';
    } else if (details.weather[0].description === 'clear sky'){
        document.body.style.backgroundColor = '#fbedb3';
    } else if (details.weather[0].main === 'Atmosphere'){
        document.body.style.backgroundColor = '#dadbdf';   
    } else if (details.weather[0].main === 'Snow'){
        document.body.style.backgroundColor = '#e8e8e9';
    } else if (details.weather[0].description === 'light rain' || details.weather[0].description === 'moderate rain' || details.weather[0].description === 'heavy intensity rain' || details.weather[0].description === 'very havy rain' || details.weather[0].description === 'extreme rain'){
        document.body.style.backgroundColor = '#eff1dd';
    } else if (details.weather[0].description === 'light intensity shower rain' || details.weather[0].description === 'shower rain' || details.weather[0].description === 'heavy intensity shower rain' || details.weather[0].description === 'raged shower rain' || details.weather[0].main === 'Drizzle'){
        document.body.style.backgroundColor = '#e1e1d5';
    } else if(details.weather[0].description === 'freezing rain'){
        document.body.style.backgroundColor = '#e8e8e9';
    } else if (details.weather[0].main === 'Thunderstorm'){
        document.body.style.backgroundColor = '#5f696c';
    }
}

/* Weather on Location  */
let locate = document.querySelector('#locationBtn');
locate.addEventListener('click', () => {
    let long;
    let lat;
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api.key}&units=metric`;
            fetch(base).then((response) => {
                return response.json();
            })
            .then((details) => {
                showWeather(details);
                document.querySelector('.container').style.display = 'block';
                document.querySelector('.main-weather').style.display = 'block'; 
                document.querySelector('.content').style.display= 'block';
            })
        });
    }
})
