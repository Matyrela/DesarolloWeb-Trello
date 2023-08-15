var buttonSave;
var myModal;
function buttonPressed(button){
  myModal = new bootstrap.Modal(document.getElementById('addTask'))
  let container = document.getElementById("cardContainer");
  let columns = container.getElementsByClassName("colu");
  Array.from(columns).forEach(function(element){
    if(element.contains(button)){
      buttonSave = button;
    }
  }) 
  myModal.toggle();
}

function cardSolicitation(){
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionInput").value;
  addCard(buttonSave, title, description);
}

function addCard(button, title, description){
  let parent = button.parentNode.parentNode;
  parent.innerHTML = parent.innerHTML + `<div class="card"><div class="card-body"><h5 class="card-title">${title}</h5><hr><p class="card-text">${description}</p></div></div>`;
  document.getElementById("titleInput").value = "";
  document.getElementById("descriptionInput").value = "";
}

