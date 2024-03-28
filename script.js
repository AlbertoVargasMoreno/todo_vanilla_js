let listState = [];
const STATE_KEY = "todo-list";

function loadState() {
	const listState = localStorage.getItem(STATE_KEY);
	if (listState !== null) {
		return JSON.parse(listState);
	}
	return [];
}

function saveState(list) {
	localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

function initList() {
	listState = loadState();
	const tasksList = document.getElementById("list");
	for (const task of listState) {
		const li = document.createElement("li");
		li.innerText = task.text;

		const deleteButton = document.createElement("span");
		deleteButton.classList.add("deleter");
		deleteButton.onclick = deleteItem;
		li.appendChild(deleteButton);
		
		li.classList.add("item");
		if (task.checked) {
			li.classList.add("checked");
		}

		tasksList.appendChild(li);
	}
	// needs to render the delete button
}

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addItem);

const form = document.getElementById("input-wrapper");
form.addEventListener("submit", 
	(e) => {
		e.preventDefault();
	}
);

initList();

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
	
	listState.push({
		text,
		checked: false
	});
	saveState(listState);

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

