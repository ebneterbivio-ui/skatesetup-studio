// Auswahloptionen für den Einsatzzweck eines Setups
export const PURPOSE_OPTIONS = ['Street', 'Park', 'Bowl', 'Cruising']

// Auswahlwerte für die Bewertungsskala
export const RATING_OPTIONS = [1, 2, 3, 4, 5]

// Standardwerte für das Formular zum Speichern eines Setups
export const EMPTY_SETUP_FORM = {
  setupName: '',
  deck: '',
  trucks: '',
  wheels: '',
  bearings: '',
  purpose: 'Street',
  rating: 5,
  feedback: ''
}

// Standardwerte für das Mail-Formular
export const EMPTY_MAIL_FORM = {
  setupName: '',
  deck: '',
  trucks: '',
  wheels: '',
  bearings: '',
  purpose: 'Street',
  recipientEmail: ''
}