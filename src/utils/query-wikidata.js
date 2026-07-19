import { normalizeString } from "./normalize-string.js";

export async function queryWikidata (term) {
  const slug = normalizeString(term);
  const search = encodeURIComponent(term);
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${search}&language=en&type=item&limit=10&format=json&origin=*`

  // set user agent header

  const resp = await fetch(url)
}