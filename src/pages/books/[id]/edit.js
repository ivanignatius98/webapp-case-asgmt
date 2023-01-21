import Layout from '@/layouts/DefaultLayout';
import Form from '@/components/Dashboard/form';
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  return (
    <Layout>
      <Form id={router.query?.id} />
    </Layout>
  )
}
