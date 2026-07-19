import { useSyncExternalStore } from 'react'

/*
 * Session-scoped store for user-added tasks, keyed by pillar.
 *
 * Not persisted across reloads (matches the rest of the demo), but it *does*
 * survive navigation between pillar pages — so a task filed under a different
 * pillar than the one you're viewing actually shows up there instead of
 * silently vanishing, which is what per-page local state used to do.
 */
const tasksByPillar = new Map()
const listeners = new Set()
const EMPTY = [] // stable reference for pillars with no added tasks

function emit() {
  for (const listener of listeners) listener()
}

export function addTask(task) {
  const existing = tasksByPillar.get(task.pillar) ?? EMPTY
  tasksByPillar.set(task.pillar, [task, ...existing])
  emit()
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useAddedTasks(pillarKey) {
  return useSyncExternalStore(subscribe, () => tasksByPillar.get(pillarKey) ?? EMPTY)
}
