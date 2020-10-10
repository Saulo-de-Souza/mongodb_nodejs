const mongoose = require('mongoose');

const Arquivo = new mongoose.Schema({
  name: { type: String, default: '' },
  size: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Arquivo', Arquivo);
