const add = document.getElementById("add");
const edit = document.querySelector(".edit");
const deleteEl = document.querySelector(".delete");
const noteS = JSON.parse(localStorage.getItem("notes"));
if (noteS) {
  noteS.forEach((note) => {
    addNewNote(note);
  });
}

add.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tools">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
     <div class="main ${text ? "" : "hidden"}"></div>
     <textarea class="${text ? "hidden" : ""}"></textarea>
    `;
  const editEl = note.querySelector(".edit");
  const deleteEl = note.querySelector(".delete");
  const mainEl = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = text;
  mainEl.innerHTML = text;
  deleteEl.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });
  editEl.addEventListener("click", () => {
    mainEl.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    mainEl.innerHTML = value;
    updateLocalStorage();
  });

  document.body.appendChild(note);
}
function updateLocalStorage() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];
  notesText.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
