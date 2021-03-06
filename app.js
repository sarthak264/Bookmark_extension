// DOM Elements
const input = document.getElementById("input-el")
const btn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const addressInput = document.getElementById("address-el")
const nameInput = document.getElementById("name-el")
const saveBtn = document.getElementById("save-btn")

// Variables
let myLeads = [];

// Adding eventListners
btn.addEventListener("click", () => {
  addressInput.value = input.value;
  nameInput.focus();
  input.value = "";
});

deleteBtn.addEventListener("click", () => {
  myLeads = [];
  localStorage.removeItem("localLeads");
  renderLeads();
});

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    btn.click();
  }
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    addressInput.value = tabs[0].url;
    nameInput.focus();
    makeObject();
    localStorage.setItem("localLeads", JSON.stringify(myLeads));
    renderLeads();
  });
});

nameInput.addEventListener("keyup",(e) => {
  if(e.keyCode === 13){
    saveBtn.click();
  }
})

saveBtn.addEventListener("click",buttonClick)

// Stuff
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("localLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
}

// Explaining functions
function buttonClick() {
  if (input.value != "") {
    myLeads.push(input.value);
  }
  makeObject()
  nameInput.value = "";
  addressInput.value = "";
  localStorage.setItem("localLeads", JSON.stringify(myLeads));
  renderLeads();
  // renderLeads();
}

function makeObject() {
  Name = nameInput.value;
  address = addressInput.value;
  let obj = new construct(Name, address)
  myLeads.push(obj)
}

function renderLeads() {
  list = "";
  for (let i = 0; i < myLeads.length; i++) {
    list += `<li>
                <a target="_blank" href="${myLeads[i].address}">
                  ${myLeads[i].name}
                </a>
              </li>`;
  }
  ulEl.innerHTML = list;
}
renderLeads();

function construct(nameofsite,address){
  this.name = nameofsite;
  this.address = address;
};