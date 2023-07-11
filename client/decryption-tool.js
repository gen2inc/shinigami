// make sure to provide your private certificate

import fs from "fs"
import crypto from "crypto";

function decryptText (encryptedText) {
    return crypto.privateDecrypt(
      {
        key: fs.readFileSync('./certificates/private_key.pem', 'utf8'),
        // In order to decrypt the data, we need to specify the
        // same hashing function and padding scheme that we used to
        // encrypt the data in the previous step
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      encryptedText
    )
}

const logs = fs.readFileSync("./logs.txt", 'utf-8');
// https://geshan.com.np/blog/2021/10/nodejs-read-file-line-by-line/ 
logs.split(/\r?\n/).forEach(line =>  {
    try {
        const info = JSON.parse(line);
        let decrypt = decryptText(Buffer.from(info.enc, 'base64'));
        fs.appendFileSync("./decrypted.txt", `${decrypt.toString()}\n`)
    } catch (e) {
        console.error("error", e);
    }
});

