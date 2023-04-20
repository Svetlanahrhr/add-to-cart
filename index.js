import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-16b32-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const moviesInDB = ref(database, "goods");

console.log(app);
const btn = document.querySelector("#btn");
let goods = document.querySelector("#goods");
let list = document.querySelector(".list-of-goods");

const form = document.querySelector("#form-field");

onValue(moviesInDB, function(snapshot) {
  clearShoppingList ()
  if (!snapshot.exists()) {
    list.innerHTML = 'No items here...'
    return;
  }
  let goodsArray = Object.entries(snapshot.val())
  goodsArray.forEach(good => {
    addLinesToList(good);
    console.log(good[1]);
  })
})

function clearShoppingList () {
  list.innerHTML = ''
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addGoods();
});

// btn.addEventListener("click", addGoods);
function addGoods() {
  let value = goods.value;
  push(moviesInDB, value);
  // addLinesToList(value);

  clearInputField(goods);

  console.log(app);
}

function clearInputField(input) {
  input.value = "";
}
function addLinesToList(value) {
  // list.innerHTML += `<li>${value}</li>`;

  let newEl = document.createElement('li');
  newEl.innerHTML = `${value[1]}`
  newEl.classList.add('item')
  newEl.id = value[0]
  newEl.addEventListener('dblclick', (e) => {
    console.log(e.target.id);
    let path = ref(database, `goods/${e.target.id}`)
    remove(path)
  })
  list.append(newEl);
}

const obj = {
  '01': 'haha0@mail.com',
  '02': 'haha1@mail.com',
  '03': 'haha2@mail.com',
}

let emails = Object.values(obj)
let ides = Object.keys(obj)
let both = Object.entries(obj)

console.log(emails,'emails');
console.log(ides,'ides');
console.log(both,'both');
