import axios from 'axios'

const BASE = '/api/storage'

const getSetups = () => axios.get(`${BASE}/setups`).then(res => res.data)
const saveSetup = (setup) => axios.post(`${BASE}/setups`, setup).then(res => res.data)
const deleteSetup = (id) => axios.delete(`${BASE}/setups/${id}`).then(res => res.data)

export { getSetups, saveSetup, deleteSetup }