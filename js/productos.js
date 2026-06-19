import { getProductos } from "../services/productService.js";
import { agregarAlCarrito } from "../services/cartService.js";

let productos = []



async function obtenerProductos(...categorias) {

    document.getElementById("productos").innerHTML = "";
    productos = [];

    for (const categoria of categorias) {
        const productosCategoria = await getProductos(categoria);
        productos.push(...productosCategoria);

        productosCategoria.forEach(producto => {
            document.getElementById("productos").innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                <div class="card-body">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text">${producto.description}</p>
                    <button data-id="${producto.id}" class="btn btn-primary agregar-carrito">Agregar al carrito</button>
                </div>
            </div>
            `;
        });
    }
}

document.getElementById("productos").addEventListener("click", function (e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const id = Number(e.target.dataset.id);
        const producto = productos.find(p => p.id === id);
        if (producto) {
            agregarAlCarrito(producto);
        }
    }
});

function obtenerProductosHombre() {
    document.getElementById("Hombre")
        .addEventListener("click", function () {
            obtenerProductos("mens-shirts", "mens-shoes", "mens-watches");
        });
}

function obtenerProductosMujer() {
    document.getElementById("Mujer")
        .addEventListener("click", function () {
            obtenerProductos("womens-dresses", "tops", "womens-shoes", "womens-watches");
        });
}

function obtenerProductosJewelery() {
    document.getElementById("Accesorios")
        .addEventListener("click", function () {
            obtenerProductos("womens-jewellery", "womens-bags", "sunglasses");
        });
}

obtenerProductosHombre();
obtenerProductosMujer();
obtenerProductosJewelery();

export { productos };