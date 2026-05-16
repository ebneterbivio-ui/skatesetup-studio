// Wird in Abgabe 2 implementiert
export const getSetups = async () => {
  const res = await fetch('/api/storage/setups')
  if (!res.ok) throw new Error('Fehler beim Laden')
  return res.json()
}

export const saveSetup = async (setup) => {
  const res = await fetch('/api/storage/setups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(setup)
  })
  if (!res.ok) throw new Error('Fehler beim Speichern')
  return res.json()
}