console.log("this is connected with javascript");
showNotes();
//if user add note, add it to local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);                 
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));                  
  addTxt.value = "";                  
  addTitle.value = "";
  console.log(notesObj);                  
  showNotes();
});

//================Function will show the notes from localstorage===============
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
    <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">${element.text}</p>
      <button id=${index} onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    </div>
  </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `You have nothing in your reminder list!`;
  }
}

//================Function to delete a note=====================================
function deleteNote(index) {
  console.log(`note on ${index} will delete`);
  let notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  // notesObj.map((element,ind) => {
  //   newNotes = ind != index;
  // })
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//====================Search Functionality=======================================
let search = document.getElementById("searchTxt");
search.addEventListener("input", () => {
  let inputValue = search.value;
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach((element) => {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    // console.log(cardTxt);
    if (cardTxt.includes(inputValue)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  })
});
