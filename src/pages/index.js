import Head from 'next/head'
import Dashboard from '@/pages/books';

export default function Home() {
  return (
    <>
      <Head>
        <title>App</title>
      </Head>
      <Dashboard />
    </>
  )
}
