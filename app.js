const meteo = document.querySelector(".meteo");
const result = document.querySelector(".result");
const input = document.querySelector("input");
const error = document.querySelector(".error");
const wrongcity = document.querySelector(".wrongcity");
const temperature = document.querySelector(".temp");
const typeweather = document.querySelector(".typeweather");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const feels = document.querySelector(".temp2");
const humidity = document.querySelector(".numhumidity")
const weather = document.querySelector(".weather");
const arrowleft = document.querySelector(".return");


console.log(result);


window.addEventListener("keypress", (e) => {
    if(e.key == "Enter" && input.value){

        fetchApi(input.value);
        input.value = "";
}
})


async function fetchApi(city){
    let api = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=ceebed1c901f0190b16c0b6c35d02acf';
    fetch(api)
    .then(response => response.json())
    .then(data => details(data))
}

function details(info){
    if(info.cod == "404"){
        alert("This city does not exist.");
    }
    else{
        console.log("oui");
        error.classList.remove("active");
        meteo.classList.add("none");
        result.classList.add("active");
        temperature.textContent = Math.floor(info.main.temp);
        typeweather.textContent = info.weather[0].description;
        city.textContent = info.name;
        country.textContent = info.sys.country;
        feels.textContent = Math.floor(info.main.feels_like);
        humidity.textContent = Math.floor(info.main.humidity);
        const id = info.weather[0].id;
        if(id <= 200 && id >= 232){
            weather.src = "img/storm.png"
        }
        else if(id <= 500 && id >= 531){
            weather.src = "img/rain.png"
        }
        else if(id <= 600 && id >= 622){
            weather.src = "img/snowy.png"
        }
        else if(id == 800){
            weather.src = "img/sun.png"
        }
        else if(id <= 801 && id >= 804){
            weather.src = "img/cloud.png"
        }
    }
}


arrowleft.addEventListener("click", () => {
    meteo.classList.remove("none");
    result.classList.remove("active");
})