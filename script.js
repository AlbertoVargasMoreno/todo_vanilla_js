const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addItem);

const form = document.getElementById("input-wrapper");
form.addEventListener("submit", 
	(e) => {
		e.preventDefault();
	}
);

function addItem() {
	const ul = document.getElementById("list");
	const input = document.getElementById("input");
	const text = input.value;
	if (text === "") {
		alert("adding empty");
		return;
	}

	const newItem = document.createElement("li");
	newItem.innerText = text;
	newItem.onclick = checkItem;

	const deleteButton = document.createElement("span");
	deleteButton.innerHTML = '&times';
	deleteButton.classList.add("deleter");
	deleteButton.onclick = deleteItem;

	newItem.appendChild(deleteButton);

	input.value = "";
	ul.appendChild(newItem);
}

function checkItem() {
	const item = this;
	item.classList.toggle("checked");
}

function deleteItem() {
	const item = this.parentNode;
	const todosList = item.parentNode;
	todosList.removeChild(item);
}

