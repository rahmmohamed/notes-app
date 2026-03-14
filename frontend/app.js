const API = "http://localhost:3000/api/notes";

async function loadNotes() {
 const res = await fetch(API);
 const notes = await res.json();

 const container = document.getElementById("notes");
 container.innerHTML = "";

 notes.forEach(note => {
  container.innerHTML += `
   <div>
    <h3>${note.title}</h3>
    <p>${note.content}</p>
    <button onclick="deleteNote(${note.id})">Delete</button>
   </div>
  `;
 });
}

async function addNote() {
 const title = document.getElementById("title").value;
 const content = document.getElementById("content").value;

 await fetch(API, {
  method: "POST",
  headers: {
   "Content-Type": "application/json"
  },
  body: JSON.stringify({ title, content })
 });

 loadNotes();
}

async function deleteNote(id) {
 await fetch(API + "/" + id, {
  method: "DELETE"
 });

 loadNotes();
}

loadNotes();