# Conexão Mongodb com servidor Node JS

> Exemplo simples de como fazer CRUD usando o Mongodb com servidor Node Js

### Dependências:

- Express
- Ejs
- Nodemon
- Morgan
- Dotenv
- Mongoose

### Instalação:

```js
npm install express ejs nodemon morgan dotenv mongoose --save
```

### Conexão:

```js
const mongoose = require('mongoose');
// CONNECTION_STRING_MONGO = mongodb://localhost:27017/<nome do banco de dados>
mongoose.connect(process.env.CONNECTION_STRING_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
```

### Servidor: (server.js)

```js
require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');

/**
 * Conexão com banco de dados MongoDb
 */
mongoose.connect(process.env.CONNECTION_STRING_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

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
```

### Rota: (routers.js)

```js
const express = require('express');
const router = express.Router();
const path = require('path');
const Arquivo = require('./models/arquivo');

router.use(express.static(path.join(__dirname, '..', 'public')));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Criar documento ARQUIVO
router.post('/criar', async (req, res) => {
  const { name, size } = req.body;
  const arquivo = await Arquivo.create({
    name,
    size,
  });
  res.json(arquivo);
});

// Listar todos os documentos ARQUIVO
router.get('/listar', async (req, res) => {
  const arquivo = await Arquivo.find();
  res.json(arquivo);
});

// Deletar documento ARQUIVO
router.post('/deletar', async (req, res) => {
  await Arquivo.deleteOne({ _id: req.body.id });
  const arquivo = await Arquivo.find();
  res.json(arquivo);
});

// Alterar documento ARQUIVO
router.put('/alterar', async (req, res) => {
  await Arquivo.findOneAndUpdate(
    { _id: req.body.id },
    {
      name: req.body.name,
      size: req.body.size,
    }
  );
  const arquivo = await Arquivo.findOne({ _id: req.body.id });
  res.json(arquivo);
});

// Rota principal
router.use('/', (req, res) => {
  res.render('index.html');
});

module.exports = router;
```

### Modelo: (arquivo.js)

```js
const mongoose = require('mongoose');

const Arquivo = new mongoose.Schema({
  name: { type: String, default: '' },
  size: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Arquivo', Arquivo);
```

### Executar: (cmd)

```js
npx nodemon src/server.js
```

### Client js (index.js):

```js
window.onload = function (e) {
  var bt_listar = document.getElementById('bt_listar');

  var bt_criar = document.getElementById('bt_criar');
  var name_criar = document.getElementById('name_criar');
  var size_criar = document.getElementById('size_criar');

  var bt_editar = document.getElementById('bt_editar');
  var id_editar = document.getElementById('id_editar');
  var name_editar = document.getElementById('name_editar');
  var size_editar = document.getElementById('size_editar');

  var bt_excluir = document.getElementById('bt_excluir');
  var id_excluir = document.getElementById('id_excluir');

  var lista = document.getElementById('lista');

  bt_listar.addEventListener('click', function (e) {
    fetch('/listar', {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET',
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        lista.innerText = '';
        json.forEach((element) => {
          lista.innerText = lista.innerText + 'Id: ' + element._id + ' Name: ' + element.name;
          lista.innerHTML = lista.innerHTML + '<br/>';
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  bt_criar.addEventListener('click', function (e) {
    fetch('/criar', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name: name_criar.value, size: size_criar.value }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        lista.innerText = '';
        json.forEach((element) => {
          lista.innerText = lista.innerText + 'Id: ' + element._id + ' Name: ' + element.name;
          lista.innerHTML = lista.innerHTML + '<br/>';
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  bt_editar.addEventListener('click', function (e) {
    fetch('/alterar', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ name: name_editar.value, size: size_editar.value, id: id_editar.value }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        lista.innerText = '';
        json.forEach((element) => {
          lista.innerText = lista.innerText + 'Id: ' + element._id + ' Name: ' + element.name;
          lista.innerHTML = lista.innerHTML + '<br/>';
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  bt_excluir.addEventListener('click', function (e) {
    fetch('/deletar', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({ id: id_excluir.value }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        lista.innerText = '';
        json.forEach((element) => {
          lista.innerText = lista.innerText + 'Id: ' + element._id + ' Name: ' + element.name;
          lista.innerHTML = lista.innerHTML + '<br/>';
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};
```

### Html (index.html):

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="./index.css" />
    <script src="./index.js"></script>

    <title>MongoDb com NodeJS</title>
  </head>
  <body>
    <fieldset>
      <legend>Criar</legend>
      <div class="content">
        <label for="name_criar">Nome: </label><input type="text" id="name_criar" name="name" autocomplete="off" />
      </div>
      <div class="content">
        <label for="size_criar">Tamanho: </label><input type="text" id="size_criar" name="size" autocomplete="off" />
      </div>
      <div class="content"><input type="button" value="Criar" id="bt_criar" /></div>
    </fieldset>

    <fieldset>
      <legend>Editar</legend>
      <div class="content">
        <label for="id_editar">Id: </label><input type="text" id="id_editar" name="id" autocomplete="off" />
      </div>
      <div class="content">
        <label for="name_editar">Nome: </label><input type="text" id="name_editar" name="name" autocomplete="off" />
      </div>
      <div class="content">
        <label for="size_editar">Tamanho: </label><input type="text" id="size_editar" name="size" autocomplete="off" />
      </div>
      <div class="content"><input type="button" value="Editar" id="bt_editar" /></div>
    </fieldset>

    <fieldset>
      <legend>Excluir</legend>
      <div class="content">
        <label for="id_excluir">Id: </label><input type="text" id="id_excluir" name="id" autocomplete="off" />
      </div>
      <div class="content"><input type="button" value="Excluir" id="bt_excluir" /></div>
    </fieldset>

    <fieldset>
      <legend>Listar</legend>
      <input type="button" value="Listar" id="bt_listar" />
      <div id="lista"></div>
    </fieldset>

    <div id="lista"></div>
  </body>
</html>
```

### Client css (index.css):

```css
body,
html {
  height: 100%;
  margin: 0;
}

body {
  background-color: aqua;
}

fieldset {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 700px;
  margin: 0px auto;
}

.content {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

input[type='text'] {
  width: 550px;
}
```
