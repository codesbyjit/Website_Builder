import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';
import templatesRouter from './routes/templates';
import sitesRouter from './routes/sites';
import authRouter from './routes/auth';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/templates', templatesRouter);
app.use('/api/sites', sitesRouter);
app.use('/api/auth', authRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 WebForge Backend running on http://localhost:${PORT}`);
});

export default app;
