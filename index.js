import express from 'express';
import jwt from "jsonwebtoken";
const app = express()

app.post('/submit-vote', (req, res) => {
    res.send('SUCCESS')
})

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})
