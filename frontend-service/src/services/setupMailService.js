import axios from 'axios'

const BASE = '/api/mail'

const sendSetupMail = (data) => axios.post(`${BASE}/send`, data).then(res => res.data)

export { sendSetupMail }