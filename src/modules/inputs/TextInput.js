
import { Fragment } from 'react'
const Input = ({ children, prependText, ...props }) => {
  return (
    <>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div className={(prependText ? "flex" : "block") + (children || "shadow-sm") + " mt-1 rounded-md"}>
        {prependText &&
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 cursor-default">
            {prependText}
          </span>
        }
        {children ??
          <input
            name={props.name}
            type={props.type}
            className={(prependText ? "rounded-none rounded-r-md" : "rounded") + " px-3 py-2 block w-full flex-1 focus:border-indigo-500 focus:ring-indigo-500 border border-gray-300 sm:text-sm"}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />}
      </div>
      {props.info ?
        <p className="mt-1 text-sm text-gray-500">
          {props.info}
        </p> :
        null
      }
    </>
  )
}

Input.defaultProps = {
  label: "",
  type: "text",
}
export default Input