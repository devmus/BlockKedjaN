import express from 'express';
import dontenv from 'dotenv';
import cors from 'cors';

dontenv.config({ path: './config/config.env' });

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
