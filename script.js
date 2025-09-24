const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector(".search-btn");

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


async function updateWeatherInfo(city){

    const weatherData = await getFetchData('weather', city);
    console.log(weatherData);

}