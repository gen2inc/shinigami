import express from 'express';
import fs from "fs"
const app = express()

/*
  do the decryption process in the cloud or do it locally,
  if via the cloud, please provide your decryption keys
*/
const DECRYPTION_PROCESS = false;

app.use(express.json());

app.post('/submit-vote', (req, res) => {
    if (DECRYPTION_PROCESS) {
      
    } else {
      // fs.writeFileSync("logs.txt", )
    }
    res.send('SUCCESS')
})

app.get('/dat', (req, res) => {
  
})

app.listen(3000, () => {
  console.log(`Shinigami loaded and listening on port 3000`)
})
