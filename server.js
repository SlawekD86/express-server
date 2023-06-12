const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  const forbiddenPath = '/user/';
  if (req.path.startsWith(forbiddenPath)) {
    return res.sendFile(path.join(__dirname, '/views/forbidden.html'));
  }
  next();
});

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.show('index.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404.jpg'));
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});