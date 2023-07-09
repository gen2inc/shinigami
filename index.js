import express from 'express';
import fs from "fs"
import crypto from "crypto"
const app = express()
const DECRYPTION_PROCESS = false;

app.use(express.json());

// app.post('/submit-vote', (req, res) => {
//   if (DECRYPTION_PROCESS) {
//     console.log(req.body);
//   } else {
//     console.log(req.body);  
//   }
//   res.send('SUCCESS')
// })

app.get('/update', (req, res) => {
  
})

app.listen(3000, () => {
  console.log(`Shinigami loaded and listening on port 3000`)
})
