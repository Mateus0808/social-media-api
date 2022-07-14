import { App } from '.'

const PORT = process.env.PORT || 3333

const server = new App().server

server.listen(3333, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
