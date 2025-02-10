'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ForecastProps {
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
      };
      hour: {
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        chance_of_rain: number;
      }[];
    }[];
  };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function WeatherForecast({ forecast }: ForecastProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const hourlyData = forecast.forecastday[0].hour.map((hour) => ({
    time: new Date(hour.time).getHours(),
    temp: hour.temp_c,
    rain: hour.chance_of_rain,
  }));

  return (
    <div className="bg-zinc-900/95 rounded-xl p-4 sm:p-6 border border-zinc-800">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
          <h3 className="text-lg font-semibold text-white">Weather Forecast</h3>
          <Tab.List className="flex space-x-2 bg-zinc-800 rounded-lg p-1 self-start sm:self-auto">
            <Tab
              className={({ selected }) =>
                classNames(
                  'flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                  selected
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'
                )
              }
            >
              <CalendarDaysIcon className="w-4 h-4 mr-1" />
              Daily
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                  selected
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'
                )
              }
            >
              <ClockIcon className="w-4 h-4 mr-1" />
              Hourly
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panels>
          {/* Daily Forecast */}
          <Tab.Panel>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4">
              {forecast.forecastday.map((day) => {
                const date = new Date(day.date);
                return (
                  <div
                    key={day.date}
                    className="bg-zinc-800/50 rounded-lg p-2 sm:p-4 text-center"
                  >
                    <p className="text-zinc-400 text-xs sm:text-sm">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <img
                      src={day.day.condition.icon}
                      alt={day.day.condition.text}
                      className="w-8 h-8 sm:w-12 sm:h-12 mx-auto my-1 sm:my-2"
                    />
                    <div className="flex justify-center items-center gap-1 sm:gap-2 text-sm sm:text-base">
                      <span className="text-white font-bold">
                        {Math.round(day.day.maxtemp_c)}°
                      </span>
                      <span className="text-zinc-400">
                        {Math.round(day.day.mintemp_c)}°
                      </span>
                    </div>
                    <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-blue-400">
                      {day.day.daily_chance_of_rain}% rain
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab.Panel>

          {/* Hourly Forecast - replace with chart */}
          <Tab.Panel>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#71717a" 
                    tick={{ fill: '#71717a' }}
                    tickFormatter={(hour) => `${hour}:00`}
                  />
                  <YAxis 
                    yAxisId="temp"
                    stroke="#71717a" 
                    tick={{ fill: '#71717a' }}
                    tickFormatter={(value) => `${value}°`}
                  />
                  <YAxis 
                    yAxisId="rain"
                    orientation="right"
                    stroke="#71717a" 
                    tick={{ fill: '#71717a' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      border: '1px solid #27272a',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: '#71717a' }}
                    formatter={(value: number, name: string) => [
                      name === 'temp' ? `${value.toFixed(1)}°C` : `${value}%`,
                      name === 'temp' ? 'Temperature' : 'Rain Chance'
                    ]}
                    labelFormatter={(hour) => `${hour}:00`}
                  />
                  <Area
                    yAxisId="temp"
                    type="monotone"
                    dataKey="temp"
                    stroke="#f59e0b"
                    fill="url(#tempGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    yAxisId="rain"
                    type="monotone"
                    dataKey="rain"
                    stroke="#3b82f6"
                    fill="url(#rainGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
} 