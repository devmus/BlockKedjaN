import express from 'express';
import dontenv from 'dotenv';
import { connectDb } from './config/mongo.mjs';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/auth-routes.mjs';
import { errorHandler } from './middleware/errorHandler.mjs';

dontenv.config({ path: './config/config.env' });

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/auth', authRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Server is running on port: ${PORT}`.green.underline)
);
