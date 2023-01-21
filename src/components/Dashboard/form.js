import Layout from '@/layouts/DefaultLayout';
import TextInput from '@/modules/inputs/TextInput';
import FileInput from '@/modules/inputs/FileInput';
import SelectPaginate from '@/modules/inputs/SelectPaginate';
import { useState, useRef, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { post } from "@/services/api";
import { getToken } from '@/services/account';
import { get } from '@/services/api';
import { validate } from '@/helpers/validation';
import Dialog from '@/modules/Dialog';
import Spinner from '@/modules/Spinner';
const axios = require('axios')

export default function Dashboard(props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [errors, setErrors] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [state, setState] = useState({
    title: "",
    description: "",
    cover: "",
    author: "",
    fileRemoved: false
  });
  const formrules = {
    title: 'required',
    description: 'required',
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      fileRemoved: name == "cover",
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    const errors = []
    for (let key in formrules) {
      const err = validate(state[key], formrules[key], key[0].toUpperCase() + key.substring(1, key.length))
      if (err != "") {
        errors.push(err)
      }
    }
    if (errors.length == 0) {
      if (state.cover && state.fileRemoved) {
        const image = await axios.get(state.cover, {
          responseType: "arraybuffer",
        });
        state.cover_data = Buffer.from(image.data).toString("base64")
      } else if (state.fileRemoved) {
        state.cover_data = null
      } else {
        delete state.cover_data
      }
      state.author_data = state.author ? state.author?.value : null

      const { status } = await post("/api/books/store", state, { token: getToken() })
      if (status == 200) {
        router.push("/books")
      }
    } else {
      setIsOpen(true)
      setErrors(errors)
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoadingDetail(true)
    const getDetail = async () => {
      if (props.id != undefined) {
        const { status, data } = await get(`/api/books/${props.id}/detail`, { token: getToken() })
        if (status == 200) { setState(data.record) }
      }
      setLoadingDetail(false)
    }
    getDetail()
  }, [props.id])

  useMemo(() => {
    setErrorMessage(errors.map((str, i) => <span key={i}>{str}</span>))
  }, [errors])

  return (
    <>
      <Dialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={<div className='text-center mb-2'>{"Errors!"}</div>}
        content={errorMessage}
      />
      {loadingDetail &&
        <div className="absolute bg-white bg-opacity-60 top-0 left-0 w-full h-full z-50 flex items-center justify-center">
          <div className="flex items-center pb-48">
            <span className="text-xl font-semibold mr-4">Loading</span>
            <Spinner size={6} />
          </div>
        </div>
      }

      <div className="relative">
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
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <SelectPaginate
                      url={"/api/authors/paging"}
                      name="author"
                      value={state.author}
                      onChange={handleInputChange}
                      label="Author"
                      placeholder="Select Author..."
                      className="text-sm"
                    />
                  </div>
                </div>
                <div>
                  <FileInput label="Cover Image" name="cover" onChange={handleInputChange} existingPreview={state.cover} />
                </div>
              </div>
              <div className="flex flex-row w-full p-6 pt-2 justify-end">
                <button
                  className={"my-2 mr-1 rounded-lg px-4 py-1 text-sm leading-7 shadow-sm ring-1 disabled:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border border-gray-300 bg-white font-medium text-gray-700  hover:bg-gray-50  "}
                  type="button"
                  onClick={() => { router.back() }}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className={"disabled:bg-indigo-300 disabled:ring-0 inline-flex items-center my-2 mx-2 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading && <Spinner dark />}
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
