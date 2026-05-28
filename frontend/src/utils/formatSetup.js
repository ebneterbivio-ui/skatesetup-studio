// Hilfsfunktion zum Erzeugen eines kurzen Textes für ein Setup
export const formatSetupLabel = (setup) => {
  return `${setup.setupname} — ${setup.deck} / ${setup.trucks} / ${setup.wheels}`
}