import axios from 'axios' // HTTP-Client für API-Aufrufe

const BASE = '/api/mail' // Basis-URL für den Mail-Service

// Funktion, um die Mail-API aufzurufen und Daten zu senden
export const sendMail = (data) =>
  axios.post(`${BASE}/send`, data).then(res => res.data)