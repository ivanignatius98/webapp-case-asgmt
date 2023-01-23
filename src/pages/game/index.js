
import Layout from '@/layouts/DefaultLayout';
import Loader from '@/modules/Loader';
import { useEffect, useState, useMemo } from 'react';
import { get } from "@/services/api"
export default function Game() {
  const [timer, setTimer] = useState(0)
  const [loading, setLoading] = useState(false)
  const [inputString, setInputString] = useState("")
  const [times, setTimes] = useState([])
  const [quote, setQuote] = useState("Friendship is the source of the greatest pleasures, and without friends even the most agreeable pursuits become tedious")

  const correct = useMemo(() => { return inputString.length == quote.length && inputString == quote }, [inputString, quote])
  const handleChange = ({ target }) => {
    setInputString(target.value)
    if (target.value.length == quote.length && target.value == quote) {
      setTimes((oldValue) => [...oldValue, timer])
      generateQuote()
    }
  }
  const generateQuote = async () => {
    const quoteLength = 120
    setLoading(true)
    setInputString("")
    setTimer(0)
    const { data } = await get("https://api.quotable.io/random", {}, {
      minLength: quoteLength,
      maxLength: quoteLength
    })
    setQuote(data.content)
    setLoading(false)
  }
  useEffect(() => {
    generateQuote()
    const id = setInterval(() => setTimer((oldCount) => oldCount + 1), 1000);
    return () => { clearInterval(id) }
  }, [])

  const renderQuote = (str) => {
    return str.length > 0 ?
      str.split("").map((letter, i) => {
        let color = ""
        if (inputString[i] == letter) {
          color = "text-green-400"
        } else if (inputString.length > i) {
          color = "text-red-400 underline"
        }
        return <span key={i} className={color}>{letter}</span>
      }) : ""
  }

  const classContainer = `w-max absolute z-10 top-[10px] right-[-16px] -translate-y-2 rounded  `
  return (
    <Layout>
      <div className='flex justify-center relative'>

        {times.length > 0 &&
          <div className={'bg-white max-w-md rounded-lg p-4 ' + classContainer}>
            <div className=' font-extrabold text-xl text-gray-500 text-center mb-3'>Previous Times</div>
            {times.map((row, i) => {
              return (<div key={i} className="font-bold text-md text-gray-500 mb-1">{i + 1}. You: {row}s</div>)
            })}
          </div>
        }
        <div className='bg-white shadow rounded-lg max-w-md p-10'>
          <div className=' font-extrabold text-5xl text-gray-500 text-center mb-6'>{timer}</div>
          {loading ? <Loader content="Loading New Quote" /> : <div className="">{renderQuote(quote)}</div>}
          <div className="mt-5 flex">
            <textarea
              rows={4}
              className="px-4 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              placeholder="Example book description"
              value={inputString}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </Layout >
  )
}
