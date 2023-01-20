import Layout from '@/layouts/DefaultLayout';
import TextInput from '@/modules/inputs/TextInput';
import FileInput from '@/modules/inputs/FileInput';
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  console.log(router.query)
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
          <div className="shadow sm:overflow-hidden sm:rounded-md bg-white">
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
                  info="Brief description for your book."
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
                <FileInput label="Cover Image" name="cover_image" onChange={handleInputChange} />
              </div>
            </div>
            <div className="flex flex-row w-full p-6 pt-2 justify-end">
              <button
                className={"my-2 mr-1 rounded-lg px-4 py-1 text-sm leading-7 shadow-sm ring-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border border-gray-300 bg-white font-medium text-gray-700  hover:bg-gray-50  "}
                type="button"
                onClick={() => { router.back() }}
              >
                Cancel
              </button>
              <button
                className={"my-2 mx-2 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}
                type="button"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}
