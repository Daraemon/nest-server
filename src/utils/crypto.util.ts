import { Injectable } from "@nestjs/common";
import * as CryptoJS from "crypto-js";

@Injectable()
export class CryptoUtil {
  private readonly key = process.env.CRYPTO_KEY;
  private readonly iv = process.env.CRYPTO_IV;

  // 加密
  encrypto(message: string): string {
    const keyHex = CryptoJS.enc.Utf8.parse(this.key);
    const ivHex = CryptoJS.enc.Utf8.parse(this.iv);
    const messageHex = CryptoJS.enc.Utf8.parse(message);
    const encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
  }

  // 解密
  decrypto(message: string): string {
    console.log('解密', this.key, this.iv);
    const encryptedHexStr = CryptoJS.enc.Hex.parse(message);
    const messageBase64 = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const keyHex = CryptoJS.enc.Utf8.parse(this.key);
    const ivHex = CryptoJS.enc.Utf8.parse(this.iv);
    const decrypt = CryptoJS.AES.decrypt(messageBase64, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
}