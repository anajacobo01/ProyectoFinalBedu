class Playera {
    constructor(titulo, descripcion, precio, tipo, existencia, tamano) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.tipo = tipo;
        this.existencia = existencia;
        this.tamano = tamano;
    }

    actualizarExistencia(accion) {
        accion === 'salida' ? this.existencia-- : this.existencia++;
    }
}


