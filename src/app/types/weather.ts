export interface WeatherData {
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
      lat: number;
      lon: number;
    };
    current: {
      temp_c: number;
      temp_f: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      wind_kph: number;
      wind_mph: number;
      wind_degree: number;
      wind_dir: string;
      pressure_mb: number;
      pressure_in: number;
      humidity: number;
      feelslike_c: number;
      feelslike_f: number;
      vis_km: number;
      uv: number;
      gust_kph: number;
      cloud: number;
    };
    forecast: {
      forecastday: {
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          avgtemp_c: number;
          maxwind_kph: number;
          totalprecip_mm: number;
          avghumidity: number;
          daily_chance_of_rain: number;
          condition: {
            text: string;
            icon: string;
            code: number;
          };
        };
        hour: {
          time: string;
          temp_c: number;
          condition: {
            text: string;
            icon: string;
          };
          chance_of_rain: number;
          humidity: number;
        }[];
      }[];
    };
  }
  