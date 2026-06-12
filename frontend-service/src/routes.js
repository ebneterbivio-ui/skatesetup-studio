const ROUTES = {
  HOME: '/',
  PLAN: '/plan',
  SETUPS: '/setups'
}

const NAV_LINKS = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.PLAN, label: 'Setup planen' },
  { to: ROUTES.SETUPS, label: 'Meine Setups' }
]

export { ROUTES, NAV_LINKS }