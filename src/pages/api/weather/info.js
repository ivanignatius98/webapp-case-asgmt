// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { get } from "@/services/api";

const url = "https://api.open-meteo.com/v1/forecast?latitude=-6.24&longitude=106.64&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=Asia%2FBangkok"
export default async function handler(req, res) {
  try {
    console.log(req.body)
    const { latitude, longitude } = req.body
    const { status, data, error, message } = await get(
      url, {}, { latitude, longitude }
    );

    // console.log(data)
    res.status(status).json({ data, error, message })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
