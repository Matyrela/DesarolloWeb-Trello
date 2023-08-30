var buttonSave;
var myModal;
var cont = 3;
var ultimoBotonPresionado;
var ultimoBotonPresionadoCol;
var cardCont = 0;
let colContainer = new Array();


function setMaxToNew(element) {
  settings = {
    maxLen: 15,
  }

  keys = {
    'backspace': 8,
    'shift': 16,
    'ctrl': 17,
    'alt': 18,
    'delete': 46,
    // 'cmd':
    'leftArrow': 37,
    'upArrow': 38,
    'rightArrow': 39,
    'downArrow': 40,
    'enter': 13,
  }

  utils = {
    special: {},
    navigational: {},
    isSpecial(e) {
      return typeof this.special[e.keyCode] !== 'undefined';
    },
    isNavigational(e) {
      return typeof this.navigational[e.keyCode] !== 'undefined';
    }
  }

  utils.special[keys['backspace']] = true;
  utils.special[keys['shift']] = true;
  utils.special[keys['ctrl']] = true;
  utils.special[keys['alt']] = true;
  utils.special[keys['delete']] = true;

  utils.navigational[keys['upArrow']] = true;
  utils.navigational[keys['downArrow']] = true;
  utils.navigational[keys['leftArrow']] = true;
  utils.navigational[keys['rightArrow']] = true;

  element.addEventListener('keydown', function (event) {
    let len = event.target.innerText.trim().length;
    hasSelection = false;
    selection = window.getSelection();
    isSpecial = utils.isSpecial(event);
    isNavigational = utils.isNavigational(event);

    if (selection) {
      hasSelection = !!selection.toString();
    }

    if (isSpecial || isNavigational) {
      return true;
    }

    if ((len >= settings.maxLen && !hasSelection) || event.keyCode === keys['enter']) {
      event.preventDefault();
      return false;
    }

  });
}

function setMax(el) {
  let elements = document.querySelectorAll('[contentEditable="true"]');
  if (el != 'undefined') {
    elements = [el];
  }
  elements.forEach(element => {
    settings = {
      maxLen: 15,
    }

    keys = {
      'backspace': 8,
      'shift': 16,
      'ctrl': 17,
      'alt': 18,
      'delete': 46,
      // 'cmd':
      'leftArrow': 37,
      'upArrow': 38,
      'rightArrow': 39,
      'downArrow': 40,
      'enter': 13,
    }

    utils = {
      special: {},
      navigational: {},
      isSpecial(e) {
        return typeof this.special[e.keyCode] !== 'undefined';
      },
      isNavigational(e) {
        return typeof this.navigational[e.keyCode] !== 'undefined';
      }
    }

    utils.special[keys['backspace']] = true;
    utils.special[keys['shift']] = true;
    utils.special[keys['ctrl']] = true;
    utils.special[keys['alt']] = true;
    utils.special[keys['delete']] = true;

    utils.navigational[keys['upArrow']] = true;
    utils.navigational[keys['downArrow']] = true;
    utils.navigational[keys['leftArrow']] = true;
    utils.navigational[keys['rightArrow']] = true;

    element.addEventListener('keydown', function (event) {
      let len = event.target.innerText.trim().length;
      hasSelection = false;
      selection = window.getSelection();
      isSpecial = utils.isSpecial(event);
      isNavigational = utils.isNavigational(event);

      if (selection) {
        hasSelection = !!selection.toString();
      }

      if (isSpecial || isNavigational) {
        return true;
      }

      if ((len >= settings.maxLen && !hasSelection) || event.keyCode === keys['enter']) {
        event.preventDefault();
        return false;
      }

    });
  });
}

function buttonPressed(button) {
  myModal = new bootstrap.Modal(document.getElementById('addTask'))
  let container = document.getElementById("listContainer");
  let columns = container.getElementsByClassName("colu");
  Array.from(columns).forEach(function (element) {
    if (element.contains(button)) {
      buttonSave = button;
    }
  })
  myModal.toggle();
}

function cardSolicitation() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionInput").value;
  let expirationDate = document.getElementById("expirationInput").value;
  console.log(expirationDate);
  addCard(buttonSave, title, description, expirationDate);
}

function addCard(button, title, description, expirationDate) {
  cardCont++;
  let parent = button.parentNode.parentNode.parentNode.getElementsByClassName("cardContainer")[0];
  let expirationColor = colorOnDate(expirationDate);
  
  parent.innerHTML = parent.innerHTML +
    `<div class="card" draggable="true" ondragstart="drag(event)" id="card${cardCont}">
  <div class="card-body">
    <div class="ColTitleContainer btnRemove">
      <h5 class="card-title" contentEditable="true" spellcheck="false">${title} </h5>
      <button style="margin-left: auto;" type="button" class="btn btn-danger btnp btn-deleteCard" onclick="deleteCardSolicitation(this)">
        <b>X</b>
      </button>
    </div>
    <hr>
    <div class ="card-text-container">
      <p class="card-text" contentEditable="true">${description}</p>
    </div>
    <hr>
    <div class="card-expiration-container">
      <p class="card-expiration"> Vencimiento: 
      <input class= "card-expiration-input" onchange="myFunction(this);" style="background-color: ${expirationColor};" type="date" value= "${expirationDate}" />
      </p>
    </div>
  </div>
</div>`
  document.getElementById("titleInput").value = "";
  document.getElementById("descriptionInput").value = "";
  document.getElementById("expirationInput").value = "";
  addCardJson(button.parentNode.parentNode.id,`card${cardCont}`, description, expirationDate, title);
}

