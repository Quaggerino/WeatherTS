import { getWeatherData } from './weatherModel.js';

const kelvinToCelsius = (kelvin: number) => kelvin - 273.15;
const celsiusToFahrenheit = (celsius: number) => (celsius * 9/5) + 32;


const updateWeatherUI = async () => {
    try {
        const weatherData = await getWeatherData();
        const wrapper = document.querySelector('.wrapper') as HTMLElement; 

        const weatherCondition = weatherData.weather[0].main;

        let imageName;
        switch(weatherCondition) {
            case 'Clear':
                imageName = 'sunny.png'; 
                break;
            case 'Clouds':
                imageName = 'cloudy.png';
                break;
            case 'Rain':
                imageName = 'rainy.png';
                break;
        }

        if (imageName) {
            wrapper.style.backgroundImage = `url('img/${imageName}')`;
        }
        
        const temperatureElement = document.getElementById('temperature');
        if (temperatureElement) {
            const tempCelsius = kelvinToCelsius(weatherData.main.temp);
            const tempFahrenheit = celsiusToFahrenheit(tempCelsius);
            temperatureElement.innerText = `Temperature: ${tempCelsius.toFixed(1)}°C (${tempFahrenheit.toFixed(1)}°F)`;
        }
        const conditionsElement = document.getElementById('conditions');
        if (conditionsElement) {
            conditionsElement.innerText = `Conditions: ${weatherData.weather[0].main}`;
        }
        const pressureElement = document.getElementById('pressure');
        if (pressureElement) {
            pressureElement.innerText = `Pressure: ${weatherData.main.pressure} hPa`;
        }
        const humidityElement = document.getElementById('humidity');
        if (humidityElement) {
            humidityElement.innerText = `Humidity: ${weatherData.main.humidity}%`;
        }

        
        
    } catch (error) {
        console.error('Error updating the weather UI:', error);
    }
};


updateWeatherUI();
