// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { get } from "@/services/api";

const baseUrl = "https://gclone-api-staging.up.railway.app/api/v1/authors"
export default async function handler(req, res) {
  try {
    const { page = 1, limit = 10, keyword = "" } = req.query
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI3MjgyNTg4MzQ2ODI0ZWE4ZTM1ZWEiLCJ1c2VybmFtZSI6Iml2YW5oYW5kb2tvIiwicGFzc3dvcmQiOiIkMmEkMTAkenFyb0gwNk4wcXF0UnJJWmRBUHVDdS92SmRySkc0ck9KWVFTVm1vczVhcHVmYWNDRmE5c3kiLCJlbWFpbCI6InRlcnNlcmFoMjc0QGdtYWlsLmNvbSIsImlhdCI6MTY3NDIzMTM0MywiZXhwIjoxNjc0MjM0OTQzfQ.VfnhYsBc9TKFq4Sw3e3NKLLWwGVz6HZfT3PsPuxHROE"
    const { status, data, error, message } = await get(
      `${baseUrl}/all?page=${page}&limit=${limit}&search=${keyword}`,
      { "x-access-token": token }
    );
    console.log(data)
    const records = data?.data?.records ?? []
    const count = data?.data?.count ?? 0
    res.status(status).json({ records, count, error, message })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
