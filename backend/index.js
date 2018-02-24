const express = require('express');
const path = require('path');
const cors = require('cors');

const PORT = 3001;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({ status: 'OK', msg: 'Hello World!' });
});
app.get('/ghosts', (req, res) => {
  res.sendFile(`/assets/ghosts/${req.query.bt}.png`, { root: __dirname });
});
app.get('/item-lut', (req, res) => {
  res.json({ status:'OK', data: { 0: 'Nothing' } });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
