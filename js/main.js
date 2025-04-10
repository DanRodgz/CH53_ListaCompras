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

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    } //length <=0 

    if(isNaN(txtNumber.value)){
        return false;
    } // isNaN (Not a Number)

    if(Number(txtNumber.value)>=0){
        return true;
    } // >=0 valor es mayor o igual que 0
} // validarCantidad

    function getPrecio(){
        return Math.round(Math.random()*10000) / 100;
    } // getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    let isValid = true; // Bandera, al ser true permite agregar los datos a la tabla

    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3 ){
        txtName.style.border="solid medium red";
        alertValidacionesTexto.innerHTML="<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display="block";
        isValid = false;
    } // length menor que tres, sino se cumple el borde se ilumina de rojo.

    if(! validarCantidad()){
        txtNumber.style.border="solid medium red";
        alertValidacionesTexto.innerHTML+="<br/><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display="block";
        isValid = false;
    } //ValidarCantidad

    if(isValid){ // Si pasó las validaciones
        cont++; // Primera columna
        let precio = getPrecio(); // Última columna
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                    </tr>`
        cuerpoTabla.insertAdjacentHTML("beforeend", row); // Posición que va a tomar en el HTML
        
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$" + costoTotal.toFixed(2);

        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        contadorProductos.innerText = cont;
        
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    } // if isValid (corrobora que no sean false los otros if)

}); // btnAgregar