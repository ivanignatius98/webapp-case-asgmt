// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { get } from "@/services/api";

export default async function handler(req, res) {
  console.log(req.query)
  try {
    const { page = 1, limit = 10, keyword = "" } = req.query

    const { status, data, error, message } = await get("", `http://localhost:3335/api/v1/user/all`, {"x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI3MjgyNTg4MzQ2ODI0ZWE4ZTM1ZWEiLCJ1c2VybmFtZSI6Iml2YW5oYW5kb2tvIiwicGFzc3dvcmQiOiIkMmEkMTAkenFyb0gwNk4wcXF0UnJJWmRBUHVDdS92SmRySkc0ck9KWVFTVm1vczVhcHVmYWNDRmE5c3kiLCJlbWFpbCI6InRlcnNlcmFoMjc0QGdtYWlsLmNvbSIsImlhdCI6MTY3NDE0NTU2NiwiZXhwIjoxNjc0MTQ5MTY2fQ.2rl2BZ6HW9x6QDVUbzz-behzVCAx_lLU-1K55bqTNOU"});
    // const records = await Partner.query().datatable({ keyword }).paginate(page, limit)
    res.status(200).json({ status, data, error, message })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
