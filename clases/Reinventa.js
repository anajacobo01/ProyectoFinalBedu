class Reinventa {
    constructor() {
        this.ordenes = [];
        this.inventario = [];
    }

    cargaExistencias(playeras) {
        this.inventario = playeras.map(
            (value) => new Producto(value.titulo, value.descripcion, value.precio, value.tipo, value.existencia)
        );
    }

    registrarVenta() {
        this.ordenes.push(new OrdenCompra());
        console.log(this.ordenes);
    }

    getVentaActiva() {
        return this.ordenes[this.ordenes.length - 1];
    }

    cerrarVenta() {
        if (this.getVentaActiva().productos.length === 0) {
            this.ordenes.pop();
            return 0;
        } else {
            return this.getVentaActiva().calcularTotal(this.inventario);
        }
    }

    actualizarInventario(titulo, tipo, accion) {
        this.inventario = this.inventario.reduce( (acc, producto) => {
            if (playeras.titulo === titulo && playeras.tipo === tipo) {
                producto.actualizarExistencia(accion);
            }
            acc.push(producto);
            return acc;
        }, []);
    }

    verVentas() {
        return this.ordenes;
    }
}

