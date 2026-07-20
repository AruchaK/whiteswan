import { PILLARS } from './pillars'

/*
 * Single source of truth for pillar readiness.
 *
 * `readiness` is each pillar's headline % and `done`/`total` are its essentials
 * tally. Everything else — the "N of M essentials complete" string and the
 * overall preparedness number — is DERIVED from these, never hand-typed, so the
 * dashboard, planning pages, pillar pages, and the floating widget can never
 * drift out of agreement (they used to: four copies, and an overall number that
 * didn't match the pillars beneath it).
 *
 * Keyed by pillar key (see pillars.js). Per-pillar page *content* — badges,
 * tasks, contacts, notes — still lives in pillarData.js; this module owns only
 * the numbers that appear in more than one place.
 */
export const PILLAR_READINESS = {
  legal: {
    readiness: 62,
    done: 4,
    total: 6,
    summary: 'Will, Power of Attorney, Trusts',
    status: '1 critical item missing',
  },
  medical: {
    readiness: 38,
    done: 3,
    total: 8,
    summary: 'Directives, GP, Insurance, allergies',
    status: '2 critical items missing',
  },
  financial: {
    readiness: 71,
    done: 5,
    total: 7,
    summary: 'Bank, Investments, Insurance, Pension',
    status: '1 review overdue',
  },
  personal: {
    readiness: 22,
    done: 2,
    total: 9,
    summary: 'Letters, Funeral, Values, Digital legacy',
    status: 'Needs attention',
    needsAttention: true,
  },
  family: {
    readiness: 45,
    done: 4,
    total: 9,
    summary: 'Contacts, Family network, Roles',
    status: 'Key contacts list incomplete',
  },
}

/* Ordered list following the canonical PILLARS order, each entry carrying its key. */
export const READINESS_LIST = PILLARS.map((p) => ({ key: p.key, ...PILLAR_READINESS[p.key] }))

/* "4 of 6 essentials complete" — derived, so it can never disagree with done/total. */
export function essentialsLabel(key) {
  const { done, total } = PILLAR_READINESS[key]
  return `${done} of ${total} essentials complete`
}

/*
 * Overall preparedness = the mean of the five pillar readiness values, rounded.
 * Derived on purpose: the headline number always reflects the pillars it summarizes.
 */
export const overallPreparedness = Math.round(
  READINESS_LIST.reduce((sum, p) => sum + p.readiness, 0) / READINESS_LIST.length,
)
