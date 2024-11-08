const addBtn = document.getElementById("add")
const wrapper = document.querySelector(".wrapper");

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = "") {
    const note = document.createElement("div")
    note.classList.add("note");
    wrapper.appendChild(note)

    note.innerHTML = `<div class="notes">
    <img src="note.png" />
    <div class="tools">
      <button class="edit btn"><i class="bi bi-pencil-fill"></i></button>
      <button class="delete btn"><i class="bi bi-eraser-fill"></i></button>
    </div>
    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
    </div>`

    const deleteBtn = note.querySelector(".delete")
    deleteBtn.addEventListener('click', () => {
        note.remove()
        saveLocalStorage()
    })

    const editBtn = note.querySelector(".edit")
    const main = note.querySelector(".main")
    const textArea = note.querySelector("textarea")

    editBtn.addEventListener('click', () => {
        main.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
    })

    textArea.value = text
    main.innerHTML = formatText(text)

    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        main.innerHTML = formatText(value)
        saveLocalStorage()
    })
    console.log("hi");
}

function formatText(text) {
    return text.replace(/\n/g, '<br>');
}

function saveLocalStorage() {
    const notesText = document.querySelectorAll("textarea")

    const notes = []
    notesText.forEach((note) => notes.push(note.value))
    localStorage.setItem("notes", JSON.stringify(notes))
}

const notes = JSON.parse(localStorage.getItem("notes"))

if (notes) {
    notes.forEach((note) => addNewNote(note))
}
