class OrdenCompra {
    constructor() {
        this.playeras = [];
    }

    agregarProducto(playera) {
        const existe = this.playeras.filter(
            valor => valor.titulo === playera.titulo && valor.tipo === playera.tipo);
        if (existe.length === 0) {
            this.playera.push({ titulo: playera.titulo, tipo: playera.tipo, cantidad: 1});
        } else {
            this.playera = this.playera.reduce( (acc, valor) => {
                if (valor.titulo === playera.titulo && valor.tipo === playera.tipo) {
                    valor.cantidad++;
                }
                acc.push(valor);
                return acc;
            }, []);
        }
    }

    quitarProducto(playera) {
        this.playera = this.playera.reduce( (acc, valor) => {
            if (valor.tipo === playera.tipo && valor.tamano === playera.tamano) {
                if (valor.cantidad > 1) {
                    valor.cantidad--;
                    acc.push(valor);
                }
            } else {
                acc.push(valor);
            }
            return acc;
        }, []);
        console.log(this.playera);
    }

    calcularTotal(inventario) {
        return this.playera.reduce((acc, producto) => {
            const registro = inventario.filter( valor => valor.titulo === playera.titulo && valor.tipo === playera.tipo)[0];
            acc += registro.precio * producto.cantidad;
            return acc
        },0);
    }

    getCantidadProducto(playera) {
        const productoOrden = this.playera.filter(
            valor => valor.tipo === playera.titulo && valor.tipo === playera.tipo
        );
        if (productoOrden.length === 0) {
            return 0;
        } else {
            productoOrden[0].cantidad;
        }
    }

    getDetalleOrden(inventario) {
        return {
            playera: this.playera.reduce((acc, valor) => acc += valor.cantidad, 0),
            detalle: this.playera,
            total: this.calcularTotal(inventario)
        };

    }

}

