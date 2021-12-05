const BUTTON_ADD = document.querySelector("#button-submit");
BUTTON_ADD.addEventListener("click",validateForm);
const INPUT_TITLE = document.querySelector("#input-title");
const INPUT_AUTHOR = document.querySelector("#input-author");
const RADIOS_PRIORITY = document.querySelectorAll('input[type="radio"]');
const SELECT_CATEGORY = document.querySelectorAll('select');
var bookList = [];

function checkLocalStorage(){
    if(!Boolean(JSON.parse(localStorage.getItem('bookList')))){
    let initialBookList = JSON.parse(books);
    bookList = Array.from(initialBookList);
    localStorage.setItem("bookList",JSON.stringify(bookList))}
    else {bookList=JSON.parse(localStorage.getItem('bookList'))}
    return populateBooksTable();
}

function populateBooksTable(){
    let table = document.querySelector("#table-books")
    table.innerHTML="";
    for (let i=0;i<bookList.length;i++){
    createSingleRow(bookList[i]);
    }
}

function createSingleRow(book){
    let table = document.querySelector("#table-books");
    let newRow = document.createElement("tr");
    let bookData = Object.entries(book);
    bookData.forEach(x=>{
        newRow.appendChild(createSingleCell(x[1]))
    })
    table.appendChild(newRow);
}

function createSingleCell(value){
    let newCell = document.createElement("td");
    newCell.innerHTML=value;
    return newCell;
}

function addNewBook(title,author,priority,category){
    let newBook = {};
    let nowDate = new Date();
    newBook.TITLE=title;
    newBook.AUTHOR=author;
    newBook.PRIORITY=priority;
    newBook.CATEGORY=category;
    newBook.DATE=`${nowDate.getMonth()+1}/${nowDate.getDate() }/${nowDate.getFullYear()}`
    bookList.unshift(newBook);
    saveBookListToLocalStorage();
    populateBooksTable(); 
}

function validateForm() {
    let valid = true;
    let errorMessage ="";
    let title = INPUT_TITLE.value;
    let author = INPUT_AUTHOR.value;
    let priorityChecked = false;
    for (let i=0;i<RADIOS_PRIORITY.length;i++) {if (RADIOS_PRIORITY[i].checked) priorityChecked=true;}
    let category = SELECT_CATEGORY[0].value;

    if (title.length<1) {valid=false;errorMessage+="Title name must be at least 1 character long\n"};
    if (author.length<3) {valid=false;errorMessage+="Author must be at least 3 characters long\n"};
    if (!priorityChecked) {valid=false;errorMessage+="Please select one priority\n"}
    else priority = document.querySelector('input[type="radio"]:checked').value;
    if (SELECT_CATEGORY[0][0].selected) {valid=false;errorMessage+="Please select one category\n"}
   
    if(!valid) return alert(errorMessage);
    if(confirm(`Please confirm that you want to add this book: \nTITLE: ${title}\nAUTHOR: ${author}\nPRIORITY: ${priority}\nCATEGORY: ${category}`))
    clearForm();
    addNewBook(title,author,priority,category);
}

function clearForm(){
    INPUT_TITLE.value = "";
    INPUT_AUTHOR.value = "";
    for (let x of RADIOS_PRIORITY) x.checked = false;
    SELECT_CATEGORY[0][0].selected= true;
}

function saveBookListToLocalStorage(){
    localStorage.setItem("bookList",JSON.stringify(bookList))
}
