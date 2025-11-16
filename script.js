const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const inputInvalid = document.getElementById("input-invalid");
const itemList = document.getElementById("item-list");

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

  //   Generate Li
  const li = document.createElement("li");
  li.className = "list-item";
  li.textContent = newItem;

  //   Generate  and Assign icon to Li
  const icon = createIcon("bi bi-x fs-5 text-danger");
  li.appendChild(icon);

  //   Assign li to ul
  itemList.appendChild(li);

  itemInput.value = "";
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;

  return icon;
}

// Event listener
itemForm.addEventListener("submit", addItem);
