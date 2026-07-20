/*
 * First-two initials for avatar fallbacks. Strips a leading honorific
 * (Khun, Dr., Phra, Ajahn) so "Khun Pim Siriwong" -> "PS", not "KP", and
 * caps at two letters. Shared by the family, family-tree, and pillar-contact
 * avatars (previously three copies).
 */
export function initials(name) {
  return name
    .replace(/^(Khun|Dr\.|Phra|Ajahn)\s+/i, '')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
}
