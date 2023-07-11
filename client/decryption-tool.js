// make sure to provide your private certificate

import fs from "fs"
import { encryptText, decryptText } from "../lib/encryption.js"

const logs = fs.readFileSync("./logs.txt", 'utf-8');
// https://geshan.com.np/blog/2021/10/nodejs-read-file-line-by-line/ 
logs.split(/\r?\n/).forEach(line =>  {
    try {
        const info = JSON.parse(line);
        console.log(info);
    } catch (e) {
        console.error("error", e);
    }
});

