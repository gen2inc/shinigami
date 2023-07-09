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

app.post('/check', (req, res) => {
  console.log(req.body.urls)
  var transphobes=fs.readFileSync("transphobes.txt");
  var transphobestest = transphobes.toString()
  var transfriendly=fs.readFileSync("transfriendly.txt");
  var transfriendlytest = transfriendly.toString()

  let a = []
  for (let i = 0; i < req.body.urls.length; i++) {
    if (transphobestest.includes(req.body.urls[i])) {
      a.push(req.body.urls[i])
    }
  }
  let b = []
  for (let i = 0; i < req.body.urls.length; i++) {
    if (transfriendlytest.includes(req.body.urls[i])) {
      b.push(req.body.urls[i])
    }
  }

  res.send({transphobes:a,transfriendly:b})
})

app.listen(3000, () => {
  console.log(`Shinigami loaded and listening on port 3000`)
})
