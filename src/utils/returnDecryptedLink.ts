import * as crypto from 'crypto';

const decrypt = (encryptedText: string, key: string): string => {
    const decodedData = Buffer.from(encryptedText, 'base64').toString('utf8');
    const [ivHex, encrypted] = decodedData.split(':');
    if (!ivHex || !encrypted) {
        throw new Error('Dados criptografados inválidos');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'utf-8'), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    let validJson = decrypted.replace(/([a-zA-Z0-9_]+):/g, '"$1":');
    validJson = validJson.replace(/"cs_id":(\d{4,})/g, '"cs_id":"$1"');

    return validJson;
};

export const returnDecryptedLink = (encodedEncryptedData: string) => {
    const decryptedData = decrypt(encodedEncryptedData, '12345678901234567890123456789012');

    return decryptedData;
};
