let table = document.getElementById("table")

const addButton = document.getElementById("agregar")

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
			let input = document.createElement("input")
			tabCell.appendChild(input)
			input.type = "text"
			input.value = data[i][col[j]];
			input.classList.add(`${col[j]}`)
			input.disabled = true;
			// tabCell.innerHTML = data[i][col[j]];
		}
	}
	
	// Creating the delete buttons
	for (let i = 1; i < table.rows.length; i++) {
		let x = document.createElement("input")
		table.rows[i].insertCell(-1).appendChild(x)
		x.type = "button"
		x.value = "eliminar"
		x.onclick = function deleteRows(r) {
			let i = this.parentNode.parentNode.rowIndex;
			table.deleteRow(i);
		}
	}

	//creating edit button
	for (let i = 1; i < table.rows.length; i++) {
		//creating saving button
		let c = document.createElement("input")
		c.type = "button"
		c.value = "guardar"
		c.classList.add("hide")
		
		//creating edit button
		let z = document.createElement("input")
		
		table.rows[i].insertCell(-1).appendChild(z)
		z.type = "button"
		z.value = "editar"
		z.onclick = function editRows(r) {
			let p = this.parentNode.parentNode.rowIndex;
			let h = table.rows[p].querySelectorAll("[type=text]");
			for (let i = 0; i < h.length; i++) {
				h[i].disabled = false;
				h[i].classList.remove("nombres", "apellidos", "edad")
				c.classList.remove("hide")
				z.classList.add("hide")
			}
		}
		
		table.rows[i].insertCell(-1).appendChild(c)
		c.onclick = function blockRows(r) {
			let p = this.parentNode.parentNode.rowIndex;
			let h = table.rows[p].querySelectorAll("[type=text]");
			for (let i = 0; i < h.length; i++) {
				h[i].disabled = true;
				h[i].classList.add("nombres", "apellidos", "edad")
				c.classList.add("hide")
				z.classList.remove("hide")
			}
		}
	}
}

const agregarFila = () => {

	let tr = table.insertRow(-1);
	let thead = table.rows[0].cells.length - 1
	let i = 0;

	while (i <= thead) {
		let input = document.createElement("input")
		input.type = "text"
		// input.classList.add(`${table.rows[0].cells[i].innerHTML}`)
		tr.insertCell(-1).appendChild(input)
		i++
	}

	// inserting the delete button
	let x = document.createElement("input")
	tr.insertCell(-1).appendChild(x)
	x.type = "button"
	x.value = "eliminar"
	x.onclick = function deleteSelectedRows(r) {
		let i = this.parentNode.parentNode.rowIndex;
		table.deleteRow(i);
	}
	
	//creating edit button
	let z = document.createElement("input")
	tr.insertCell(-1).appendChild(z)
	z.type = "button"
	z.value = "editar"
	z.classList.add("hide")
	z.onclick = function deleteSelectedRows(r) {
		let p = this.parentNode.parentNode.rowIndex;
		let h = table.rows[p].querySelectorAll("[type=text]");
		for (let i = 0; i < h.length; i++) {
			h[i].disabled = false;
			h[i].classList.remove("nombres")
			h[i].classList.remove("apellidos")
			h[i].classList.remove("edad")
			z.classList.add("hide")
			c.classList.remove("hide")
		}
	}

	// inserting the save button
	let c = document.createElement("input")
	c.type = "button"
	c.value = "guardar"
	tr.insertCell(-1).appendChild(c)
	c.onclick = function deleteSelectedRows(r) {

		let p = this.parentNode.parentNode.rowIndex;
		let h = table.rows[p].querySelectorAll("[type=text]");
		for (let i = 0; i < h.length; i++) {
			h[i].disabled = true;
			h[i].classList.add("nombres")
			h[i].classList.add("apellidos")
			h[i].classList.add("edad")
			c.classList.add("hide")
			z.classList.remove("hide")
		}
	}
}

//adding listener to the add button
addButton.addEventListener('click', agregarFila);

//making the request
fetch('datos.json', {
	method: "GET",
})
.then(response => response.json())
.then(data => createTable(data))