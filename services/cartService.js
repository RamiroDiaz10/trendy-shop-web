const CART_KEY = "carrito";

function obtenerCarrito() {
    const carrito = localStorage.getItem(CART_KEY);
    return carrito ? JSON.parse(carrito) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
    window.dispatchEvent(new CustomEvent("carrito-actualizado"));
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            title: producto.title,
            thumbnail: producto.thumbnail,
            price: producto.price,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
}

function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito().filter(item => item.id !== id);
    guardarCarrito(carrito);
}

function vaciarCarrito() {
    localStorage.removeItem(CART_KEY);
}

function calcularTotal() {
    return obtenerCarrito().reduce((total, item) => total + (item.price * item.cantidad), 0);
}

export { obtenerCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, calcularTotal };