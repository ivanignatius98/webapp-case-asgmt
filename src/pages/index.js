import Head from 'next/head'
import Dashboard from '@/pages/dashboard';

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
