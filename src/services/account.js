import service from './api'
import crypto from 'crypto'
import moment from 'moment'
const APP_KEY = 'LOREM-IPSUM-HEX'

export const validateLogin = async ({ username, password }) => {
  return new Promise(async (resolve) => {
    const { status, data } = await service.post("/api/user/login", { username, password });
    if (status !== 200) {
      resolve({ acknowledge: false });
    } else {
      const userPayload = data;
      userPayload.token_time = moment().format("YYYY-MM-DD kk:mm:ss");

      const cipher = crypto.createCipher("aes-256-cbc", APP_KEY);
      let crypted = cipher.update(JSON.stringify(userPayload), "utf-8", "hex");
      crypted += cipher.final("hex");
      localStorage.setItem("user", crypted);
      resolve({ acknowledge: true });
    }
  });
};


export const getToken = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return {}
  }
  let decipher = crypto.createDecipher("aes-256-cbc", APP_KEY);
  let decrypted = decipher.update(user, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  const data = JSON.parse(decrypted)
  return data.token
}