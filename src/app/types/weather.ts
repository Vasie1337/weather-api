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
  }
  