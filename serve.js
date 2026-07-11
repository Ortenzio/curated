import { resolve } from "node:path";
const baseUrl = resolve(import.meta.dirname, './dist');

const server = Bun.serve({
  port: 5173,

  routes: {
    '/': async (req) => {
      const path = resolve(baseUrl, './index.html')
      return new Response(Bun.file(path))
    },
    '/post/:id': async (req) => {
      console.log(req.params.id);
      const path = resolve(baseUrl, 'post', req.params.id, './index.html')
      return new Response(Bun.file(path))
    },
    '/post/:id/': async (req) => {
      console.log(req.params.id);
      const path = resolve(baseUrl, 'post', req.params.id, './index.html')
      return new Response(Bun.file(path))
    },
  },

  async fetch (req) {
    const url = new URL(req.url)
    const filePath = resolve(baseUrl, `./${url.pathname}`)
    return new Response(Bun.file(filePath))
  },
 
  error (req) {
    console.log('not found')
    return new Response("Not Found", { status: 404 });
  }
})

console.log(`Listening on ${server.url}`);