import crypto from "crypto";

const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPTION_KEY || 'your_secret_key';
const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
    if (Buffer.byteLength(secretKey, 'utf8') !== 32) {
        throw new Error('Invalid key length. AES-256 key must be 32 bytes long.');
    }
    const keyBuffer = typeof secretKey === 'string' ? Buffer.from(secretKey, 'utf8') : secretKey;
    const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = (hash: string) => {
    if (Buffer.byteLength(secretKey, 'utf8') !== 32) {
        throw new Error('Invalid key length. AES-256 key must be 32 bytes long.');
    }
    const keyBuffer = typeof secretKey === 'string' ? Buffer.from(secretKey, 'utf8') : secretKey;
    const [ivString, encryptedText] = hash.split(':');
    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, Buffer.from(ivString, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
    return decrypted.toString();
};
