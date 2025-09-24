const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener('click', ()=>{
    if(cityInput.value.trim()!=''){
        console.log(cityInput.value)
        cityInput.value = ''
        cityInput.blur();
    }
})


cityInput.addEventListener('key', (e)=>{
    if(e.key = 'Enter' && cityInput.value.trim()!=''){
        
    }
})