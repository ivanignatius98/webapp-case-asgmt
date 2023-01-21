import { AiFillCloseCircle } from "react-icons/ai";
import { useState, useRef, useEffect, useMemo } from 'react'

const Input = ({ children, prependText, existingPreview = null, ...props }) => {
  const classContainer = `w-max absolute z-10 top-[0px] right-[-16px] -translate-y-2 px-2 py-1 rounded flex items-center`

  const fileRef = useRef(null)
  const [state, setState] = useState({
    data: null,
    remove: false,
    preview: null
  })

  const remove = () => {
    setState({
      data: null,
      remove: true,
      preview: ''
    })
    props.onChange({
      target: {
        name: props.name, value: null
      }
    })
  }
  const handleChange = (event) => {
    if (typeof event.target != 'undefined') {
      let data = event.target.files[0]
      let preview = ""
      if (event.target.files[0].type.includes('image')) {
        preview = URL.createObjectURL(data)
      }
      props.onChange({
        target: {
          name: props.name, value: preview
        }
      })

      setState({
        data,
        remove: true,
        preview
      })
    }
  }

  const loadImage = () => {
    return existingPreview && !state.preview ? "data:image/png;base64, " + existingPreview : state.preview
  }
  const image = useMemo(() => loadImage(), [existingPreview]);
  return (
    <div>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div
        className="relative flex items-center"
      >
        {image &&
          <button
            className={classContainer}
            onClick={() => { remove() }}
          >
            <AiFillCloseCircle size={22} color="red" />
          </button>
        }
        <div
          className="w-full  mt-1 flex justify-center rounded-md border border-gray-300 px-6 pt-5 pb-6"
        >
          {image ?
            <img className="object-contain h-52 w-full" src={image} />
            :
            <div
              className="space-y-1 text-center cursor-pointer"
              onClick={() => { fileRef.current.click() }}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                Upload an Image
                <input ref={fileRef} type="file" className="sr-only" onChange={handleChange} />
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

Input.defaultProps = {
  label: "",
  type: "text",
}
export default Input