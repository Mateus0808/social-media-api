import { app } from '.'

const PORT = process.env.PORT || 3333

app.listen(3333, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
