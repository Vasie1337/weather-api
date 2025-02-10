import { WeatherData } from "../types/weather";

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1';


export async function getWeatherData(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}
