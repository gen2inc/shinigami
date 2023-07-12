/*
https://whyboobo.com/devops/tutorials/asymmetric-encryption-with-nodejs/
*/

import fs from 'fs'
import crypto from 'crypto'


/**
 * Generate encrypted text with the public key
 * @param {string} The plain text of the string to be encrypted
 * @returns {string} The encrypted text
 */
export function encryptText (plainText) {
  return crypto.publicEncrypt({
    key: fs.readFileSync('./certificates/public_key.pem', 'utf8'),
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  },
  // We convert the data string to a buffer
  Buffer.from(plainText)
  )
}

/**
 * Decrypt text with the private key
 * @param {string} The encrypted text with the public key
 * @returns {string} Plain text
 */
export function decryptText (encryptedText) {
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
