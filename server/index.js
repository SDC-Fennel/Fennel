// require('newrelic');
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');

const app = express();
module.exports.app = app;

app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.json());

app.use('/', router);

if (!module.parent) {
  app.listen(app.get('port'));
  console.log(`Listening on http://localhost:${app.get('port')}`);
}
