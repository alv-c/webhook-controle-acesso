import express, { Request, Response, Express } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { main } from './controllers/main.js';
import { returnEncryptedLink } from './utils/returnEncryptedLink.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req: Request, res: Response) => {
    main(req.body);
});

app.get('/startAccessControlService', async (req: Request, res: Response) => {
    try {
        const link = await returnEncryptedLink(req.query);
        res.redirect(link);
    } catch (error) {
        res.status(500).send('Erro ao gerar o link');
    }
});

app.get('/', (res: Response): any => {
    return res.status(200).json({ Message: 'API is running!!!' })
})

app.listen(3041, () => {
    console.log('Webhook ouvindo na porta 3041!');
});