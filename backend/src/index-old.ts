import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const resources = [
  { id: 1, category: 'Water', available: 1000000, unit: 'litres' },
  { id: 2, category: 'Electricity', available: 500000, unit: 'kWh' },
  { id: 3, category: 'Food', available: 200000, unit: 'meals' }
];

app.get('/api/resources', (_req, res) => {
  res.json(resources);
});

app.get('/', (_req, res) => {
  res.send('RBE Backend API');
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
