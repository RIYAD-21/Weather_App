const apikey="75dfac837ef67fed88fa8c370ede863d";
const cityName = document.getElementById('city');
const weatherData = document.getElementById('Info');
const formData = document.querySelector('form');

formData.addEventListener('submit', (e)=>{ 
    e.preventDefault();//to avoid refreshing of the page 
    const city = cityName.value;
    getWeatherData(city);
});

async function getWeatherData(city){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon; 
        const details= [
            `Feels like: ${Math.round(data.main.feels_like)}`,	
            `Humidity: ${data.main.humidity}`,
            `Wind Speed: ${data.wind.speed}`,
        ];
        weatherData.querySelector('.weatherIcon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon">`;
        weatherData.querySelector('.temperature').textContent = `${temp}°C`;
        weatherData.querySelector('.weatherDesc').textContent = `${desc}`;
        weatherData.querySelector('.weatherInfo').innerHTML= details.map(detail=>`<div>${detail}</div>`).join('');
    } catch (error) {
        weatherData.querySelector(".weatherInfo").innerHtml = "";
        weatherData.querySelector(".temperature").textContent = "";
        weatherData.querySelector(".weatherDesc").textContent = "City not found";
        weatherData.querySelector(".weatherInfo").textContent = "";
    }
}