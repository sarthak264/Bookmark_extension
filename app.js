// DOM Elements
const input = document.getElementById("input-el")
const btn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const addressInput = document.getElementById("address-el")
const nameInput = document.getElementById("name-el")

// Variables
let myLeads = [];

// Adding eventListners
btn.addEventListener("click", buttonClick);

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
    myLeads.push(tabs[0].url);
    localStorage.setItem("localLeads", JSON.stringify(myLeads));
    renderLeads();
  });
});

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
  input.value = "";
  localStorage.setItem("localLeads", JSON.stringify(myLeads));
  renderLeads();
}

function renderLeads() {
  list = "";
  for (let i = 0; i < myLeads.length; i++) {
    list += `<li>
                <a target="_blank" href="${myLeads[i]}">
                  ${myLeads[i]}
                </a>
              </li>`;
  }
  ulEl.innerHTML = list;
}
renderLeads();
