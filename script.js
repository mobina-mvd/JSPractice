const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const inputInvalid = document.getElementById("input-invalid");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("items-clear");
const filter = document.getElementById("filter");

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  // Form Validation
  if (newItem == "") {
    inputInvalid.textContent = "Please add an Item";
    return;
  } else {
    inputInvalid.textContent = "";
  }
  addItemToDOM(newItem);

  addItemToStorage(newItem);
  itemInput.value = "";

  checkUI();
}

// Add Item to UI
function addItemToDOM(item) {
  const li = document.createElement("li");
  li.className = "list-item";
  li.textContent = item;

  //   Generate  and Assign icon to Li
  const icon = createIcon("bi bi-x fs-5 text-danger");
  li.appendChild(icon);

  //   Assign li to ul
  itemList.appendChild(li);
}

// Add Item to LocalStorage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;

  return icon;
}

function onClickItem(e) {
  //   console.log(e.target);
  const isIcon = e.target.classList.contains("bi-x");

  if (isIcon) {
    e.target.parentElement.remove();
    romoveItemFromStorage(e.target.parentElement.textContent);
    checkUI();
  }
}

function romoveItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  console.log(itemsFromStorage);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  itemList.textContent = "";
  localStorage.removeItem("items");
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    filter.style.display = "none";
  } else {
    clearBtn.style.display = "block";

    filter.style.display = "block";
  }
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();

    if (itemText.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Event listener
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearItems);
filter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);
checkUI();
