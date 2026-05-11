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

function evaluarCredito(){
    if(clienteSeleccionado == null){
        mostrarTexto("resultadoCredito", "Primero busque un cliente");
        return;
    }
    let monto = recuperarFloat("monto");
    if(isNaN(monto)){
        mostrarTexto("resultadoCredito", "Ingrese un monto válido");
        return;
    }
    let capacidadPago = clienteSeleccionado.ingresos - clienteSeleccionado.egresos;
    let cuota = monto * (tasaInteres / 100);
    if(cuota <= capacidadPago * 0.4){
        mostrarTexto("resultadoCredito", "✅ Crédito APROBADO");
    }else{
        mostrarTexto("resultadoCredito", "❌ Crédito RECHAZADO");
    }
}