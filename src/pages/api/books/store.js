// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { post } from "@/services/api";
const axios = require('axios')

const baseUrl = "https://gclone-api-staging.up.railway.app/api/v1/books"
export default async function handler(req, res) {
  try {
    const { oid, ...payload } = req.body
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI3MjgyNTg4MzQ2ODI0ZWE4ZTM1ZWEiLCJ1c2VybmFtZSI6Iml2YW5oYW5kb2tvIiwicGFzc3dvcmQiOiIkMmEkMTAkenFyb0gwNk4wcXF0UnJJWmRBUHVDdS92SmRySkc0ck9KWVFTVm1vczVhcHVmYWNDRmE5c3kiLCJlbWFpbCI6InRlcnNlcmFoMjc0QGdtYWlsLmNvbSIsImlhdCI6MTY3NDIzMTM0MywiZXhwIjoxNjc0MjM0OTQzfQ.VfnhYsBc9TKFq4Sw3e3NKLLWwGVz6HZfT3PsPuxHROE"

    const image = await axios.get(payload.cover_image, {
      responseType: "arraybuffer",
    });

    payload.cover_image = Buffer.from(image.data).toString("base64")
    const endpoint = oid ? `${oid}/update`: "create"
    const { status, data, error, message } = await post(
      `${baseUrl}/${endpoint}`,
      payload,
      { "x-access-token": token }
    );
    console.log(data)
    res.status(status).json({ error, message })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
