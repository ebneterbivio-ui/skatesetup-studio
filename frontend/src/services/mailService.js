// Wird in Abgabe 2 implementiert
export const sendMail = async (data) => {
  const res = await fetch('/api/mail/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Fehler beim Mailversand')
  return res.json()
}