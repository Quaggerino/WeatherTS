const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const LAT = '-33.0246';
const LON = '-71.5518';

import config from './config.js';

const APPID = config.API_KEY;

export const getWeatherData = async () => {
    try {
        const response = await fetch(`${API_URL}?lat=${LAT}&lon=${LON}&appid=${APPID}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);

    }
};
