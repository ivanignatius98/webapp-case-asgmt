// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { get } from "@/services/api";

const baseUrl = "https://gclone-api-staging.up.railway.app/api/v1/books"
export default async function handler(req, res) {
  try {
    const { id } = req.query
    const { token } = req.headers
    const { status, data, error, message } = await get(`${baseUrl}/${id}/detail`, { "x-access-token": token });
    const record = data?.data?.record ?? null
    if (record) {
      record.author = record.author ? { value: record.author._id, label: record.author.name } : null
    }
    res.status(status).json({ record, error, message })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
