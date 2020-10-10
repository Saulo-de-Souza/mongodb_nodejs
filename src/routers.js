const express = require('express');
const router = express.Router();
const path = require('path');
const Arquivo = require('./models/arquivo');

router.use(express.static(path.join(__dirname, '..', 'public')));
router.use(express.json());
router.use(express.urlencoded({extended: true}));

// Criar documento ARQUIVO
router.post('/criar', async (req, res) => {
  const { name, size } = req.body;
  await Arquivo.create({
    name,
    size
  });
  const arquivo = await Arquivo.find();
  res.json(arquivo);
});

// Listar todos os documentos ARQUIVO
router.get('/listar', async (req, res) => {
  const arquivo = await Arquivo.find();
  res.json(arquivo);
});

// Deletar documento ARQUIVO
router.delete('/deletar', async (req, res) => {
  await Arquivo.deleteOne({_id: req.body.id});
  const arquivo = await Arquivo.find();
  res.json(arquivo);
});

// Alterar documento ARQUIVO
router.put('/alterar', async (req, res) => {
  await Arquivo.findOneAndUpdate({_id: req.body.id}, {
    name: req.body.name,
    size: req.body.size
  });
  const arquivo = await Arquivo.find();
  res.json(arquivo);
});

// Rota principal
router.use('/', (req, res) => {
  res.render('index.html');
});

module.exports = router;
