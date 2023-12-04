declare var L: any;
import { getWeatherData, fetchAirQualityData } from './weatherModel.js';

const updateWeatherUI = async () => {
    try {
        const weatherData = await getWeatherData();

        const wrapper = document.querySelector('.wrapper') as HTMLElement; 
        const wrapper2 = document.querySelector('.wrapper2') as HTMLElement; 

        const weatherCondition = weatherData.weather[0].main;

        // Extract coordinates from weatherData
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;

        const lat2 = weatherData.coord.lat.toString();
        const lon2 = weatherData.coord.lon.toString();

        const airQualityData = await fetchAirQualityData(lat2, lon2);
        console.log('Air Quality Data:', airQualityData);

        // Initialize the map
        var map = L.map('map').setView([lat, lon], 13);

        // OpenStreetMap for the background
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Marker depending on the latitude and longitude from the API
        L.marker([lat, lon]).addTo(map);

        // Switch images dynamically depending on the weather condition
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
        let imageName2;

        if (airQualityData.data.current.pollution.aqius < 50) {
            imageName2 = '1.png';
        } else if (airQualityData.data.current.pollution.aqius < 100) {
            imageName2 = '2.png';
        } else {
            imageName2 = '3.png';
        }

        function capitalizeFirstLetter(str: string): string {
            if (str.length === 0) return str;
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        // Apply the image depending on the weather condition

        if (imageName) {
            wrapper.style.backgroundImage = `url('img/${imageName}')`;
        }

        if (imageName2) {
            wrapper2.style.backgroundImage = `url('img/${imageName2}')`;
        }
        
        // Weather API specific information

        // For temperature conversions
        const kelvinToCelsius = (kelvin: number) => kelvin - 273.15;
        const celsiusToFahrenheit = (celsius: number) => (celsius * 9/5) + 32;

        const temperatureElement = document.getElementById('temperature');
        if (temperatureElement) {
            const tempCelsius = kelvinToCelsius(weatherData.main.temp);
            const tempFahrenheit = celsiusToFahrenheit(tempCelsius);
            temperatureElement.innerText = `Temperature: ${tempCelsius.toFixed(1)}°C (${tempFahrenheit.toFixed(1)}°F)`;
        }
        const feels_likeElement = document.getElementById('feels_like');
        if (feels_likeElement) {
            const tempCelsius = kelvinToCelsius(weatherData.main.feels_like);
            const tempFahrenheit = celsiusToFahrenheit(tempCelsius);
            feels_likeElement.innerText = `Feels like: ${tempCelsius.toFixed(1)}°C (${tempFahrenheit.toFixed(1)}°F)`;
        }
        const temp_minElement = document.getElementById('temp_min');
        if (temp_minElement) {
            const tempCelsius = kelvinToCelsius(weatherData.main.temp_min)*0.9;
            const tempFahrenheit = celsiusToFahrenheit(tempCelsius)*0.9;
            temp_minElement.innerText = `Minimum: ${tempCelsius.toFixed(1)}°C (${tempFahrenheit.toFixed(1)}°F)`;
        }
        const temp_maxElement = document.getElementById('temp_max');
        if (temp_maxElement) {
            const tempCelsius = kelvinToCelsius(weatherData.main.temp_max)*1.1;
            const tempFahrenheit = celsiusToFahrenheit(tempCelsius)*1.1;
            temp_maxElement.innerText = `Maximum: ${tempCelsius.toFixed(1)}°C (${tempFahrenheit.toFixed(1)}°F)`;
        }
        const conditionsElement = document.getElementById('conditions');
        if (conditionsElement) {
            conditionsElement.innerText = `Conditions: ${weatherData.weather[0].main}`;
        }

        const descriptionElement = document.getElementById('description');
        if (descriptionElement) {
            const description = weatherData.weather[0].description;
            const capitalizedDescription = capitalizeFirstLetter(description);
            descriptionElement.innerText = `Description: ${capitalizedDescription}`;
        }

        const windSpeedElement = document.getElementById('speed');
        if (windSpeedElement) {
            // Convert wind speed from m/s to km/h
            const windSpeedKmH = weatherData.wind.speed * 3.6;
            windSpeedElement.innerText = `Wind Speed: ${windSpeedKmH.toFixed(1)} km/h`;
        }
        const humidityElement = document.getElementById('humidity');
        if (humidityElement) {
            humidityElement.innerText = `Humidity: ${weatherData.main.humidity}%`;
        }
        const pressureElement = document.getElementById('pressure');
        if (pressureElement) {
            pressureElement.innerText = `Pressure: ${weatherData.main.pressure} hPa`;
        }
        
        // Air quality API specific information

        const qualityElement = document.getElementById('quality');
        if (qualityElement) {
            qualityElement.innerText = `Air Quality: ${airQualityData.data.current.pollution.aqius}`;
        }

        
        
    } catch (error) {
        console.error('Error updating the weather UI:', error);
    }
};

// Drag and Move Function for the Weather Card

const makeDraggable = (element: HTMLElement) => {
    let startX: number, startY: number;
    let startRight: number, startTop: number;

    const dragStart = (e: MouseEvent) => {
        startX = e.clientX;
        startY = e.clientY;

        const rect = element.getBoundingClientRect();
        startRight = window.innerWidth - rect.right;
        startTop = rect.top;

        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    };

    const dragMove = (e: MouseEvent) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const newRight = startRight - dx;
        const newTop = startTop + dy;

        element.style.right = `${newRight}px`;
        element.style.top = `${newTop}px`;
    };

    const dragEnd = () => {
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
    };

    element.addEventListener('mousedown', dragStart);
};

// Apply to both weather cards
const weatherCard = document.querySelector('.weather-card') as HTMLElement;
const weatherCard2 = document.querySelector('.weather-card2') as HTMLElement;

if (weatherCard) makeDraggable(weatherCard);
if (weatherCard2) makeDraggable(weatherCard2);


updateWeatherUI();
