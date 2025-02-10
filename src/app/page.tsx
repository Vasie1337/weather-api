import { Suspense } from 'react';
import { getWeatherData } from './lib/weather';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';

interface SearchParams {
  city?: string | string[];
}

export default async function Home(
  props: {
    searchParams: Promise<SearchParams>;
  }
) {
  const searchParams = await props.searchParams;
  const getCityFromParams = async () => {
    try {
      const cityParam = await Promise.resolve(searchParams.city);
      if (typeof cityParam === 'string') {
        return cityParam;
      }
      if (Array.isArray(cityParam)) {
        return cityParam[0] || 'London';
      }
      return 'London';
    } catch (error) {
      console.error('Error parsing city parameter:', error);
      return 'London';
    }
  };

  const city = await getCityFromParams();

  let weatherData;
  try {
    weatherData = await getWeatherData(city);
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    throw new Error(`Failed to fetch weather data for ${city}`);
  }

  return (
    <main className="min-h-screen py-8 px-4 bg-gradient-to-b from-zinc-900 to-black">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Weather App</h1>
      <SearchBar />
      <Suspense fallback={
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      }>
        <WeatherDisplay weatherData={weatherData} />
      </Suspense>
    </main>
  );
}