export function shuffle (arr) {

  if (!arr || !arr.length) {
    return arr;
  }

  const clone = [...arr];
  let len = clone.length;

  while (len) {
    const idx = Math.floor(Math.random() * len);
    len -= 1;
    const temp = clone[len];
    clone[len] = clone[idx];
    clone[idx] = temp;
  }

  return clone;
}
