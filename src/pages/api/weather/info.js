// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { get } from "@/services/api";

function parseCurrentWeather({ current_weather, daily }) {
  const {
    temperature: currentTemp,
    windspeed: windSpeed,
    weathercode: iconCode,
  } = current_weather
  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
    precipitation_sum: [precip],
    rain_sum: [rain],
  } = daily

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    highFeelsLike: Math.round(maxFeelsLike),
    lowFeelsLike: Math.round(minFeelsLike),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 100) / 100,
    rain: Math.round(rain * 100) / 100,
    iconCode,
  }
}

function parseDailyWeather({ daily }) {
  return daily.time.map((time, idx) => {
    return {
      timestamp: time * 1000,
      iconCode: daily.weathercode[idx],
      maxTemp: Math.round(daily.temperature_2m_max[idx]),
      minTemp: Math.round(daily.temperature_2m_min[idx]),
      lowFeelsLike: Math.round(daily.apparent_temperature_min[idx]),
      // windSpeed: Math.round(windSpeed),
      precip: Math.round(daily.precipitation_sum[idx] * 100) / 100,
      rain: Math.round(daily.rain_sum[idx] * 100) / 100,
    }
  })
}

const url = "https://api.open-meteo.com/v1/forecast?latitude=-6.24&longitude=106.64&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum&current_weather=true&timeformat=unixtime&timezone=Asia%2FBangkok"
export default async function handler(req, res) {
  try {
    const { latitude, longitude } = req.body
    const { status, data, error, message } = await get(
      url, {}, { latitude, longitude }
    );
    // console.log(parseCurrentWeather(data))
    res.status(200).json({
      current: parseCurrentWeather(data),
      daily: parseDailyWeather(data),
      error,
      message
    })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
