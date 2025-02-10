'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

interface WeatherChartsProps {
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    pressure_mb: number;
    cloud: number;
    uv: number;
  };
}

export default function WeatherCharts({ current }: WeatherChartsProps) {
  // Create sample data for demonstration
  // In a real app, you'd want to fetch historical or forecast data
  const generateHourlyData = (value: number, variance: number = 2) => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: value + (Math.random() - 0.5) * variance,
    }));
  };

  const tempData = generateHourlyData(current.temp_c, 4);
  const humidityData = generateHourlyData(current.humidity, 10);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mt-4 sm:mt-6">
      {/* Temperature Chart */}
      <div className="bg-zinc-900/95 rounded-xl p-3 sm:p-6 border border-zinc-800">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">Temperature Trend</h3>
          <div className="flex items-center text-emerald-400 text-xs sm:text-sm">
            <ArrowTrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
            <span>+2.3°</span>
          </div>
        </div>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tempData}>
              <defs>
                <linearGradient id="tempColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis
                dataKey="hour"
                stroke="#71717a"
                tick={{ fill: '#71717a' }}
                tickFormatter={(hour) => `${hour}:00`}
              />
              <YAxis stroke="#71717a" tick={{ fill: '#71717a' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#71717a' }}
                itemStyle={{ color: '#f59e0b' }}
                formatter={(value: number) => [`${value.toFixed(1)}°C`, 'Temperature']}
                labelFormatter={(hour) => `${hour}:00`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#f59e0b"
                fill="url(#tempColor)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Humidity Chart */}
      <div className="bg-zinc-900/95 rounded-xl p-3 sm:p-6 border border-zinc-800">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">Humidity Trend</h3>
          <div className="flex items-center text-red-400 text-xs sm:text-sm">
            <ArrowTrendingDownIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
            <span>-5%</span>
          </div>
        </div>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={humidityData}>
              <defs>
                <linearGradient id="humidityColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis
                dataKey="hour"
                stroke="#71717a"
                tick={{ fill: '#71717a' }}
                tickFormatter={(hour) => `${hour}:00`}
              />
              <YAxis stroke="#71717a" tick={{ fill: '#71717a' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#71717a' }}
                itemStyle={{ color: '#3b82f6' }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Humidity']}
                labelFormatter={(hour) => `${hour}:00`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="url(#humidityColor)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 