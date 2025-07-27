const formItem = document.getElementById("item-form");
const formInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const filterInput = document.getElementById("filter");
const clearBtn = document.getElementById("clear");
const formBtn = formItem.querySelector("button")
let isEditMode = false;

function displayItems() {
  const itemFromStorage = localStorage.getItem('items') ? JSON.parse(localStorage.getItem("items")) : []

  itemFromStorage.forEach((item) => {
    addItemToDom(item)
  })
  resetUI()
}

function addItem(e) {
  e.preventDefault();

  const newItem = formInput.value;
  if (newItem === "") {
    alert("Please enter an item.");
    return
  }

  // check for edit mode

  if (isEditMode) {
    const itemToEdit = document.querySelector('.edit-mode')
    
    // remove from storage
    removeFromLocalStorage(itemToEdit.textContent)

    // remove from dom
    itemToEdit.remove()
  } else if (checkItemExists(newItem)) {
     alert("Item already exists")
    return
  }

  // add item DOM element
  addItemToDom(newItem)

  // add item to storage
  addItemToStorage(newItem)
  
  // reset the UI
  resetUI();

  // clear the input field
  formInput.value = "";
}

function addItemToDom(item) {
  const listItem = document.createElement("li");
  listItem.appendChild(document.createTextNode(item));

  const deleteButton = createButton("remove-item btn-link text-red");

  listItem.appendChild(deleteButton);
  itemList.appendChild(listItem);

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

function checkItemExists(item) {
  const itemFromStorage = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

  return itemFromStorage.includes(item)
}

function addItemToStorage(item) {

  // Option -> 1

  const itemFromStorage = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

  itemFromStorage.push(item)

  localStorage.setItem('items', JSON.stringify(itemFromStorage))

  // Option -> 2

  // let itemFromStorage;

  // if (localStorage.getItem('items') === null) {
  //   itemFromStorage = []
  // } else {
  //   itemFromStorage = JSON.parse(localStorage.getItem('items'))
  // }
  // itemFromStorage.push(item)
  // localStorage.setItem('items', JSON.stringify(itemFromStorage))
}

function onClickListItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement)
  } else {
    setItemToEdit(e.target)
  }
}

function setItemToEdit(item) {
  if (item.tagName === "LI") {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach((data) => {
      data.classList.remove('edit-mode')
    })

    item.classList.add("edit-mode")
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    formBtn.style.backgroundColor = "green"

    formInput.value = item.textContent
  }
}

function removeItem(item) {
  // 1st way to check the clicked element via class name
  if (confirm("Are you sure?")) {
    item.remove()

    removeFromLocalStorage(item.textContent)
  } 
  
  resetUI();

  // 2nd way to check if the clicked element is a button

  // if (e.target.parentElement.tagName === "BUTTON") {
  //   const listItem = e.target.parentElement.parentElement;
  //   itemList.removeChild(listItem);
  // }
}

function removeFromLocalStorage(item) {
    let itemFromStorage = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

    itemFromStorage = itemFromStorage.filter((data) => {
      return data !== item
    })

    localStorage.setItem('items', JSON.stringify(itemFromStorage))
}

function clearItems() {
  // 1st way to clear the list
  // itemList.innerHTML = "";

  // 2nd way to clear the list
  while (itemList.firstChild) {
    // itemList.firstChild.remove();
    itemList.removeChild(itemList.firstChild);
  }
  // clear from local storage
  localStorage.removeItem('items')
  resetUI();
}

// 1st way to filter items
function filterItems(e) {
  const inputText = e.target.value.trim().toLowerCase();
  const listItems = itemList.querySelectorAll("li");

  listItems.forEach((item) => {
    const itemName = item.firstChild.textContent.trim().toLocaleLowerCase();
    if (itemName.indexOf(inputText) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// 2nd way to filter items

// function filterItems(e) {
//   const inputText = e.target.value.toLowerCase();
//   const listItems = itemList.querySelectorAll("li");

//   console.log(inputText);
//   console.log(listItems);

//   listItems.forEach((item) => {
//     const itemText = item.textContent.toLowerCase();
//     if (itemText.includes(inputText)) {
//       item.style.display = "flex";
//     } else {
//       item.style.display = "none";
//     }
//   });
// }

function resetUI() {
  formInput.value = '';

  const listItems = itemList.querySelectorAll("li");
  if (listItems.length === 0) {
    clearBtn.style.display = "none";
    filterInput.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filterInput.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
  formBtn.style.backgroundColor = "#333"

  isEditMode = false
}

formItem.addEventListener("submit", addItem);
itemList.addEventListener("click", onClickListItem);
clearBtn.addEventListener("click", clearItems);
filterInput.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems)

resetUI();
