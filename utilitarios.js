function recuperaraTexto(idComponente){
    let componente;
    let valorIngresado;
    componente=document.getElementById(idComponente);
    valorIngresado=componente.value;
    return valorIngresado;
}
    
function recuperarInt(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorEntero=parseInt(valorCaja);
        return valorEntero;
}
function recuperarFloat(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorFlotante=parseFloat(valorCaja);
        return valorFlotante;
}
function mostrarTexto(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.innerText=mensaje;
}
function mostrarTextoEnCaja(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.value=mensaje;
}
    
function mostrarImagen(idComponente,rutaImagen){
        let componente;
        componente=document.getElementById(idComponente);
        componente.src = rutaImagen;
    
}

function ocultarSecciones(){
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
}

function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
    let tasa = recuperarFloat("tasaInteres");
    if(isNaN(tasa)){
    mostrarTexto("mensajeTasa", "Ingrese un valor numérico válido");
    return;
    }
    if(tasa < 10 || tasa > 20){
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    return;
    }
    tasaInteres = tasa;
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
}

function guardarCliente(){
    let cedula = recuperaraTexto("cedula");
    let nombre = recuperaraTexto("nombre");
    let apellido = recuperaraTexto("apellido");
    let ingresos = recuperarFloat("ingresos");
    let egresos = recuperarFloat("egresos");    
    if(cedula === "" || nombre === "" || apellido === "" || isNaN(ingresos) || isNaN(egresos)){
        alert("Complete todos los campos correctamente");
        return;
    }
    let cliente = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        ingresos: ingresos,
        egresos: egresos
    }

    clientes.push(cliente);
    pintarClientes();
    limpiarFormulario();
}

function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";
    
 for(let i = 0; i < clientes.length; i++){

        let c = clientes[i];

        tabla.innerHTML += `
        <tr> 
            <td>${c.cedula}</td>
            <td>${c.nombre}</td>
            <td>${c.apellido}</td>
            <td>${c.ingresos}</td>
            <td>${c.egresos}</td>
            <td>
                <button onclick="actualizarCliente(${i})">Actualizar</button></td>
        </tr>
        `;
    }
}
function limpiarFormulario(){
    mostrarTextoEnCaja("cedula", "");
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");
}
    