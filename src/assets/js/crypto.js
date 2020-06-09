
const CryptoJS = require('crypto-js')

export const encryptByDES = function (message, key = 'ABGHNJHGSHUYG12', iv = 'sdf') {
  const keyHex = CryptoJS.enc.Utf8.parse(key) // 秘钥
  iv = CryptoJS.enc.Utf8.parse(iv) // 偏移量
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    iv: iv,
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString() //  加密出来为 hex格式密文
}

export const decryptByDES = function (cipherText, key, iv) {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(cipherText)
  }, keyHex, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
