// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { get } from "@/services/api";

const baseUrl = "https://gclone-api-staging.up.railway.app/api/v1/authors"
export default async function handler(req, res) {
  try {
    const { page = 1, limit = 10, keyword = "" } = req.query
    const { token } = req.headers
    const { status, data, error, message } = await get(
      `${baseUrl}/all?page=${page}&limit=${limit}&search=${keyword}`,
      { "x-access-token": token }
    );
    const temp = data?.data?.records ?? []
    const records = []
    for (let row of temp) {
      records.push({ value: row._id, label: row.name })
    }
    res.status(status).json({ records, error, message })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
