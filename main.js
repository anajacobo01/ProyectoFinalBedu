let ventaActiva = false;
let allVentas = false;

const reinventa = new Reinventa();
reinventa.cargaExistencias(playeras);

const productosWrapper = document.querySelector('#playeras');

let posicion = 0;
for (playera of reinventa.inventario) {
  
    const wrapper = document.createElement('div');
    const titulo = document.createElement('h2');
    titulo.textContent = playera.titulo;
    const descripcion = document.createElement('h3');
    titulo.textContent = playera.descripcion;
    const precio = document.createElement('h5');
    precio.textContent = `$ ${playera.precio}`;
    const tipo = document.createElement('h5');
    titulo.textContent = playera.titulo;
    tipo.textContent = playera.tipo;
    descripcion.textContent = playera.descripcion;
    const existencia = document.createElement('h5');
    existencia.textContent = playera.existencia;
    existencia.id = `${playera.titulo.includes(' ') ? playera.titulo.replace(' ', '_') : playera.titulo}-${playera.tamano}-${posicion}-existencia`;
    wrapper.appendChild(titulo);
    wrapper.appendChild(descripcion);
    wrapper.appendChild(precio);
    wrapper.appendChild(tipo);
    wrapper.appendChild(existencia);
    const wrapperAcciones = document.createElement('div');
    wrapperAcciones.classList.add('contenedorAcciones')
    const agregar = document.createElement('button')
    agregar.textContent = '+';
    agregar.id = `${playera.titulo.includes(' ') ? playera.titulo.replace(' ', '_') : playera.titulo}-${playera.tipo}-${playera.tamano}-${posicion}-agregar`;
    agregar.classList.add('productoButton');
    agregar.classList.add('productoAgrega');
    agregar.classList.add('buttonInvisible');
    const quitar = document.createElement('button')
    quitar.textContent = '-';
    quitar.id = `${playera.titulo.includes(' ') ? playera.titulo.replace(' ', '_') : playera.titulo}-${playera.tipo}-${playera.tamano}-${posicion}-quitar`;
    quitar.classList.add('productoButton');
    quitar.classList.add('productoQuita');
    quitar.classList.add('buttonInvisible');
    quitar.disabled = true;
    wrapperAcciones.appendChild(agregar);
    wrapperAcciones.appendChild(quitar);
    wrapper.appendChild(wrapperAcciones);
    wrapper.classList.add('contenedorProducto');
    productosWrapper.appendChild(wrapper);
    posicion++;
}

document.querySelector('#nuevaVenta').addEventListener('click', function(event) {
    ventaActiva = !ventaActiva;
    if (ventaActiva) {
        event.target.textContent = 'Cobrar';
        for (elemento of document.querySelectorAll('.productoButton')) {
            elemento.classList.remove('buttonInvisible');
            elemento.classList.add('buttonVisible');
        }
        if (allVentas) {
            document.querySelector('#wapperDetalleVentas').style.display='none';
            document.querySelector('#detalleVentas').innerHTML = '';
            allVentas = false;
        }
        document.querySelector('#allVentas').disabled = true;
        reinventa.registrarVenta();
    } else {
        event.target.textContent = 'Iniciar Venta';
        for (elemento of document.querySelectorAll('.productoButton')) {
            elemento.classList.remove('buttonVisible');
            elemento.classList.add('buttonInvisible');
        }
        document.querySelector('#allVentas').disabled = null;
        alert(`EL total de su compra es: $${reinventa.cerrarVenta()}`);
        for (b of document.querySelectorAll('.productoQuita')) {
            b.disabled = true;
        }
    }
});

document.querySelector('#allVentas').addEventListener('click', function(event) {
    allVentas = !allVentas;
    if (allVentas) {
        document.querySelector('#wapperDetalleVentas').style.display='flex';
    } else {
        document.querySelector('#wapperDetalleVentas').style.display='none';
    }

    if (reinventa.verVentas().length === 0) {
        document.querySelector('#detalleVentas').textContent = '<h1>Sin ventas registradas</h1>';
    } else {
        const wrapperFull = document.createElement('table');
        const wrapperFields = document.createElement('thead');
        const wrapperData = document.createElement('tbody');
        const wrapperFieldsRow = document.createElement('tr');
        for (field of ['Venta','Productos', 'Total']) {
            const fieldElem = document.createElement('th');
            fieldElem.textContent = field;
            wrapperFieldsRow.appendChild(fieldElem);
        }
        wrapperFields.appendChild(wrapperFieldsRow);
        wrapperFull.appendChild(wrapperFields);
        let orden = 1;
        for (venta of playera.verVentas()) {
            const detalleVenta = venta.getDetalleOrden(playera.inventario);
            console.log(detalleVenta);
            const wrapperDataRow = document.createElement('tr');
            for (field of ['Venta','Productos', 'Total']) {
                const fieldElem = document.createElement('td');
                fieldElem.textContent = 
                    field.toLowerCase() === 'venta'
                        ? orden
                        : field.toLowerCase() === 'total'
                            ? `$ ${detalleVenta[field.toLowerCase()]}`
                            : detalleVenta[field.toLowerCase()];
                wrapperDataRow.appendChild(fieldElem);
            }
            wrapperData.appendChild(wrapperDataRow);
            orden++;
        }
        wrapperFull.appendChild(wrapperData);
        document.querySelector('#detalleVentas').innerHTML = wrapperFull.outerHTML;
    }
});

for (boton of document.querySelectorAll('.productoAgrega')) {
    boton.addEventListener('click', function(event) {
        const tipo = event.target.id.split('-');
        console.log(tipo);
        const tituloProducto = tipo[0].includes('_') ? tipo[0].replace('_', ' ') : tipo[0];
        const playera = reinventa.inventario.filter( (valor) => valor.titulo === tituloProducto  && valor.tipo === tipo[1]);
        console.log(playera);
        reinventa.getVentaActiva().agregarProducto(playera);
    
        reinventa.actualizarInventario(playera.titulo, playera.tipo, 'salida');
        document.querySelector(`#${tipo[0]}-${tipo[1]}-${tipo[2]}-existencia`).textContent = playera.existencia;
        const productoOrdenCompra = reinventa.getVentaActiva().getCantidadProducto(playera);
        document.querySelector(`#${tipo[0]}-${tipo[1]}-${tipo[2]}-quitar`).disabled = productoOrdenCompra === 0 ? true : false;
    });
}

for (botonq of document.querySelectorAll('.productoQuita')) {
    botonq.addEventListener('click', function(event) {
        const tipo = event.target.id.split('-');
        const tipoProducto = tipo[0].includes('_') ? tipo[0].replace('_', ' ') : tipo[0];
        const playera = reinventa.inventario.filter( (valor) => valor.tipo === tipoProducto && valor.tamano === tipo[1])[0];
        reinventa.getVentaActiva().quitarProducto(playera);
        reinventa.actualizarInventario(playera.tipo, playera.tamano, 'entrada');
        document.querySelector(`#${tipo[0]}-${tipo[1]}-${tipo[2]}-existencia`).textContent = playera.existencia;
        const productoOrdenCompra = reinventa.getVentaActiva().getCantidadProducto(playera);
        document.querySelector(`#${tipo[0]}-${tipo[1]}-${tipo[2]}-quitar`).disabled = productoOrdenCompra === 0 ? true : false;
    });
}


document.querySelector('#wapperDetalleVentas > div:nth-child(1) > button')
    .addEventListener('click', function(event) {
        document.querySelector('#detalleVentas').innerHTML = '';
        document.querySelector('#wapperDetalleVentas').style.display='none';
        allVentas = false;
    });
