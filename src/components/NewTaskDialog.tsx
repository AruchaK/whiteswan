import { useEffect, useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import Button from './ui/Button'
import ToggleSwitch from './ui/ToggleSwitch'
import { PILLARS } from '../lib/pillars'
import type { PillarKey } from '../lib/pillars'
import type { AddedTask } from '../lib/addedTasksStore'
import type { TaskPriority } from '../lib/pillarData'

const PRIORITIES = ['HIGH', 'MED', 'LOW'] as const satisfies readonly TaskPriority[]

interface NewTaskDialogProps {
  onClose: () => void
  onSave: (task: AddedTask) => void
  defaultPillar?: PillarKey
}

/*
 * "Add a new task" modal — matches new-task.png.
 * Mounted only while open (parent conditionally renders it), so each open
 * starts from fresh state. Calls `onClose` to dismiss and `onSave(task)`
 * with the assembled task. `defaultPillar` preselects the pillar pill.
 */
export default function NewTaskDialog({ onClose, onSave, defaultPillar = 'legal' }: NewTaskDialogProps) {
  const [title, setTitle] = useState('')
  const [pillar, setPillar] = useState(defaultPillar)
  const [priority, setPriority] = useState<TaskPriority>('MED')
  const [requiresDoc, setRequiresDoc] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus the name input on mount.
  useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [])

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const canSave = title.trim().length > 0

  const handleSave = () => {
    if (!canSave) return
    onSave({
      id: `task-${Date.now()}`,
      title: title.trim(),
      pillar,
      priority,
      vault: requiresDoc,
      due: 'No date',
      duration: '~15 min',
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-task-title"
        className="relative w-full max-w-96 bg-white rounded-2xl shadow-2xl border border-espresso-250 max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-espresso-250">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id="new-task-title" className="font-serif text-2xl text-espresso-900 leading-tight">
                Add a new task
              </h2>
              <p className="text-[13px] text-espresso-600 mt-1">
                Add an action item to increase your readiness.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 -mr-1.5 -mt-1 text-espresso-600 hover:text-espresso-700 bg-transparent border-none cursor-pointer transition-colors"
            >
              <X size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Task name */}
          <div>
            <label
              htmlFor="task-name"
              className="block text-[11px] font-bold tracking-[0.14em] text-espresso-600 uppercase mb-2"
            >
              What needs to be done?
            </label>
            <input
              id="task-name"
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sign the Power of Attorney"
              className="w-full bg-cream-150 border border-espresso-250 rounded-lg px-3.5 py-2.5 text-[14px] text-espresso-800 placeholder:text-espresso-600 focus:border-espresso-400 focus:bg-white transition-colors"
            />
          </div>

          {/* Pillar selector */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-espresso-600 uppercase mb-2">
              Which pillar?
            </p>
            <div className="flex flex-wrap gap-2">
              {PILLARS.map((p) => {
                const Icon = p.icon
                const active = pillar === p.key
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPillar(p.key)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 rounded-full border pl-1.5 pr-3 py-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
                      active
                        ? 'border-espresso-900 bg-espresso-900 text-cream-50'
                        : 'border-espresso-250 bg-white text-espresso-600 hover:bg-cream-100'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: p.banner }}
                    >
                      <Icon size={11} className="text-white" strokeWidth={2} />
                    </span>
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Priority */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-espresso-600 uppercase mb-2">
              Priority
            </p>
            <div className="grid grid-cols-3 gap-2">
              {PRIORITIES.map((p) => {
                const active = priority === p
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    aria-pressed={active}
                    className={`rounded-full py-2 text-[12px] font-semibold tracking-wide border transition-colors cursor-pointer ${
                      active
                        ? 'bg-espresso-900 text-cream-50 border-espresso-900'
                        : 'bg-white text-espresso-600 border-espresso-250 hover:bg-cream-100'
                    }`}
                  >
                    {p}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Requires document toggle */}
          <div className="flex items-center gap-3 rounded-xl border border-espresso-250 bg-cream-50 p-3.5">
            <span className="w-9 h-9 rounded-full bg-white border border-espresso-250 flex items-center justify-center shrink-0">
              <Upload size={15} className="text-espresso-600" strokeWidth={1.8} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-espresso-800 leading-tight">Requires document</p>
              <p className="text-[12px] text-espresso-600 mt-0.5">Links this task to the Vault</p>
            </div>
            <ToggleSwitch
              checked={requiresDoc}
              onChange={(e) => setRequiresDoc(e.target.checked)}
              ariaLabel="Requires document"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-espresso-250 flex items-center justify-end gap-2.5">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-[13px] font-medium px-4 py-2 rounded-full"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!canSave}
            className="text-[13px] font-medium px-4 py-2 rounded-full"
          >
            Save task
          </Button>
        </div>
      </div>
    </div>
  )
}
