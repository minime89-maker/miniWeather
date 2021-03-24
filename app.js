const api={key:config.API_KEY,base:"https://api.openweathermap.org/data/2.5/weather?"},input=document.getElementById("input");function getWeather(e){fetch(`${api.base}q=${e}&appid=${api.key}&units=metric`).then(e=>e.json()).then(showWeather)}input.addEventListener("keypress",e=>{if(13==e.keyCode){getWeather(input.value);const e=moment();document.getElementById("date").innerHTML=e.format("llll"),document.querySelector(".container").style.display="block",document.querySelector(".main-weather").style.display="block",document.querySelector(".content").style.display="block",document.querySelector(".background").style.display="none"}});const brokenClouds=document.getElementById("broken-clouds"),scatteredClouds=document.getElementById("scattered-clouds"),fewClods=document.getElementById("few-clouds"),clearSky=document.getElementById("clear-sky"),atmosphere=document.getElementById("atmosphere"),snow=document.getElementById("snow"),rain=document.getElementById("rain"),frozing=document.getElementById("frozing-rain"),drizzle=document.getElementById("drizzle"),thunderstorm=document.getElementById("thunderstorm");function showWeather(e){document.getElementById("city").innerHTML=`${e.name}, ${e.sys.country}`,document.getElementById("temp").innerHTML=`${Math.round(e.main.temp)}°C`,document.getElementById("min-max").innerHTML=`&downarrow; ${Math.round(e.main.temp_min)}° &uparrow; ${Math.round(e.main.temp_max)}°`,document.getElementById("weather-type").innerHTML=`${e.weather[0].description}`,document.querySelector(".feel-value").textContent=`${Math.round(e.main.feels_like)}°`,document.querySelector(".pres-value").textContent=`${e.main.pressure}`,document.querySelector(".hum-value").textContent=`${e.main.humidity}`;let t=`${e.sys.sunrise}`,n=new Date(1e3*t),o=`${n.getHours()}:${n.getMinutes()}`;document.querySelector(".sunrise-value").textContent=`${o}`;let r=`${e.sys.sunset}`,s=new Date(1e3*r),a=`${s.getHours()}:${s.getMinutes()}`;document.querySelector(".sunset-value").textContent=`${a}`,"overcast clouds"===e.weather[0].description||"broken clouds"===e.weather[0].description?brokenClouds.style.display="block":brokenClouds.style.display="none","scattered clouds"===e.weather[0].description?scatteredClouds.style.display="block":scatteredClouds.style.display="none","few clouds"===e.weather[0].description?fewClods.style.display="block":fewClods.style.display="none","clear sky"===e.weather[0].description?clearSky.style.display="block":clearSky.style.display="none","Atmosphere"===e.weather[0].main?atmosphere.style.display="block":atmosphere.style.display="none","Snow"===e.weather[0].main?snow.style.display="block":snow.style.display="none","light rain"===e.weather[0].description||"moderate rain"===e.weather[0].description||"heavy intensity rain"===e.weather[0].description||"very havy rain"===e.weather[0].description||"extreme rain"===e.weather[0].description?rain.style.display="block":rain.style.display="none","light intensity shower rain"===e.weather[0].description||"shower rain"===e.weather[0].description||"heavy intensity shower rain"===e.weather[0].description||"raged shower rain"===e.weather[0].description||"Drizzle"===e.weather[0].main?drizzle.style.display="block":drizzle.style.display="none","freezing rain"===e.weather[0].description?frozing.style.display="block":frozing.style.display="none","Thunderstorm"===e.weather[0].main?thunderstorm.style.display="block":thunderstorm.style.display="none"}let locate=document.querySelector("#locationBtn");locate.addEventListener("click",()=>{let e,t;navigator.geolocation&&navigator.geolocation.getCurrentPosition(n=>{e=n.coords.longitude;const o=`https://api.openweathermap.org/data/2.5/weather?lat=${t=n.coords.latitude}&lon=${e}&appid=${api.key}&units=metric`;fetch(o).then(e=>e.json()).then(e=>{showWeather(e),document.querySelector(".container").style.display="block",document.querySelector(".main-weather").style.display="block",document.querySelector(".content").style.display="block"})})});