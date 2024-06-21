import express from 'express';
import dontenv from 'dotenv';
import { connectDb } from './config/mongo.mjs';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/auth-routes.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import blockRouter from './routes/block-routes.mjs';
import PubNubServer from './pubnubServer.mjs';
import { errorHandler } from './middleware/errorHandler.mjs';
import Blockchain from './models/Blockchain.mjs';

dontenv.config({ path: './config/config.env' });

export const blockchain = new Blockchain();
export const pubnubServer = new PubNubServer({ blockchain: blockchain }); // flytta dessa 2 till startup fil?

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

const DEFAULT_PORT = parseInt(process.env.PORT);
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

let NODE_PORT;

setTimeout(() => {
  pubnubServer.broadcast();
}, 1000);

app.use(morgan('dev'));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/block', blockRouter);
app.use(errorHandler);

const synchronize = async () => {
  const response = await fetch(`${ROOT_NODE}/api/v1/blockchain`);
  if (response.ok) {
    const result = await response.json();
    console.log('SYNC', result.data);
    blockchain.replaceChain(result.data);
  }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.green.underline);

  if (PORT !== DEFAULT_PORT) {
    synchronize();
  }
});
