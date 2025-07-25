const formItem = document.getElementById("item-form");
const formInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(e) {
  e.preventDefault();

  const newItem = formInput.value.trim();
  if (newItem === "") {
    alert("Please enter an item.");
  }

  const listItem = document.createElement("li");
  listItem.appendChild(document.createTextNode(newItem));

  const deleteButton = createButton("remove-item btn-link text-red");

  listItem.appendChild(deleteButton);
  itemList.appendChild(listItem);

  // clear: input field
  formInput.value = "";
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;

  const icon = createIcon("fa-solid fa-xmark");

  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

formItem.addEventListener("submit", addItem);
