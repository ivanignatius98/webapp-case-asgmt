import Layout from '@/layouts/DefaultLayout';

import DataTable from '@/modules/Datatable';
import { useState, useRef } from 'react'
import moment from "moment"

export default function Dashboard() {
  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Date Created',
      selector: row => moment(row.created_at).format("YYYY-MM-DD hh:mm:ss"),
    },
  ];

  return (
    <Layout>
      <DataTable
        url="/api/books/paging"
        columns={columns}
        postButton="/books/create"
      />
    </Layout >
  )
}
