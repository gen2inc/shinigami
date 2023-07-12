import express from 'express';
import fs from "fs"
import { decryptText } from './lib/encryption.js';
const app = express()
const SERVER_DECRYPTION = false;

app.use(express.json());

app.post('/submit-vote', (req, res) => {
  if (SERVER_DECRYPTION) {
    let decrypt = decryptText(Buffer.from(req.body.enc, 'base64'));
    fs.appendFileSync("./data/logs.txt", `${decrypt.toString()}\n`);
  } else {
    fs.appendFileSync("./data/logs.txt", `${req.body}\n`);  
  }
  res.send('SUCCESS')
})

app.post('/check', (req, res) => {
  // O(m) big o scale
  var transphobes = fs.readFileSync("./data/transphobes.txt", 'utf-8')
  var transfriendly = fs.readFileSync("./data/transfriendly.txt", 'utf-8')
  let phobicSet = new Set(transphobes.split(/\r?\n/));
  let friendlySet = new Set(transfriendly.split(/\r?\n/));
  
  let friendly = [];
  let phobic = [];
  for (let i = 0; i < req.body.urls.length; i++) {
    if (friendlySet.has(req.body.urls[i])) {
      friendly.push(req.body.urls[i])
    } else if (phobicSet.has(req.body.urls[i])) {
      phobic.push(req.body.urls[i])
    }
  }

  res.send({transphobes:phobic,transfriendly:friendly})
})

app.listen(3000, () => {
  console.log(`Shinigami loaded and listening on port 3000`)
})