function colorOnDate(expirationDate) {
  let expirationColor = "#FFFFFF";
  let todayDate = new Date();
  let amarilloDate = new Date().setDate(todayDate.getDate() + 2);
  if (new Date(expirationDate) < todayDate) {
    expirationColor = "#FF6347";
  }
  if (new Date(expirationDate) > todayDate && new Date(expirationDate) < amarilloDate) {
    expirationColor = "#FFFF00";
  }
  return expirationColor;
}

function deleteElement() {
  ultimoBotonPresionado.parentNode.parentNode.parentNode.remove();
}

function deleteCardSolicitation(button) {
  myModal = new bootstrap.Modal(document.getElementById('deleteElement'))
  myModal.toggle();
  ultimoBotonPresionado = button;
}

function addList(button) {
  let newCol = document.createElement("div");
  cont += 1;
  newCol.id = `Col${cont}`;
  newCol.classList.add('colu');
  newCol.setAttribute("draggable", "true");
  newCol.setAttribute("ondragstart","drag(event)");
  newCol.innerHTML = `<div class="ColTitleContainer">
    <h2 class="ColTitle" contentEditable="true">Nueva columna</h2>
    <div class="alignRight">
    <button style="margin-left: auto;" type="button" class="btn btn-success" onclick="buttonPressed(this)">
      <b>+</b>
    </button>
    <button style="margin-left: auto;" type="button" class="btn btn-danger" onclick="deleteCardSolicitation(this)">
      <b>-</b>
    </button>
  </div>
    </div>
      <hr class="whitehr">
    <div class="cardContainer" id="cardContainer"  ondrop="drop(event)" ondragover="allowDrop(event)">
  </div>`;
  let listContainer = document.getElementById("listContainer");
  listContainer.insertBefore(newCol, listContainer.children[listContainer.children.length - 1]);
  setMaxToNew(newCol.children[0].children[0]);
  addCol(newCol.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("card", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("card");
  if(data.toString().includes("Col")){
    ev.target.parentNode.parentNode.prepend(document.getElementById(data));
  }else{
    ev.target.appendChild(document.getElementById(data));
  }
}


function addCol(iden){
  let col = {id: iden, title: "Nueva columna", cards: new Array()};
  colContainer.push(col);
}

function addCardJson(idCol, idCard, description, date, title){
  colContainer.forEach(function (element) {
    if (element.id == idCol) {
      element.cards.push({id: idCard, description: description, expirationDate: date, title: title});
    }
  })

  console.log(idCol);
}

function removeCol(idCol){
  colContainer.forEach(function (element) {
    let col;
    if (element.id == idCol) {
      col = element;
    }
    //colContainer.remove(col);
  })
}

function removeCard(idCol, idCard){
  let col;
  let card;
  colContainer.forEach(function (element) {
    if (element.id == idCol) {
      col = element;
    }
  })
  col.forEach(function (element) {
    if (element.id == idCard) {
      card = element;
    }
  })
  colContainer.remove(card);
}

function recursiveLogging() {
  console.log(JSON.stringify(colContainer));
  setTimeout(recursiveLogging, 1000);
}

function drawColumns() {
  colContainer.forEach(function (element) {
    let newCol = document.createElement("div");
    cont += 1;
    newCol.id = element.id;
    newCol.classList.add('colu');
    newCol.setAttribute("draggable", "true");
    newCol.setAttribute("ondragstart","drag(event)");
    newCol.innerHTML = `<div class="ColTitleContainer">
      <h2 class="ColTitle" contentEditable="true">${element.title}</h2>
      <div class="alignRight">
      <button style="margin-left: auto;" type="button" class="btn btn-success" onclick="buttonPressed(this)">
        <b>+</b>
      </button>
      <button style="margin-left: auto;" type="button" class="btn btn-danger" onclick="deleteCardSolicitation(this)">
        <b>-</b>
      </button>
    </div>
      </div>
        <hr class="whitehr">
      <div class="cardContainer" id="cardContainer"  ondrop="drop(event)" ondragover="allowDrop(event)">
    </div>`;
    let listContainer = document.getElementById("listContainer");
    listContainer.insertBefore(newCol, listContainer.children[listContainer.children.length - 1]);
    setMaxToNew(newCol.children[0].children[0]);
    addCol(newCol.id);
    element.cards.forEach(function (ele){
      cardCont++;
      let parent = newCol;
      parent.innerHTML = parent.innerHTML +
        `<div class="card" draggable="true" ondragstart="drag(event)"${ele.idCard}">
      <div class="card-body">
        <div class="ColTitleContainer">
          <h5 class="card-title" contentEditable="true" spellcheck="false">${ele.title} </h5>
          <button style="margin-left: auto;" type="button" class="btn btn-danger btnp" onclick="deleteCardSolicitation(this)">
            <b>X</b>
          </button>
        </div>
        <hr>
        <div class ="card-text-container">
          <p class="card-text" contentEditable="true">${ele.description}</p>
        </div>
        <hr>
        <div class="card-expiration-container">
          <p class="card-expiration"> Vencimiento: 
          <input class= "card-expiration-input" onchange="myFunction(this);" type="date" value= "${ele.expirationDate}" />
          </p>
        </div>
      </div>
    </div>`
      document.getElementById("titleInput").value = "";
      document.getElementById("descriptionInput").value = "";
      document.getElementById("expirationInput").value = "";
    }
    )})

  }
  function myFunction(el){
    let expirationDate = el.value;
    el.style.backgroundColor = colorOnDate(expirationDate);
    console.log(el.style);
  }