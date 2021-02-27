// ADD ITEM TO THE LIST
const form = document.querySelector("#addForm");
form.addEventListener("submit", addItem);

function addItem(event) {
  //verhindere reload des Dokuments durch Submit-Button
  event.preventDefault();

  //hole Wert aus dem Input-Textfeld
  const newItem = document.querySelector("#item").value;

  //erstelle ein neues List-Item, gib ihm eine class und weise Text zu
  const li = document.createElement("li");
  li.classList = "list-group-item";
  li.innerText = newItem;

  //erstelle den X-Button für das neue List-Item
  const deleteBtn = document.createElement("button");
  deleteBtn.classList = "btn btn-danger btn-sm float-right delete";
  deleteBtn.innerText = "X";

  //hänge den deleteBtn als Kind in das List-Item
  li.appendChild(deleteBtn);

  //hänge das List-Item an die Liste an
  document.querySelector("#items").appendChild(li);
}

//DELETE ITEM FROM LIST
const itemList = document.querySelector("#items");
itemList.addEventListener("click", deleteItem);

function deleteItem(event) {
  //falls der angeglickte Bereich der X-Button ist:
  if (event.target.classList.contains("delete")) {
    if (confirm("Element löschen?")) {
      // wähle das Elternelement des Buttons:
      const li = event.target.parentElement;
      //entferne es aus dem DOM:
      li.remove();
    }
  }
}

//SEARCH LIST
const filter = document.querySelector("#filter");
filter.addEventListener("keyup", filterItems);

function filterItems(event) {
  //Suchstring aus dem Eingabetextfeld in Kleinbuchstaben:
  const text = event.target.value.toLowerCase();
  //wähle alle list-group-item Elemente im Dokument
  const items = document.querySelectorAll(".list-group-item");
  //für jedes Listenelement:
  items.forEach(item => {
    //Text des Listenelements in Kleinbuchstaben
    const itemText = item.firstChild.textContent.toLowerCase();
    //falls Suchstring darin enthalten
    if (itemText.includes(text)) {
      //zeige das li
      item.style.display = "block";
    } else {
      //sonst blende es aus
      item.style.display = "none";
    }
  });
}
