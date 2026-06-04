import axios from 'axios'

const BASE = '/api/storage'

export const getSetups = () =>
  axios.get(`${BASE}/setups`).then(res => res.data)

export const saveSetup = (setup) =>
  axios.post(`${BASE}/setups`, setup).then(res => res.data)

export const deleteSetup = (id) =>
  axios.delete(`${BASE}/setups/${id}`).then(res => res.data)