import config from './config.js';

export const getWeatherData = async () => {
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const APPID = config.API_KEY;
    const LAT = '-33.0246';
    const LON = '-71.5518';
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

export const fetchAirQualityData = async (lat: string, lon: string): Promise<any> => {
    const API_URL = 'https://api.airvisual.com/v2/nearest_city';
    const API_KEY = config.API_KEY2;

    try {
        const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching air quality data:', error);
        return null; 
    }
};