import express from 'express';
import dontenv from 'dotenv';

dontenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
