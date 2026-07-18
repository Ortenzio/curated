import { resolve } from 'node:path';

const path = resolve("posts.json");
const file = Bun.file(path);
const contents = await file.json();

console.log(contents.length);