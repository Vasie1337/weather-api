# Weather Forecast App

A modern weather forecast application built with Next.js 14, featuring real-time weather data, interactive charts, and a responsive design.

## Features

- Real-time weather data from WeatherAPI
- Interactive temperature and humidity trend charts
- 7-day weather forecast
- Responsive design for all devices
- City search functionality
- Dynamic weather metrics display

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Heroicons
- **Fonts**: Geist Sans & Geist Mono
- **API**: WeatherAPI

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your WeatherAPI key:
```env
WEATHER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The following environment variables are required:

- `WEATHER_API_KEY`: Your WeatherAPI API key

## API Reference

This project uses the WeatherAPI for weather data. You can get an API key by signing up at [WeatherAPI.com](https://www.weatherapi.com/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
