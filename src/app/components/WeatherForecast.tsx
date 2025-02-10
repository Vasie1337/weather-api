'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';

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

          {/* Hourly Forecast */}
          <Tab.Panel>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
              {forecast.forecastday[0].hour
                .filter((_, index) => index % 3 === 0)
                .map((hour) => {
                  const time = new Date(hour.time);
                  return (
                    <div
                      key={hour.time}
                      className="bg-zinc-800/50 rounded-lg p-2 sm:p-4"
                    >
                      <p className="text-zinc-400 text-xs sm:text-sm">
                        {time.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          hour12: true,
                        })}
                      </p>
                      <div className="flex items-center justify-center my-1 sm:my-2">
                        <img
                          src={hour.condition.icon}
                          alt={hour.condition.text}
                          className="w-8 h-8 sm:w-10 sm:h-10"
                        />
                        <span className="text-lg sm:text-xl font-bold text-white ml-2">
                          {Math.round(hour.temp_c)}°
                        </span>
                      </div>
                      <div className="text-[10px] sm:text-xs text-blue-400 text-center">
                        {hour.chance_of_rain}% rain
                      </div>
                    </div>
                  );
                })}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
} 