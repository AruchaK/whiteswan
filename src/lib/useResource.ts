/*
 * Data-fetching seam. There is no backend yet, so this surfaces whatever mock
 * you pass in as an immediately-successful resource — no artificial delay, so
 * behavior is unchanged today. The point is the *contract*: pages written
 * against `{ status, data, error, retry }` already handle loading / error /
 * empty, so when this becomes a real fetch (track status through 'loading' →
 * 'success' | 'error', wire retry to refetch) every consumer keeps working.
 *
 * Reference consumer: pages/VaultPage.tsx.
 */
export type ResourceStatus = 'loading' | 'success' | 'error'

export interface ResourceResult<T> {
  status: ResourceStatus
  data: T
  error: Error | null
  retry: () => void
}

export function useResource<T>(mock: T): ResourceResult<T> {
  return {
    status: 'success', // 'loading' | 'success' | 'error'
    data: mock,
    error: null,
    retry: () => {},
  }
}
