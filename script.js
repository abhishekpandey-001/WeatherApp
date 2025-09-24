const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector(".search-btn");

const weatherInfoSection = document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city')
const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-text');
const conditionTxt = document.querySelector('.condition-text');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImage = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');
const forecastItemContainer = document.querySelector('.forecast-items-container');

const apiKey = 'e7cfa4620e2c7e67312f6ee3fcb9e191';

searchBtn.addEventListener('click', ()=>{
    if(cityInput.value.trim()!=''){
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur();
    }
})


cityInput.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter' && cityInput.value.trim()!=''){
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})


async function getFetchData(endPoint, city){
    const apiURL = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiURL)
    return response.json();
}

function getWeatherIcons(id){

    if(id<=232) return 'thunderstorm.svg'
    if(id<=321) return 'drizzle.svg'
    if(id<=531) return 'rain.svg'
    if(id<=622) return 'snow.svg'
    if(id<=781) return 'atmosphere.svg'
    if(id<=800) return 'clear.svg'
    else return 'clouds.svg'
}

function getCurrentDate(){
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-GB', options)
}


async function updateWeatherInfo(city){

    const weatherData = await getFetchData('weather', city);
    if(weatherData.cod!=200){
        showDisplaySection(notFoundSection)
        return 
    }

    console.log(weatherData);

    const {
        name: country,
        main: {temp, humidity},
        weather: [{id, main}],
        wind: {speed},
    }= weatherData;

    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + '°C';
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed+ ' M/s';
    currentDateTxt.textContent = getCurrentDate();
    weatherSummaryImage.src = `./assets/weather/${getWeatherIcons(id)}`

    await updateForecastInfo(city)
    showDisplaySection(weatherInfoSection)

}

async function updateForecastInfo(city){
    const forecastData = await getFetchData('forecast', city)
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]
    forecastItemContainer.innerHTML = ''
    forecastData.list.forEach(forecastWeather=>{
        if(forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather
    .dt_txt.includes(todayDate)){
            updateForecastItems(forecastWeather)
        }
    }) 
}

function updateForecastItems(weatherData){

    const {
        dt_txt: date,
        weather: [{id}],
        main: {temp}
    } = weatherData;

    const dateTaken = new Date(date)
    const dateOption = {
        day: '2-digit',
        month: 'short',

    }

    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption)
const forecastItem = `
                <div class="forecast-item">
                    <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
                    <img src="assets/weather/${getWeatherIcons(id)}" class="forecast-item-img">
                    <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
                </div>

`

forecastItemContainer.insertAdjacentHTML('beforeend', forecastItem)

}


function showDisplaySection(sectionToShow){
    [weatherInfoSection, searchCitySection, notFoundSection].forEach(sec => sec.style.display = 'none')
    sectionToShow.style.display = "flex"
}
