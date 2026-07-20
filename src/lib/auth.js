/*
 * Auth seam. There is no real authentication yet (see CLAUDE.md), so this hook
 * reports the demo user as always signed in. It exists so that route protection
 * (components/ProtectedRoute.jsx) is already wired: when a real auth provider
 * lands, replace the body here — read the session/token, expose loading while
 * it resolves — and every guarded route starts enforcing without touching the
 * routing or the pages.
 */
export function useAuth() {
  return {
    isAuthenticated: true,
    isLoading: false,
    user: null,
  }
}
