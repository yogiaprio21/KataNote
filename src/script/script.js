import { createNote, getNotes, exampleUsage } from "../main.js";

// Ambil form catatan
const noteForm = document.querySelector(".note-form");
const titleInput = document.querySelector("#title");
const bodyTextarea = document.querySelector("#body");
const addNoteButton = document.querySelector("#add-note");

// Ambil kontainer catatan
const notesContainer = document.querySelector(".notes-container");

// Tampilkan form catatan di bagian atas
notesContainer.insertAdjacentElement("beforebegin", noteForm);

// Menambahkan pesan error dan indikator validasi
const titleError = document.querySelector("#title-error");
const bodyError = document.querySelector("#body-error");
const titleIndicator = document.querySelector("#title-indicator");
const bodyIndicator = document.querySelector("#body-indicator");

console.log(exampleUsage());

// Validasi real-time
titleInput.addEventListener("keyup", () => {
  validateTitle();
});

bodyTextarea.addEventListener("keyup", () => {
  validateBody();
});

// Fungsi validasi
function validateTitle() {
  const title = titleInput.value.trim();
  if (title === "") {
    titleError.textContent = "Judul tidak boleh kosong";
    titleIndicator.classList.add("invalid");
    titleIndicator.classList.remove("valid");
  } else {
    titleError.textContent = "";
    titleIndicator.classList.add("valid");
    titleIndicator.classList.remove("invalid");
  }
}

function validateBody() {
  const body = bodyTextarea.value.trim();
  if (body === "") {
    bodyError.textContent = "Isi catatan tidak boleh kosong";
    bodyIndicator.classList.add("invalid");
    bodyIndicator.classList.remove("valid");
  } else {
    bodyError.textContent = "";
    bodyIndicator.classList.add("valid");
    bodyIndicator.classList.remove("invalid");
  }
}

// Menambahkan validasi sebelum submit
addNoteButton.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const body = bodyTextarea.value.trim();

  if (title === "" || body === "") {
    alert("Judul dan isi catatan tidak boleh kosong");
    return;
  }
});

//Menambahkan catatan saat tombol diklik
addNoteButton.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const body = bodyTextarea.value.trim();

  if (title && body) {
    const noteCard = document.createElement("note-card");
    noteCard.setAttribute("title", title);
    noteCard.setAttribute("body", body);
    noteCard.setAttribute("createdAt", new Date().toISOString());
    noteCard.setAttribute("archived", "false");

    const newNote = await createNote({ body: body, title: title });
    console.log(newNote);
    notesContainer.appendChild(noteCard);

    // Reset form setelah penambahan catatan
    titleInput.value = "";
    bodyTextarea.value = "";
  }
});


async function getNotesFromAPI() {
  const notes = await getNotes();

  notes.data.forEach((note) => {
    const noteCard = document.createElement("note-card");
    noteCard.setAttribute("title", note.title);
    noteCard.setAttribute("body", note.body);
    noteCard.setAttribute("createdAt", note.createdAt);
    noteCard.setAttribute("archived", "false");
    notesContainer.appendChild(noteCard);
  });
}

getNotesFromAPI();
