const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const fraudRoutes = require('./routes/fraudRoutes');
require('dotenv').config(); 
const cors = require('cors'); 

app.use(cors());

app.use(express.json());

app.use('/api/fraud', fraudRoutes);

app.get('/', (req, res) => {
  res.send('Fraud Detection Backend with IPQS is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});