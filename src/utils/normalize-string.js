/**
 * kebab-case and remove diacritics from a string
 * 
 * @param {string} str 
 * @returns {string}
 */
export function normalizeString (str) {

  return (str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[,'"]/g, '')
    .replace(/(\W+)/g, '-')
  )

}
