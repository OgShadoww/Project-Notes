// create all variables
let addNote = document.querySelector('.add-box'),
    popup = document.querySelector('.popup-box'),
    closePopup = popup.querySelector('header i'),
    input = popup.querySelector('input'),
    descr = popup.querySelector('textarea')
    btnAdd = popup.querySelector('button'),
    titlePopup = popup.querySelector('header p')

// create variables for inform in localStorage
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

// create variables for months
const months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];

// create variables for check update and index
let isUpdate = false, updateId;

// add event for button what open modal
addNote.addEventListener('click', e => {
    popup.classList.add('show')
    document.body.style.overflow = 'hidden'
    titlePopup.textContent = 'Add a new Note'
    btnAdd.textContent = 'Add note'
    input.value = ''
    descr.value = ''
})

// add event for close modal
closePopup.addEventListener('click', () => {
    popup.classList.remove('show')
    document.body.style.overflow = 'auto'
})

// func for show note in page
function showNote () {
    document.querySelectorAll('.note').forEach( note => note.remove())
    notes.forEach((note, index) => {
        // create tag what we must past in page
        let tagLi = `<li class="note">
        <div class="details">  
            // add title 
            <p>${note.noteTitle}</p>
            // add description
            <span>${note.noteDesc}</span>
        </div>
        <div class="bottom-content">
            // add date
            <span>${note.date}</span>
            <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    // add furn when click for update
                    <li onclick="updateNote(${index}, '${note.noteTitle}', '${note.noteDesc}')"><i class="uil uil-pen"></i>Edit</li>
                    // add furn when click for delete
                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
        </div>
    </li>`

    // add note in page
    addNote.insertAdjacentHTML('afterend', tagLi)
    });
}

// call func
showNote()

// func for open menu
function showMenu (el) {
    el.parentElement.classList.add('show')

    document.addEventListener('click', e => {
        if(e.target.tagName !== 'I' || e.target !== el) {
            el.parentElement.classList.remove('show')
        }
    })
}

// func for delete note
function deleteNote (noteId) {
    let confirmDel = confirm('you want delete note?')
    if(!confirmDel)returnf
    notes.splice(noteId, 1)
    // saving to local storage
    localStorage.setItem('notes', JSON.stringify(notes))
    showNote()
}

// func for update note
function updateNote(index, title, desc) {
    updateId = index;
    isUpdate = true;
    addNote.click();
    input.value = title;
    descr.value = desc;
    titlePopup.textContent = 'Update a Note';
    btnAdd.textContent = 'Update note';
}

// furn for create note
btnAdd.addEventListener('click', e => {
    e.preventDefault()
    let noteTitle = input.value.trim()
    let noteDesc = descr.value.trim()

    if(noteTitle || noteDesc) {
        const currentData = new Date()

        let year = currentData.getFullYear()
        let month = months[currentData.getMonth()]
        let day = currentData.getDate()
        
        let noteInfo = {
            noteTitle,
            noteDesc,
            date: `${month} ${day}, ${year}`
        }
        
        // check update
        if(!isUpdate) {
            notes.push(noteInfo)
        }   else {
            isUpdate = false
            notes[updateId] = noteInfo
        }
        // saving to local storage
        localStorage.setItem('notes', JSON.stringify(notes))
        // call func
        showNote()
        // call click for close popup
        closePopup.click()
    }
})