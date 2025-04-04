import * as crypto from 'crypto';
import 'dotenv/config';

const secretKey = '12345678901234567890123456789012';
const numberStartChat = process.env.NUMBER_START_CHAT as string;

const encrypt = (text: string, key: string): string => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'utf-8'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const ivHex = iv.toString('hex');
    const data = `${ivHex}:${encrypted}`;

    return Buffer.from(data).toString('base64');
};

export const returnEncryptedLink = async (data: any) => {
    const { server, csid, particao } = data;
    let dataCrypt = JSON.stringify({
        "server": server,
        "cs_id": String(csid),
        "particao": particao
    });
    const encryptedData = encrypt(dataCrypt, secretKey);
    let msg = `*CA*:${encryptedData}`;

    return `https://wa.me/55${numberStartChat}/?text=${encodeURIComponent(msg)}`;
};
