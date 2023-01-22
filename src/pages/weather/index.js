
import Layout from '@/layouts/DefaultLayout';
import { post } from '@/services/api';
import { useEffect } from "react"
export default function Weather() {
  const positionError = () => { console.log("asd1") }
  const positionSuccess = async ({ coords }) => {
    const { status, data } = await post(`/api/weather/info`, {
      latitude: coords.latitude,
      longitude: coords.longitude
    })
    console.log({ status, data })
    // if (status == 200) { setState(data.record) }
    // setLoadingDetail(false)
  }
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
      /* geolocation is available */
    } else {
      /* geolocation IS NOT available */
    }
    // setLoadingDetail(true)
  }, [])
  return (
    <Layout>
      <div>About!</div>
    </Layout>
  )
}
