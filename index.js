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
  var transphobes = fs.readFileSync("./data/transphobes.txt", 'utf-8')
  var transfriendly = fs.readFileSync("./data/transfriendly.txt", 'utf-8')
  let hashMap = new Map();
  transphobes.split(/\r?\n/).forEach(line =>  {
      hashMap.set(line, "transphobic");
  });
  transfriendly.split(/\r?\n/).forEach(line =>  {
      hashMap.set(line, "transfriendly");
  });
  
  let transphobic = [];
  let transfriendly = [];
  for (let i = 0; i < req.body.urls.length; i++) {
    if (hashMap.has(req.body.urls[i])) {
      if (hashMap.get(req.body.urls[i]) === "transphobic") {
          transphobic.push(req.body.urls[i])
      } else {
          transfriendly.push(req.body.urls[i]);
      }
    }
  }

  res.send({transphobes:a,transfriendly:b})
})

app.listen(3000, () => {
  console.log(`Shinigami loaded and listening on port 3000`)
})
