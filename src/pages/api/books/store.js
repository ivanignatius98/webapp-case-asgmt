// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { post } from "@/services/api";

const baseUrl = "https://gclone-api-staging.up.railway.app/api/v1/books"
export default async function handler(req, res) {
  try {
    const { _id, cover_data, ...payload } = req.body
    const { token } = req.headers

    const endpoint = _id ? `${_id}/update` : "create"
    payload.cover = payload.cover_data
    payload.author = payload.author_data
    payload.categories = payload.categories_data

    const { status, data, error, message } = await post(
      `${baseUrl}/${endpoint}`,
      payload,
      { "x-access-token": token }
    );
    res.status(status).json({ error, message })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
