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
    let secciones = document.getElementsByClassName("seccion");
    for(let i = 0; i < secciones.length; i++){
        secciones[i].classList.remove("activa");
    }
}


function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
    if(id === "listaCreditos"){
        pintarCreditos();
    }

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
    if(clienteSeleccionado === null){
        let cliente = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            ingresos: ingresos,
            egresos: egresos
        };
        clientes.push(cliente);
    } else {
        clienteSeleccionado.nombre = nombre;
        clienteSeleccionado.apellido = apellido;
        clienteSeleccionado.ingresos = ingresos;
        clienteSeleccionado.egresos = egresos;
    }
    pintarClientes();
    limpiar();
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
                <button onclick="seleccionarCliente('${c.cedula}')">Actualizar</button>
            </td>
        </tr>`;
    }
}

function pintarCreditos(lista){
    let tabla = document.getElementById("tablaCreditos");
    tabla.innerHTML = "";
    for(let i = 0; i < lista.length; i++){
        let c = lista[i];
        tabla.innerHTML += `
        <tr>
            <td>${c.cedula}</td>
            <td>${c.nombre}</td>
            <td>${c.apellido}</td>
            <td>$${c.monto}</td>
            <td>${c.tasa}%</td>
            <td>${c.plazo} años</td>
            <td>$${c.cuota.toFixed(2)}</td>
            <td>
                <button onclick="eliminarCredito(${i})">Eliminar</button>
            </td>
        </tr>`;
    }
}


function buscarCliente(cedula){
    for(let i = 0; i < clientes.length; i++){
        if(clientes[i].cedula === cedula){
        return clientes[i];
        }
    }
    return null;
}

function seleccionarCliente(cedula){
    let cliente = buscarCliente(cedula);
    if(cliente !== null){
        clienteSeleccionado = cliente;
        mostrarTextoEnCaja("cedula", cliente.cedula);
        mostrarTextoEnCaja("nombre", cliente.nombre);
        mostrarTextoEnCaja("apellido", cliente.apellido);
        mostrarTextoEnCaja("ingresos", cliente.ingresos);
        mostrarTextoEnCaja("egresos", cliente.egresos);
    }
    document.getElementById("cedula").disabled = true;
}

function limpiar(){
    mostrarTextoEnCaja("cedula", "");
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");
    clienteSeleccionado = null;
    document.getElementById("cedula").disabled = false;
}


function buscarCliente(cedula){
    for(let i = 0; i < clientes.length; i++){
        if(clientes[i].cedula === cedula){
            return clientes[i];
        }
    }
    return null;
}
function buscarClienteCredito(){
    let cedula = recuperaraTexto("cedulaBusqueda");
    let cliente = buscarCliente(cedula);
    if(cliente == null){
        mostrarTexto("datosCliente", "Cliente no encontrado");
        return;
    }
    mostrarTexto("datosCliente",
        cliente.nombre + " " + cliente.apellido +
        " | Ingresos: " + cliente.ingresos +
        " | Egresos: " + cliente.egresos
    );
    clienteSeleccionado = cliente;
}

function buscarClienteCredito(){
    let cedula = recuperaraTexto("cedulaBusqueda");
    let cliente = buscarCliente(cedula);
    let contenedor = document.getElementById("datosClienteCredito");
    if(cliente != null){
        contenedor.innerHTML = `
        <h3>Datos del Cliente</h3>
        <p><strong>Cédula:</strong> ${cliente.cedula}</p>
        <p><strong>Nombre:</strong> ${cliente.nombre}</p>
        <p><strong>Apellido:</strong> ${cliente.apellido}</p>
        <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
        <p><strong>Egresos:</strong> ${cliente.egresos}</p>
        `;
        clienteSeleccionado = cliente;
    } else {
        contenedor.innerHTML = "<p style='color:red;'>Cliente no encontrado</p>";
    }
}

function calcularDisponible(ingresos, egresos) {
    return Math.max(ingresos - egresos, 0);
}

function calcularCapacidadDePago(disponible) {
    return disponible / 2;
}

function calcularInteresSimple(monto, tasa, anios) {
    return monto * (tasa / 100) * anios;
}

function calcularTotalPagar(monto, interes) {
    return monto + interes + 100; // SOLCA
}

function calcularCuotaMensual(total, anios) {
    return total / (anios * 12);
}

function aprobarCredito(capacidad, cuota) {
    return capacidad > cuota;
}

function evaluarCredito(){
    let ingresos = clienteSeleccionado.ingresos;
    let egresos = clienteSeleccionado.egresos;
    let monto = recuperarFloat("monto");
    let plazo = recuperarInt("plazo");
    let tasa = tasaInteres;
    montoCalculado = monto;
    plazoIngresado = plazo;
    let disponible = calcularDisponible(ingresos, egresos);
    let capacidad = calcularCapacidadDePago(disponible);
    let interes = calcularInteresSimple(monto, tasa, plazo);
    let total = calcularTotalPagar(monto, interes);
    let cuota = calcularCuotaMensual(total, plazo);
    cuotaCalculada = cuota;
    let aprobado = aprobarCredito(capacidad, cuota);
    creditoAprobado = aprobado;
    let resultado = document.getElementById("resultadoCredito");
    resultado.innerHTML = `
    Capacidad de pago: ${capacidad.toFixed(2)}<br>
    Total a pagar: ${total.toFixed(2)}<br>
    Cuota mensual: ${cuota.toFixed(2)}<br>
    RESULTADO: ${aprobado ? "APROBADO" : "RECHAZADO"}
    `;
    let btn = document.getElementById("btnAsignar");
    if(aprobado){
    resultado.className = "aprobado";
    btn.style.display = "inline-block"; 
    } else {
    resultado.className = "rechazado";
    btn.style.display = "none";
}

}

function asignarCredito(){
    if(!creditoAprobado){
        alert("El crédito no está aprobado");
        return;
    }
    let credito = {
        cedula: clienteSeleccionado.cedula,
        nombre: clienteSeleccionado.nombre,
        apellido: clienteSeleccionado.apellido,
        monto: montoCalculado,
        tasa: tasaInteres,
        plazo: plazoIngresado,
        cuota: cuotaCalculada
    };
    creditos.push(credito);
    alert("✅ Crédito asignado correctamente");
    document.getElementById("btnAsignar").style.display = "none";
}

function buscarCreditos(cedula){
    let lista = [];
    for(let i = 0; i < creditos.length; i++){
        if(creditos[i].cedula === cedula){
            lista.push(creditos[i]);
        }
    }
    return lista;
}

function buscarCreditosCliente(){
    let cedula = recuperaraTexto("buscarCedulaListado");
    let lista = buscarCreditos(cedula);
    if(lista.length === 0){
        alert("No existen créditos para esta cédula");
    }
    pintarCreditos(lista);
}


function mostrarSeccion(id){
    ocultarSecciones();
    let seccion = document.getElementById(id);
    if(seccion){
        seccion.classList.add("activa");
    }
    if(id === "listaCreditos"){
        pintarCreditos(creditos);
    }
}

pintarCreditos(creditos);

function eliminarCredito(indice){
    if(confirm("¿Eliminar crédito?")){
        creditos.splice(indice, 1);
        pintarCreditos(creditos);
    }
}
