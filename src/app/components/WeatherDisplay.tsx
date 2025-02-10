import { WeatherData } from '../types/weather';
import WeatherCharts from './WeatherCharts';
import WeatherMetrics from './WeatherMetrics';
import { MapPinIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import WeatherForecast from './WeatherForecast';

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

export default function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  const { location, current } = weatherData;
  
  // Format the localtime
  const datetime = new Date(location.localtime);
  const formattedTime = datetime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedDate = datetime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Main Card */}
      <div className="p-8 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPinIcon className="w-5 h-5 text-zinc-400" />
              <h2 className="text-3xl font-bold text-white">
                {location.name}, {location.country}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-zinc-400">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>{formattedDate}</span>
              </div>
              <div className="hidden sm:block text-zinc-600">•</div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>{formattedTime}</span>
              </div>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end">
              <img
                src={`https:${current.condition.icon}`}
                alt={current.condition.text}
                className="w-16 h-16"
              />
              <div className="text-6xl font-bold text-white ml-4">{current.temp_c}°</div>
            </div>
            <p className="text-zinc-400 mt-1">{current.condition.text}</p>
          </div>
        </div>

        {/* Current Conditions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <span className="text-zinc-400 text-sm">Feels like</span>
            <div className="text-2xl font-bold text-white mt-1">{current.feelslike_c}°</div>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <span className="text-zinc-400 text-sm">Wind</span>
            <div className="text-2xl font-bold text-white mt-1">{current.wind_kph} km/h</div>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <span className="text-zinc-400 text-sm">Humidity</span>
            <div className="text-2xl font-bold text-white mt-1">{current.humidity}%</div>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <span className="text-zinc-400 text-sm">Pressure</span>
            <div className="text-2xl font-bold text-white mt-1">{current.pressure_mb} mb</div>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <WeatherForecast forecast={weatherData.forecast} />

      {/* Additional Metrics */}
      <WeatherMetrics current={current} />

      {/* Charts */}
      <WeatherCharts current={current} />
    </div>
  );
}
