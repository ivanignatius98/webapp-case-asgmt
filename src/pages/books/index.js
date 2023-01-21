import Layout from '@/layouts/DefaultLayout'
import DataTable from '@/modules/Datatable'
import { useState, useEffect } from 'react'
import moment from "moment"
import { post } from "@/services/api"
import { validateLogin } from "@/services/account"
import { getToken } from '@/services/account'

import Dialog from '@/modules/Dialog'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [selectedId, setSelectedId] = useState(false)

  const handleDelete = async () => {
    setIsOpen(false)
    const { status } = await post(
      "/api/books/delete",
      { oid: selectedId },
      { token: getToken() }
    )
    if (status == 200) {
      setRefresh(!refresh)
    }
  }
  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Author',
      selector: row => row.author?.name || "Unknown Author",
    },
    {
      name: 'Date Created',
      selector: row => moment(row.created_at).format("YYYY-MM-DD hh:mm:ss"),
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="md:inline-flex my-1 md:my-0 text-center rounded-md shadow-sm" role="group">
          <button
            onClick={() => { router.push(`/books/${row._id}/edit`) }}
            type="button"
            className="px-4 py-2 mb-1 md:mb-0 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded md:rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Edit
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-300 text-red-800 hover:bg-red-400 font-semibold rounded md:rounded-r-lg "
            onClick={() => {
              setSelectedId(row._id)
              setIsOpen(true)
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    // dev login
    validateLogin({ username: "ivanhandoko", password: "asd123" })
  }, [])

  return (
    <Layout>
      <DataTable
        url="/api/books/paging"
        columns={columns}
        postButton="/books/create"
        refresh={refresh}
      />
      <Dialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={handleDelete}
        title="Confirm Delete"
        content="This record will be deleted on confirm!"
        submitButtonText="Delete"
        dismissButtonText="Cancel"
      />
    </Layout >
  )
}
