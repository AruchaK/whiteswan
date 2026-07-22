import { Country, State } from 'country-state-city'

/*
 * Location options for the sign-up combobox, built entirely from
 * `country-state-city` (a maintained ISO-3166/geo dataset) — no hand-typed
 * list to keep in sync. Thailand's 77 provinces (the primary market) come
 * first as "<Province>, Thailand"; every other country follows by name, for
 * the secondary diaspora/family users elsewhere. City-level data is skipped
 * on purpose: it's ~8MB unminified and unnecessary at province/country
 * granularity for this field, and only Country + State get imported so it
 * tree-shakes out of the bundle (package ships `sideEffects: false`).
 */
const thaiProvinces = State.getStatesOfCountry('TH').map((s) => `${s.name}, Thailand`)

const otherCountries = Country.getAllCountries()
  .filter((c) => c.isoCode !== 'TH')
  .map((c) => c.name)
  .sort((a, b) => a.localeCompare(b))

export const LOCATIONS = [...thaiProvinces, ...otherCountries]
