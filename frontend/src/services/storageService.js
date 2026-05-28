import axios from 'axios' // HTTP-Client für API-Aufrufe

const BASE = '/api/storage' // Basis-URL für den Storage-Service

// Alle gespeicherten Setups vom Backend laden
export const getSetups = () =>
  axios.get(`${BASE}/setups`).then(res => res.data)

// Neues Setup an das Backend senden und speichern
export const saveSetup = (setup) =>
  axios.post(`${BASE}/setups`, setup).then(res => res.data)