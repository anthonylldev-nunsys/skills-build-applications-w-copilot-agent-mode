import express from 'express';

import { getApiBaseUrl, API_PORT } from './config/api.js';
import './config/database.js';
import apiRouter from './routes/api.js';

const app = express();

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiUrl: getApiBaseUrl(),
  });
});

app.listen(API_PORT, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API running at ${getApiBaseUrl()}`);
});