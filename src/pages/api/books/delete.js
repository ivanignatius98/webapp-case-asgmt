// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import service from "@/services/api";

const baseUrl = "https://gclone-api-staging.up.railway.app/api/v1/books"
export default async function handler(req, res) {
  try {
    const { oid } = req.body
    const { token } = req.headers

    const { status, data, error, message } = await service.delete(
      `${baseUrl}/${oid}/delete`,
      { "x-access-token": token }
    );
    res.status(status).json({ error, message })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
