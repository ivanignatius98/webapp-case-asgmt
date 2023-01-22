import Spinner from "./Spinner"

export default function Loader({ content }) {
  return (
    <div className="absolute bg-white bg-opacity-60 top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <div className="flex items-center pb-48">
        <span className="text-xl font-semibold mr-4">{content || "Loading"}</span>
        <Spinner size={10} />
      </div>
    </div>
  )
}