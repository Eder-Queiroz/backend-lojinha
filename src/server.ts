import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv'
import { router } from './router';

dotenv.config();
const {PORT} = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => console.log(`Server online!\nServidor rodando na porta ${PORT} => http://localhost:${PORT}`))