import axios from 'axios'

const BASE = '/api/mail'

export const sendMail = (data) =>
  axios.post(`${BASE}/send`, data).then(res => res.data)