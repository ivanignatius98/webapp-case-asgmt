
import { useEffect, useState } from "react"
import { ICON_MAP } from "@/services/iconMap"
import { LABEL_MAP } from '@/services/labelMap'
import { post } from '@/services/api'
import Layout from '@/layouts/DefaultLayout'
import Loader from '@/modules/Loader'

export default function Weather() {
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState({})
  const positionError = () => {
    getWeatherInfo()
  }
  const positionSuccess = async ({ coords }) => {
    getWeatherInfo(coords)
    // if (status == 200) { setState(data.record) }
    // setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
      /* geolocation is available */
    } else {
      /* geolocation IS NOT available */
    }

  }, [])
  const getWeatherInfo = async ({ latitude = "-6.25", longitude = "106.61" }) => {
    const { status, data } = await post(`/api/weather/info`, {
      latitude: latitude,
      longitude: longitude
    })
    if (status == 200) {
      setWeather((prevProps) => ({
        ...prevProps,
        current: data.current,
        daily: data.daily,
        selected: null
      }))
    }
    setLoading(false)
  }
  function getIconUrl(iconCode) {
    return `icons/${ICON_MAP.get(iconCode)}.svg`
  }
  const renderDailyCard = ({ daily, selected }) => {
    const DAY_PARSER = new Intl.DateTimeFormat(undefined, { weekday: "short" })
    return (
      <div className="flex overflow-x-scroll py-4 ">
        <div className="flex flex-nowrap ml-4">
          {daily.map((day, i) => {
            return (
              <div className="inline-block px-1 cursor-pointer" key={i} onClick={() => {
                setWeather((prevProps) => ({
                  ...prevProps,
                  selected: selected && selected.timestamp == day.timestamp ? null : day,
                }))
              }}>
                <div className="border-2 max-w-xs rounded-lg pt-1 text-center">
                  <div className='px-2 text-center'>
                    <div className="text-xs font-bold text-gray-900">{DAY_PARSER.format(day.timestamp)}</div>
                    <div className='flex justify-center my-1'>
                      <img className="w-5 h-5" src={getIconUrl(day.iconCode) || "icons/sun.svg"} />
                    </div>
                    <div className="text-xs text-gray-500"><strong>{day.maxTemp}°</strong>/{day.minTemp}°</div>
                  </div>
                  <div className={"h-1 " + (day.timestamp == selected?.timestamp ? "bg-blue-500 rounded-b-lg" : "")}></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    )
  }
  const renderCurrentWeather = ({ current, selected }) => {
    const wth = selected || current
    const DAY_PARSER = new Intl.DateTimeFormat(undefined, { weekday: "long" })

    return (
      <div className='grid grid-cols-2'>
        <div className="px-4 py-5 sm:px-6 col-span-1">
          <div className="text-lg text-gray-900">{wth.timestamp ? DAY_PARSER.format(wth.timestamp) : "Now"}</div>
          <div className='flex'>
            <div className="text-4xl font-bold text-gray-900">{wth.currentTemp || wth.minTemp}°</div>
            <img className="w-9 h-9 pt-2" src={getIconUrl(wth.iconCode) || "icons/sun.svg"} />
          </div>
          <p className="mt-1 max-w-2xl text-xs text-gray-500">Feels like {wth.lowFeelsLike}°</p>
        </div>
        <div className="px-4 py-7 sm:px-6 col-span-1 text-right">
          <div className="text-xs font-bold text-gray-900">{LABEL_MAP.get(wth.iconCode) || "Sunny"}</div>
          <div className="mt-1 max-w-2xl text-xs text-gray-500">Precip: {wth.precip}%</div>
          <div className="mt-1 max-w-2xl text-xs text-gray-500">Wind: {wth.windSpeed || "-"} km/h</div>
          <div className="mt-1 max-w-2xl text-xs text-gray-500">Rain sum: {wth.rain}</div>
        </div>
      </div>
    )
  }
  return (
    <Layout>
      {loading ? <Loader content="Loading" /> :
        <div className="overflow-hidden max-w-xl bg-white shadow rounded-lg">
          {weather.current &&
            <>
              {renderCurrentWeather(weather)}
              <div className="border-t border-gray-200">
                {renderDailyCard(weather)}
              </div>
            </>}
        </div>
      }
    </Layout>
  )
}
