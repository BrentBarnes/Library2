let authorInput = document.getElementById('author');
let titleInput = document.getElementById('title');
let pagesInput = document.getElementById('pages');
let readInput = document.getElementsByName('read');
let yesRadio = document.getElementById('yes');
let noRadio = document.getElementById('no');
let addButton = document.getElementById('add-btn');
let library = document.getElementById('library')

let myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author
  this.title = title
  this.pages = pages
  this.read = read
}

function addBookToLibrary() {
  newBook = new Book(authorInput.value, titleInput.value, pagesInput.value, readInput[0].checked);
  myLibrary.push(newBook);
  addBookElement();
  clearFields();
}

function addBookElement() {
  let newDiv = document.createElement("div");
  newDiv.dataset.bookIndex = myLibrary.length - 1
  newDiv.innerText = `${authorInput.value}: ${titleInput.value}. ${pagesInput.value} pages long. Have I read this book? ${readInput[0].checked}.`

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.dataset.deleteIndex = myLibrary.length - 1;
  deleteBtn.innerText = "Delete";
  newDiv.appendChild(deleteBtn);

  let readBtn = document.createElement("button");
  readBtn.classList.add("read-btn");
  readBtn.dataset.readIndex = myLibrary.length - 1;
  readBtn.innerText = "Change Read Status";
  newDiv.appendChild(readBtn);


  library.appendChild(newDiv);
}

function clearFields() {
  authorInput.value = '';
  titleInput.value = '';
  pagesInput.value = '';
  yesRadio.checked = false;
  noRadio.checked = false;
}

function deleteBook() {
  if (event.target.className === 'delete-btn') {
    bookLibraryIndex = event.target.dataset.deleteIndex;
    parentDiv = event.target.parentNode;

    myLibrary.splice(bookLibraryIndex, 1)
    parentDiv.remove();
  }
}

function toggleRead() {
  if (event.target.className === "read-btn") {
    bookLibraryIndex = event.target.dataset.readIndex;
    parentDiv = event.target.parentNode;
    selectedBook = myLibrary[bookLibraryIndex]

    if (selectedBook.read) {
      selectedBook.read = false
    } else {
      selectedBook.read = true
    }
    // console.log(parentDiv.childNodes[0].textContent);
    parentDiv.childNodes[0].textContent = `${selectedBook.author}: ${selectedBook.title}. ${selectedBook.pages} pages long. Have I read this book? ${selectedBook.read}.`
  }
  console.log(myLibrary)
}

addButton.addEventListener('click', addBookToLibrary)
library.addEventListener('click', deleteBook)
library.addEventListener('click', toggleRead)
