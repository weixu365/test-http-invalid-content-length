const express = require('express');
const fs = require('fs');

const app = express();

app.get('/200-no-header-no-body', (req, res) => {
  res
    .status(200).send();
});

app.get('/200-with-content-length-and-body', (req, res) => {
  res
    .set({'Content-Length': 23})
    .status(200).send('{}');
});

app.get('/200-with-content-length', (req, res) => {
  res
    .set({'Content-Length': 0})
    .status(200).send();
});

app.get('/200-with-invalid-content-length', (req, res) => {
  res
    .set({'Content-Length': 23})
    .status(200).send();
});

app.get('/204-no-header-no-body', (req, res) => {
  res
    .status(204).send();
});

app.get('/204-with-content-length-and-body', (req, res) => {
  res
    .set({'Content-Length': 23})
    .status(204).send('{}');
});

app.get('/204-with-content-length', (req, res) => {
  res
    .set({'Content-Length': 0})
    .status(204).send();
});

app.get('/204-with-invalid-content-length', (req, res) => {
  res
    .set({'Content-Length': 23})
    .status(204).send();
});

module.exports = app;
