// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { post } from "@/services/api";

const baseUrl = "https://gclone-api-staging.up.railway.app/api/v1/user"
export default async function handler(req, res) {
  try {
    const { status, data, error, message } = await post(`${baseUrl}/login`, req.body);
    const token = data?.data?.token ?? ""
    const refreshToken = data?.data?.refreshToken ?? ""

    res.status(status).json({ token, refreshToken, error, message })
  } catch (e) {
    res.status(400).json(e.message)
  }
}
