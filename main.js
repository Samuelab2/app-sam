let table = document.getElementById("table")
const editButton = document.getElementById("editar")
const deleteButton = document.getElementById("eliminar")
const addButton = document.getElementById("agregar")

fetch('datos.json', {
	method: "GET",
})
	.then(response => response.json())
	.then(data => createTable(data))

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
	let tr = table.insertRow(-1);                   // TABLE ROW.
	for (let i = 0; i < col.length; i++) {
		let th = document.createElement("th");      // TABLE HEADER.
		th.innerHTML = col[i];
		tr.appendChild(th);
	}
	
	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (let i = 0; i < data.length; i++) {
		tr = table.insertRow(-1);
		tr.classList.add('cell' + i)
		
		for (let j = 0; j < col.length; j++) {
			let tabCell = tr.insertCell(-1);
			tabCell.innerHTML = data[i][col[j]];
		}
	}
}


const agregarFila = () => {
	let newRow = table.insertRow(-1);
}

addButton.addEventListener('click', agregarFila)























// $(function(){
// 	//-- function que va por ajax hacia el archivo datos.json y trae su contenido . y lo imprime por consola
// 	function carga_de_datos(){
// 		var datos = "";
// /*		var datos = $.param({"validar": true,"function": "ejemplo"});*/
// 	    $.ajax({
// 	        type: "POST",
// 	        url: "datos.json",
// 	        data: datos,
// 	        statusCode: {
// 	            404: function () {
// 	                console.log("Ups! ha ocurrido un inconveniente, function ");
// 	            }
// 	        }
// 	    }).done(function (resp){
// 	    	console.log(resp)
// 	    });
// 	}
// 	carga_de_datos();
// });
