export const formatSetup = (setup) => ({
  setupName: setup.setupName || '',
  deck: setup.deck || '',
  trucks: setup.trucks || '',
  wheels: setup.wheels || '',
  rating: setup.rating || 0,
  feedback: setup.feedback || ''
})