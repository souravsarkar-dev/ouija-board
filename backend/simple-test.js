import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('BACKEND IS ALIVE');
});

app.post('/ask-spirit', (req, res) => {
  res.json({ answer: 'YES' });
});

app.listen(3001, () => {
  console.log('SERVER STARTED ON PORT 3001');
});
