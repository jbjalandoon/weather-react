import { useEffect, useState } from "react";
import useCountryContext from "../../hooks/CountryHooks";
import "./Content.css";
import ContentBody from "./chart/ContentBody";
import { CityData } from "../navigation/SearchContainer";
import ContentHeader from "./header/ContentHeader";
import SideContent from "./side/SideContent";
import Search from "../Search";

export type CurrentForecastData = {
  data: {
    temperatureAvg: number;
    weatherCode: number;
    apparentTemperature: number;
    windSpeed: number;
    relativeHumidity: number;
    cloudCover: number;
    isDay: number;
  };
  units: {
    temperatureAvg: string;
    weatherCode: string;
    apparentTemperature: string;
    windSpeed: string;
    relativeHumidity: string;
    cloudCover: string;
  };
};

export type HourlyForecastData = {
  units: {
    time: string;
    temperature: string;
    humidity: string;
    apparentTemperature: string;
    cloudCover: string;
    uvIndex: string;
  };
  data: {
    time: string[];
    temperature: number[];
    humidity: number[];
    apparentTemperature: number[];
    cloudCover: number[];
    uvIndex: number[];
  };
};

export type DailyForecastData = {
  data: {
    time: string[];
    weatherCode: number[];
    temperatureMax: number[];
    temperatureMin: number[];
    sunrise: string[];
    sunset: string[];
  };
  units: {
    time: string;
    weatherCode: string;
    temperatureMax: string;
    temperatureMin: string;
    sunrise: string;
    sunset: string;
  };
};

export type ForecastData = {
  current: CurrentForecastData;
  hourly: HourlyForecastData;
  daily: DailyForecastData;
};

function Content() {
  const { country } = useCountryContext();
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  async function fetchForecast(country: CityData | null) {
    if (country !== null) {
      const { latitude, longitude } = country;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,cloud_cover,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_hours=24`;
      // const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,cloud_cover,uv_index&forecast_days=1&forecast_hours=24`;
      const response = await fetch(url);

      const data = await response.json();
      return data;
    }
  }

  useEffect(() => {
    (async () => {
      if (country !== null) {
        const data = await fetchForecast(country);
        if (data) {
          const {
            current,
            current_units: currentUnits,
            hourly,
            hourly_units: hourlyUnits,
            daily,
            daily_units: dailyUnits,
          } = data;
          setForecastData({
            current: {
              data: {
                temperatureAvg: current.temperature_2m,
                weatherCode: current.weather_code,
                apparentTemperature: current.apparent_temperature,
                windSpeed: current.wind_speed_10m,
                relativeHumidity: current.relative_humidity_2m,
                cloudCover: current.cloud_cover,
                isDay: currentUnits.is_day,
              },
              units: {
                temperatureAvg: currentUnits.temperature_2m,
                weatherCode: currentUnits.weather_code,
                apparentTemperature: currentUnits.apparent_temperature,
                windSpeed: currentUnits.wind_speed_10m,
                relativeHumidity: currentUnits.relative_humidity_2m,
                cloudCover: currentUnits.cloud_cover,
              },
            },
            hourly: {
              units: {
                apparentTemperature: hourlyUnits.apparent_temperature,
                cloudCover: hourlyUnits.cloud_cover,
                humidity: hourlyUnits.relative_humidity_2m,
                temperature: hourlyUnits.temperature_2m,
                time: hourlyUnits.time,
                uvIndex: hourlyUnits.uv_index,
              },
              data: {
                apparentTemperature: hourly.apparent_temperature,
                cloudCover: hourly.cloud_cover,
                humidity: hourly.relative_humidity_2m,
                temperature: hourly.temperature_2m,
                time: hourly.time,
                uvIndex: hourly.uv_index,
              },
            },
            daily: {
              units: {
                time: dailyUnits.time,
                weatherCode: dailyUnits.weather_code,
                temperatureMax: dailyUnits.temperature_2m_max,
                temperatureMin: dailyUnits.temperature_2m_min,
                sunrise: dailyUnits.sunrise,
                sunset: dailyUnits.sunset,
              },
              data: {
                time: daily.time,
                weatherCode: daily.weather_code,
                temperatureMax: daily.temperature_2m_max,
                temperatureMin: daily.temperature_2m_min,
                sunrise: daily.sunrise,
                sunset: daily.sunset,
              },
            },
          });
        }
      }
    })();
  }, [country]);

  return (
    <div className="content-main container">
      <Search className={"search__main"} />
      <div className="content">
        <div className="content__main-forecast">
          <ContentHeader
            currentForecast={forecastData ? forecastData.current : null}
          />
          <ContentBody
            hourlyForecast={forecastData ? forecastData.hourly : null}
          />
        </div>
        <SideContent dailyForecast={forecastData ? forecastData.daily : null} />
      </div>
    </div>
  );
}

export default Content;
