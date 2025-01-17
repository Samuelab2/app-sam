fetch('datos.json', {
	method: "GET",
})
	.then(response => response.json())
	.then(data => createTable(data))

let table = document.getElementById("table")

const createTable = data => {

	// EXTRACT VALUE FOR HTML HEADER. 
	let col = [];
	for (let i = 0; i < data.length; i++) {
		for (let key in data[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}

	// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
	let tr = table.insertRow(-1);
	for (let i = 0; i < col.length; i++) {
		let th = document.createElement("th");
		th.innerHTML = col[i];
		tr.appendChild(th);
	}

	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (let i = 0; i < data.length; i++) {
		tr = table.insertRow(-1);
		for (let j = 0; j < col.length; j++) {
			let tabCell = tr.insertCell(-1);
			table.appendChild(tr)
			tabCell.innerHTML = data[i][col[j]];
		}
	}
	selectedRowToInput();
}

let rIndex;

// check the empty input
const checkEmptyInput = () => {
	let isEmpty = false;
	let	fname = document.getElementById("fname").value;
	let	lname = document.getElementById("lname").value;
	let	age = document.getElementById("age").value;

	if (fname === "") {
		alert("First Name Connot Be Empty");
		isEmpty = true;
	}
	else if (lname === "") {
		alert("Last Name Connot Be Empty");
		isEmpty = true;
	}
	else if (age === "") {
		alert("Age Connot Be Empty");
		isEmpty = true;
	}
	return isEmpty;
}

// add Row
const addHtmlTableRow = () => {
	if (!checkEmptyInput()) {
		let newRow = table.insertRow(table.length);
		let cell1 = newRow.insertCell(0);
		let cell2 = newRow.insertCell(1);
		let cell3 = newRow.insertCell(2);
		let fname = document.getElementById("fname").value;
		let	lname = document.getElementById("lname").value;
		let	age = document.getElementById("age").value;

		cell1.innerHTML = fname;
		cell2.innerHTML = lname;
		cell3.innerHTML = age;

		selectedRowToInput();
	}
}

const selectedRowToInput = () => {

	for (let i = 1; i < table.rows.length; i++) {
		table.rows[i].onclick = function () {
			rIndex = this.rowIndex;
			document.getElementById("fname").value = this.cells[0].innerHTML;
			document.getElementById("lname").value = this.cells[1].innerHTML;
			document.getElementById("age").value = this.cells[2].innerHTML;
		};
	}
}

selectedRowToInput();

const editHtmlTbleSelectedRow = () => {
	let fname = document.getElementById("fname").value;
	let lname = document.getElementById("lname").value;
	let age = document.getElementById("age").value;
	if (!checkEmptyInput()) {
		table.rows[rIndex].cells[0].innerHTML = fname;
		table.rows[rIndex].cells[1].innerHTML = lname;
		table.rows[rIndex].cells[2].innerHTML = age;
	}
}

const removeSelectedRow = () => {
	table.deleteRow(rIndex);
	document.getElementById("fname").value = "";
	document.getElementById("lname").value = "";
	document.getElementById("age").value = "";
}

const validateName = str => {
	if (str.match(/^[a-zA-Z]{0,45}$/)) {

		document.getElementById('fname').style.background = "transparent";
		document.getElementById("agregar").disabled = false;
		document.getElementById("editar").disabled = false;
		document.getElementById("eliminar").disabled = false;
	} else {
		document.getElementById('fname').style.background = "lightcoral";
		document.getElementById("agregar").disabled = true;
		document.getElementById("editar").disabled = true;
		document.getElementById("eliminar").disabled = true;
	}
}

const validatelName = str => {
	if (str.match(/^[a-zA-Z]{0,45}$/)) {

		document.getElementById('lname').style.background = "transparent";
		document.getElementById("agregar").disabled = false;
		document.getElementById("editar").disabled = false;
		document.getElementById("eliminar").disabled = false;
	} else {
		document.getElementById('lname').style.background = "lightcoral";
		document.getElementById("agregar").disabled = true;
		document.getElementById("editar").disabled = true;
		document.getElementById("eliminar").disabled = true;
	}
}

const validateAge = str => {
	if (str.match(/^[\d]{0,3}$/)) {

		document.getElementById('age').style.background = "transparent";
		document.getElementById("agregar").disabled = false;
		document.getElementById("editar").disabled = false;
		document.getElementById("eliminar").disabled = false;
	} else {
		document.getElementById('age').style.background = "lightcoral";
		document.getElementById("agregar").disabled = true;
		document.getElementById("editar").disabled = true;
		document.getElementById("eliminar").disabled = true;
	}
}