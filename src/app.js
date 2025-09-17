import express from 'express';
import morgan from 'morgan';
import userProfilesRouter from './routes/userProfiles.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(morgan('dev'));

//setup cors from all origins
app.use(cors());

app.use('/api/v1/user-profiles', userProfilesRouter);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

// error handler
app.use(errorHandler);

export default app;
