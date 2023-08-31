require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const { errors } = require('celebrate');
const handleError = require('./middlewares/handle-error');
const {requestLogger, errorLogger} = require('./middlewares/logger')

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); 

app.use('/', require('./routes/index'));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(errorLogger); 
app.use(errors());
app.use(handleError);

app.listen(PORT);
