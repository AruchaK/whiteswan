import { useSyncExternalStore } from 'react'
import type { PillarKey } from './pillars'
import type { PlanningTask } from './pillarData'

export interface AddedTask extends PlanningTask {
  pillar: PillarKey
}

/*
 * Session-scoped store for user-added tasks, keyed by pillar.
 *
 * Not persisted across reloads (matches the rest of the demo), but it *does*
 * survive navigation between pillar pages — so a task filed under a different
 * pillar than the one you're viewing actually shows up there instead of
 * silently vanishing, which is what per-page local state used to do.
 */
const tasksByPillar = new Map<PillarKey, AddedTask[]>()
const listeners = new Set<() => void>()
const EMPTY: AddedTask[] = [] // stable reference for pillars with no added tasks

function emit() {
  for (const listener of listeners) listener()
}

export function addTask(task: AddedTask): void {
  const existing = tasksByPillar.get(task.pillar) ?? EMPTY
  tasksByPillar.set(task.pillar, [task, ...existing])
  emit()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useAddedTasks(pillarKey: PillarKey | undefined): AddedTask[] {
  return useSyncExternalStore(
    subscribe,
    () => (pillarKey ? tasksByPillar.get(pillarKey) ?? EMPTY : EMPTY),
  )
}
