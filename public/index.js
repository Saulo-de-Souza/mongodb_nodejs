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
        'Accept': 'application/json'
      },
      method: 'GET'
    }).then(function(res){
      return res.json();
    }).then(function(json){
      lista.innerText = '';
      json.forEach(element => {
        lista.innerText = lista.innerText + 'Id: ' + element._id + ' Name: ' + element.name;
        lista.innerHTML = lista.innerHTML + '<br/>';
      });

    }).catch(function(err){
      console.log(err);
    })
  });

  bt_criar.addEventListener('click', function (e) {
    fetch('/criar', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({name: name_criar.value, size: size_criar.value })
    }).then(function(res){
      return res.json();
    }).then(function(json){
      lista.innerText = '';
      json.forEach(element => {
        lista.innerText = lista.innerText + 'Id: ' + element._id + ' Name: ' + element.name;
        lista.innerHTML = lista.innerHTML + '<br/>';
      });

    }).catch(function(err){
      console.log(err);
    })
  });

  bt_editar.addEventListener('click', function (e) {
    fetch('/alterar', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({name: name_editar.value, size: size_editar.value, id: id_editar.value})
    }).then(function(res){
      return res.json();
    }).then(function(json){
      lista.innerText = '';
      json.forEach(element => {
        lista.innerText = lista.innerText + 'Id: ' + element._id + ' Name: ' + element.name;
        lista.innerHTML = lista.innerHTML + '<br/>';
      });

    }).catch(function(err){
      console.log(err);
    })
  });

  bt_excluir.addEventListener('click', function (e) {
    fetch('/deletar', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      body: JSON.stringify({id: id_excluir.value})
    }).then(function(res){
      return res.json();
    }).then(function(json){
      lista.innerText = '';
      json.forEach(element => {
        lista.innerText = lista.innerText + 'Id: ' + element._id + ' Name: ' + element.name;
        lista.innerHTML = lista.innerHTML + '<br/>';
      });

    }).catch(function(err){
      console.log(err);
    })
  });
};
