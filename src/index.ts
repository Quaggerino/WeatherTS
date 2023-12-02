import { getWeatherData } from './weatherModel';

const testWeatherData = async () => {
    try {
        const data = await getWeatherData();
        console.log('Weather Data:', data);
    } catch (error) {
        console.error('Error during test:', error);
    }
};

testWeatherData();