let LIST_STATE = [];
const STATE_KEY = "todo-list";

initList();

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addItem);

const form = document.getElementById("input-wrapper");
form.addEventListener("submit", 
	(e) => {
		e.preventDefault();
	}
);

function initList() {
	LIST_STATE = loadState();
	const tasksList = document.getElementById("list");
	for (const task of LIST_STATE) {
		const li = generateItem(task.text, task.checked);
		tasksList.appendChild(li);
	}
}

function loadState() {
	const listState = localStorage.getItem(STATE_KEY);
	if (listState !== null) {
		return JSON.parse(listState);
	}
	return [];
}

function generateItem(_text, _checked=false) {
	const item = document.createElement("li");
	item.innerText = _text;
	item.classList.add("item");
	if (_checked) {
		item.classList.add("checked");
	}
	item.onclick = checkItem;

	const deleteButton = document.createElement("span");
	deleteButton.innerHTML = "&times";
	deleteButton.classList.add("deleter");
	deleteButton.onclick = deleteItem;

	item.appendChild(deleteButton);
	return item;
}

function addItem() {
	const input = document.getElementById("input");
	const text = input.value;
	if (text === "") {
		alert("Error: Task is empty");
		return;
	}
	input.value = "";

	const tasksList = document.getElementById("list");
	const newItem = generateItem(text);
	
	LIST_STATE.push({
		text,
		checked: false
	});
	saveState(LIST_STATE);

	tasksList.appendChild(newItem);
}

function saveState(list) {
	localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

function checkItem() {
	const item = this;
	const tasksList = item.parentNode;
	const index = Array.from(tasksList.childNodes).indexOf(item);
	
	LIST_STATE[index].checked = !LIST_STATE[index].checked;

	item.classList.toggle("checked");

	saveState(LIST_STATE);
}

function deleteItem(event) {
	const item = this.parentNode;
	const todosList = item.parentNode;

	todosList.removeChild(item);
	event.stopPropagation();
}
