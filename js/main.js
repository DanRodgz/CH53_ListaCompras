const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

// Numeración de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

let datos = new Array(); // Almacena los elementos de la tabla [Array]

function validarCantidad() {
  if (txtNumber.value.trim().length <= 0) {
    return false;
  } //length <=0

  if (isNaN(txtNumber.value)) {
    return false;
  } // isNaN (Not a Number)

  if (Number(txtNumber.value) >= 0) {
    return true;
  } // >=0 valor es mayor o igual que 0
} // validarCantidad

function getPrecio() {
  return Math.round(Math.random() * 10000) / 100;
} // getPrecio

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();

  let isValid = true; // Bandera, al ser true permite agregar los datos a la tabla

  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  txtName.style.border = "";
  txtNumber.style.border = "";

  txtName.value = txtName.value.trim();
  txtNumber.value = txtNumber.value.trim();

  if (txtName.value.length < 3) {
    txtName.style.border = "solid medium red";
    alertValidacionesTexto.innerHTML =
      "<strong>El nombre del producto no es correcto.</strong>";
    alertValidaciones.style.display = "block";
    isValid = false;
  } // length menor que tres, sino se cumple el borde se ilumina de rojo.

  if (!validarCantidad()) {
    txtNumber.style.border = "solid medium red";
    alertValidacionesTexto.innerHTML +=
      "<br/><strong>La cantidad no es correcta.</strong>";
    alertValidaciones.style.display = "block";
    isValid = false;
  } //ValidarCantidad

  if (isValid) {
    // Si pasó las validaciones
    cont++; // Primera columna
    let precio = getPrecio(); // Última columna
    let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                    </tr>`;

    let elemento = {
      cont: cont,
      nombre: txtName.value,
      cantidad: txtNumber.value,
      precio: precio,
    };
    datos.push(elemento);
    localStorage.setItem("datos", JSON.stringify(datos)); // Transforma todos los datos a string

    cuerpoTabla.insertAdjacentHTML("beforeend", row); // Posición que va a tomar en el HTML

    costoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText = "$" + costoTotal.toFixed(2);

    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;

    contadorProductos.innerText = cont;

    let resumen = {
      cont: cont,
      totalEnProductos: totalEnProductos,
      costoTotal: costoTotal,
    };
    localStorage.setItem("resumen", JSON.stringify(resumen)); // Local storage con JSON

    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();
  } // if isValid (corrobora que no sean false los otros if)
}); // btnAgregar

window.addEventListener("load", function (event) {
  event.preventDefault();

  if (this.localStorage.getItem("datos") != null) {
    datos = JSON.parse(this.localStorage.getItem("datos"));
  }
  datos.forEach((d) => {
    let row = `<tr>
                <td>${d.cont}</td>
                <td>${d.nombre}</td>
                <td>${d.cantidad}</td>
                <td>${d.precio}</td>
               </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
  });

  if (this.localStorage.getItem("resumen") != null) {
    let resumen = JSON.parse(this.localStorage.getItem("resumen"));
    costoTotal = resumen.costoTotal;
    totalEnProductos = resumen.totalEnProductos;
    cont = resumen.cont;
  } // resumen != null

  precioTotal.innerText = "$" + costoTotal.toFixed(2);
  productosTotal.innerText = totalEnProductos;
  contadorProductos.innerText = cont;
}); // window.addEvenListener load (traer los datos de local storage aún habiendo cerrado la página)