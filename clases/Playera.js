class Playera {
    constructor(titulo, descripcion, precio, tipo, existencia) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.tipo = tipo;
        this.existencia = existencia;
    }

    actualizarExistencia(accion) {
        accion === 'salida' ? this.existencia-- : this.existencia++;
    }
}


