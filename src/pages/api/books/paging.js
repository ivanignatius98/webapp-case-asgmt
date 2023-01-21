// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { get } from "@/services/api";

const baseUrl = "https://gclone-api-staging.up.railway.app/api/v1/books"
export default async function handler(req, res) {
  try {
    const { page = 1, limit = 10, keyword = "" } = req.query
    const { token } = req.headers
    const { status, data, error, message } = await get(`${baseUrl}/all?page=${page}&limit=${limit}&search=${keyword}`, { "x-access-token": token });
    const records = data?.data?.records ?? []
    const count = data?.data?.count ?? 0
    res.status(status).json({ records, count, error, message })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
