import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import type { ReactNode } from 'react'

/*
 * Route guard for authenticated surfaces (/dashboard/*, /family/*). Today the
 * auth seam (lib/auth.ts) always reports signed-in, so this passes through —
 * but the guard is in place, so switching auth on is a one-file change with no
 * routing churn. While auth is resolving it renders nothing (swap for a splash
 * when real auth lands); when signed out it redirects to /login and remembers
 * where the user was headed so login can send them back.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
