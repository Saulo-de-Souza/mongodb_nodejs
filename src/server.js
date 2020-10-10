require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');

/**
 * Conexão com banco de dados MongoDb
 */
mongoose.connect(process.env.CONNECTION_STRING_MONGO, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(require('./routers.js'));
app.set('views', path.resolve(__dirname, '..', 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log('Ouvindo a porta: ' + process.env.PORT);
});
