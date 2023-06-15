const buttonEl = document.getElementById("btn");
const containerEl = document.getElementById("container");

getNotesEl().forEach((note) => {
  const notaEl = createNote(note.id, note.content);
  containerEl.insertBefore(notaEl, buttonEl);
});

function createNote(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("texts");
  element.textContent = "";
  element.placeholder = "Empty Note";
  element.value = content;
  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delet this none");
    if (warning) {
      deletNoteEl(id, element);
    }
  });
  element.addEventListener("input", () => {
    upDateNote(id, element.value);
  });
  return element;
}
function deletNoteEl(id, element) {
  const getNote = getNotesEl().filter((note) => note.id != id);
  saveNote(getNote);
  containerEl.removeChild(element);
}

function upDateNote(id, content) {
  const nope = getNotesEl();
  const traget = nope.filter((noke) => noke.id == id)[0];
  traget.content = content;
  saveNote(nope);
}
function addNote() {
  const notes = getNotesEl();
  const noteObj = {
    id: Math.floor(Math.random() * 10000),
    content: "",
  };
  const noteEl = createNote(noteObj.id, noteObj.content);
  containerEl.insertBefore(noteEl, buttonEl);
  notes.push(noteObj);
 localStorage.setItem("note-app", JSON.stringify(notes));
}
function saveNote(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotesEl() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

buttonEl.addEventListener("click", addNote);
