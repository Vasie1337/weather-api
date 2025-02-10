import {
  SunIcon,
  CloudIcon,
  EyeIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';

interface WeatherMetricsProps {
  current: {
    uv: number;
    cloud: number;
    vis_km: number;
    gust_kph: number;
  };
}

export default function WeatherMetrics({ current }: WeatherMetricsProps) {
  const getUVDescription = (uv: number) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  const getUVColor = (uv: number) => {
    if (uv <= 2) return 'text-green-400';
    if (uv <= 5) return 'text-yellow-400';
    if (uv <= 7) return 'text-orange-400';
    if (uv <= 10) return 'text-red-400';
    return 'text-purple-400';
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      <div className="bg-zinc-900/95 rounded-xl p-4 border border-zinc-800">
        <div className="flex items-center mb-2">
          <SunIcon className="w-5 h-5 text-yellow-400 mr-2" />
          <span className="text-zinc-400 text-sm">UV Index</span>
        </div>
        <div className="mt-2">
          <span className={`text-2xl font-bold ${getUVColor(current.uv)}`}>
            {current.uv}
          </span>
          <span className="text-zinc-400 text-sm ml-2">
            {getUVDescription(current.uv)}
          </span>
        </div>
      </div>

      <div className="bg-zinc-900/95 rounded-xl p-4 border border-zinc-800">
        <div className="flex items-center mb-2">
          <CloudIcon className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-zinc-400 text-sm">Cloud Cover</span>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold text-white">{current.cloud}</span>
          <span className="text-zinc-400 text-sm ml-2">%</span>
        </div>
      </div>

      <div className="bg-zinc-900/95 rounded-xl p-4 border border-zinc-800">
        <div className="flex items-center mb-2">
          <EyeIcon className="w-5 h-5 text-emerald-400 mr-2" />
          <span className="text-zinc-400 text-sm">Visibility</span>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold text-white">{current.vis_km}</span>
          <span className="text-zinc-400 text-sm ml-2">km</span>
        </div>
      </div>

      <div className="bg-zinc-900/95 rounded-xl p-4 border border-zinc-800">
        <div className="flex items-center mb-2">
          <BeakerIcon className="w-5 h-5 text-purple-400 mr-2" />
          <span className="text-zinc-400 text-sm">Gust Speed</span>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold text-white">
            {current.gust_kph}
          </span>
          <span className="text-zinc-400 text-sm ml-2">km/h</span>
        </div>
      </div>
    </div>
  );
} 