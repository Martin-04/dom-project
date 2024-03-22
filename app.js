//check if there's data in local storage:

if (localStorage.getItem("content") !== null) {
  document.querySelector(".content").innerHTML = localStorage.getItem(
    "content"
  );
}

// ADD A NEW LIST

document.querySelector("#newList").addEventListener("click", addList);

function addList() {
  const listName = prompt("Name der neuen Liste:", "Einkaufsliste");

  //erstelle den Tab-Button
  const tabButton = document.createElement("button");
  tabButton.classList = "tablinks btn btn-outline-dark";
  tabButton.innerHTML = listName;
  document.querySelector(".tab").appendChild(tabButton);

  //erstelle den Listen-Container
  const ul = document.createElement("ul");
  ul.classList = "tabcontent list-group";
  ul.id = listName.toLowerCase();
  ul.addEventListener("click", deleteItem);
  document.querySelector(".content").appendChild(ul);

  //simuliere einen Klick auf den Button um die neue Liste zu aktivieren:
  tabButton.click();
}

// DELETE ACTIVE LIST
document.querySelector("#deleteList").addEventListener("click", deleteList);

function deleteList() {
  document.querySelector(".active").remove();
  document.querySelectorAll(".tablinks").forEach(tablink => {
    if (tablink.classList.contains("btn-dark")) {
      tablink.remove();
    }
  });
}

// ADD ITEM TO THE ACTIVE LIST
const form = document.querySelector("#addForm");
form.addEventListener("submit", addItem);

function addItem(event) {
  try {
    //verhindere reload des Dokuments durch Submit-Button
    event.preventDefault();

    //hole Wert aus dem Input-Textfeld
    const newItem = document.querySelector("#item").value;
    document.querySelector("#item").value = "";

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

    //hänge das List-Item an die aktive Liste an
    document.querySelector(".active").appendChild(li);
  } catch (error) {
    alert("Bitte wähle eine Liste aus, bzw. erstelle eine neue!");
  }
}

//DELETE ITEM FROM LIST
const itemList = document.querySelector(".content");
itemList.addEventListener("click", deleteItem);

function deleteItem(event) {
  //falls der angeglickte Bereich der X-Button ist:
  if (event.target.classList.contains("delete")) {
    // wähle das Elternelement des Buttons:
    const li = event.target.parentElement;
    //entferne es aus dem DOM:
    li.remove();
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

//TAB NAVIGATION
document.querySelector(".tab").addEventListener("click", openTab);

function openTab(event) {
  if (event.target.classList.contains("tablinks")) {
    //blende alle Tabs aus:
    const tabcontent = document.querySelectorAll(".tabcontent");
    tabcontent.forEach(tab => {
      tab.classList.remove("active");
    });

    //schalte alle Tablinks auf nicht aktiv:
    const tablinks = document.querySelectorAll(".tablinks");
    tablinks.forEach(tab => {
      tab.classList.remove("btn-dark");
      tab.classList.add("btn-outline-dark");
    });

    //aktivierten Tablink formatieren:
    event.target.classList.remove("btn-outline-dark");
    event.target.classList.add("btn-dark");

    //richtigen Tab anzeigen:
    const activeList = document.getElementById(
      event.target.innerText.toLowerCase()
    );
    activeList.classList.add("active");
  }
}

document.addEventListener("click", save);
document.addEventListener("keyup", save);

//SAVE ALL LISTS TO LOCAL STORAGE
function save() {
  localStorage.setItem("content", document.querySelector(".content").innerHTML);
}
