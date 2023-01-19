import Layout from '@/layouts/DefaultLayout';
import TextInput from '@/modules/inputs/TextInput';
import { useState, useRef } from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
export default function Dashboard() {
  const fileRef = useRef(null)
  const [state, setState] = useState({
    title: "",
    description: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
    fetch("/api/books/paging?page=1&limit=10")
  };
  const classContainer = `w-max absolute z-10 bottom-[89%] right-[-16px] -translate-y-2 px-2 py-1 rounded flex items-center`
  return (
    <Layout>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Book</h3>
            <p className="mt-1 text-sm text-gray-600">
              This information will be displayed on the main page.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <TextInput
                      name="title"
                      label={"Title"}
                      value={state.title}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <TextInput
                    label={"Description"}
                    info="Brief description for your profile. URLs are hyperlinked."
                  >
                    <div className="mt-1">
                      <textarea
                        name="description"
                        rows={3}
                        className="px-4 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                        placeholder="Example book description"
                        value={state.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </TextInput>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                  <div
                    className="relative flex items-center"
                  >
                    <div className={classContainer + " cursor-pointer"} >
                      <AiFillCloseCircle size={22} color="red" />
                    </div>
                    <div
                      className="w-full cursor-pointer mt-1 flex justify-center rounded-md border border-gray-300 px-6 pt-5 pb-6"
                      onClick={() => { fileRef.current.click() }}
                    >
                      {/* <div className="space-y-1 text-center">
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
                        <input ref={fileRef} type="file" className="sr-only" />
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>*/}
                      <img className="object-contain h-52 w-full" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout >
  )
}
