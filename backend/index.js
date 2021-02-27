const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.PORT || 3001
const cors = require('cors')
app.use(cors())


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.get('/', (request, response) => {
  response.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})