const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;
// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];
let onDrag = false;
// Drag Functionality
let draggedItem;
let currentColumn;
// Filter Arays to remove empty spaces
function filterArray(array) {
	const filteredArray = array.filter((item) => item !== null);
	return filteredArray;
}

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
	if (localStorage.getItem('backlogItems')) {
		backlogListArray = JSON.parse(localStorage.backlogItems);
		progressListArray = JSON.parse(localStorage.progressItems);
		completeListArray = JSON.parse(localStorage.completeItems);
		onHoldListArray = JSON.parse(localStorage.onHoldItems);
	} else {
		backlogListArray = [ 'Release the course', 'Sit back and relax' ];
		progressListArray = [ 'Work on projects', 'Listen to music' ];
		completeListArray = [ 'Being cool', 'Getting stuff done' ];
		onHoldListArray = [ 'Being uncool' ];
	}
}
// Set localStorage Arrays
function updateSavedColumns() {
	listArrays = [ backlogListArray, progressListArray, completeListArray, onHoldListArray ];
	const arrayNames = [ 'backlog', 'progress', 'complete', 'onHold' ];
	arrayNames.forEach((arrayName, index) => {
		localStorage.setItem(`${arrayName}Items`, `${JSON.stringify(listArrays[index])}`);
	});
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
	// console.log('columnEl:', columnEl);
	// console.log('column:', column);
	// console.log('item:', item);
	// console.log('index:', index);
	// List Item
	const listEl = document.createElement('li');
	listEl.classList.add('drag-item');
	listEl.textContent = item;
	columnEl.append(listEl);
	listEl.contentEditable = true;
	listEl.id = index;
	listEl.setAttribute('onfocusout', `updateItem(${index},${column})`);
	listEl.draggable = true; // to be able to drag elements
	listEl.setAttribute('ondragstart', 'drag(event)');
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
	// Check localStorage once
	if (!updatedOnLoad) {
		getSavedColumns();
	}
	// Backlog Column
	backlogList.textContent = '';
	backlogListArray.forEach((backlogItem, index) => {
		createItemEl(backlogList, 0, backlogItem, index);
	});
	backlogListArray = filterArray(backlogListArray);
	// Progress Column
	progressList.textContent = '';
	progressListArray.forEach((progressItem, index) => {
		createItemEl(progressList, 1, progressItem, index);
	});
	progressListArray = filterArray(progressListArray);

	// Complete Column
	completeList.textContent = '';
	completeListArray.forEach((completeItem, index) => {
		createItemEl(completeList, 2, completeItem, index);
	});
	completeListArray = filterArray(completeListArray);

	// On Hold Column
	onHoldList.textContent = '';
	onHoldListArray.forEach((onHoldItem, index) => {
		createItemEl(onHoldList, 3, onHoldItem, index);
	});
	onHoldListArray = filterArray(onHoldListArray);
	// Run getSavedColumns only once, Update Local Storage
	updatedOnLoad = true;
	updateSavedColumns();
}
// update item - delete if necessary or update array value
function updateItem(id, column) {
	const selectedArray = listArrays[column];
	const selectedColumnEl = listColumns[column].children;
	if (!onDrag) {
		if (!selectedColumnEl[id].textContent) {
			//if no text ...
			delete selectedArray[id]; // we delete the whole list
		} else {
			selectedArray[id] = selectedColumnEl[id].textContent;
		}
		updateDOM(); //and how changes to DOM
	}
}

// add to column list, reset textbox
function addToColumn(column) {
	const itemText = addItems[column].textContent;
	const selectedArray = listArrays[column];
	selectedArray.push(itemText);
	addItems[column].textContent = '';
	updateDOM();
}
//show add item box
function showInputBox(column) {
	addBtns[column].style.visibility = 'hidden'; // hide add item once clicked
	saveItemBtns[column].style.display = 'flex'; // save button
	addItemContainers[column].style.display = 'flex'; // item container where text is entered
}
// hide item input box
function hideInputBox(column) {
	addBtns[column].style.visibility = 'visible'; // show add item once clicked
	saveItemBtns[column].style.display = 'none'; // save button hide
	addItemContainers[column].style.display = 'none'; // item container where text is entered hide it
	addToColumn(column);
}

//allows arrays to reflect drag and drop and save it in localstorage
function rebuildArrays() {
	backlogListArray = Array.from(backlogList.children).map((i) => i.textContent); // a better way of doing same thing as complete and hold cleaner code
	// array.from because we convert dom elements into aray like structure
	progressListArray = Array.from(progressList.children).map((i) => i.textContent);
	// array.from because we convert dom elements into aray like structure
	completeListArray = [];
	for (let i = 0; i < completeList.children.length; i++) {
		completeListArray.push(completeList.children[i].textContent);
	}
	onHoldListArray = [];
	for (let i = 0; i < onHoldList.children.length; i++) {
		onHoldListArray.push(onHoldList.children[i].textContent);
	}
	updateDOM();
}
// when item starts dragging
function drag(e) {
	onDrag = true;
	draggedItem = e.target; // which element did we drag
}
// visual reference when column enters droppable area
function dragEnter(column) {
	listColumns[column].classList.add('over');
	currentColumn = column;
}
//column allows for function to be dropped
function allowDrop(e) {
	e.preventDefault(); /// by default dragging dropping is not allowed
}
// dropping item in the column
function drop(e) {
	e.preventDefault();
	// remove backcol and padding
	listColumns.forEach((column) => {
		column.classList.remove('over');
	});
	// add item to column
	const parent = listColumns[currentColumn];
	parent.appendChild(draggedItem);
	rebuildArrays();
	onDrag = false;
}
// on load
updateDOM();
