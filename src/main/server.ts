import { mongoConnection } from '../infra/mongodb/config/config'
import { App } from './config/app'
import { env } from './config/env'

const PORT = env.port

mongoConnection
  .then(() => {
    const app = new App()
    app.server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  })
  .catch(error => {
    console.error(error)
  })
