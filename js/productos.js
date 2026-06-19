import { getProductos } from "../services/productService.js";
import { agregarAlCarrito } from "../services/cartService.js";


let productosGlobal = []; 

async function obtenerProductos(mostrarSimbolos, ...categorias) {
    
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";
    productosGlobal = []; 

    for (const categoria of categorias) {
        const respuesta = await fetch('https://dummyjson.com/products/category/' + categoria + '?limit=50');
        const datos = await respuesta.json();

        
        const productosAPI = datos.products; 

        productosAPI.forEach(producto => {
            
            productosGlobal.push(producto);

            let simbolosHtml = "";
            if (mostrarSimbolos) {
                simbolosHtml = `
                    <div class="contenedor-simbolos">
                        <a href="https://imgbb.com/"><img src="https://i.ibb.co/HL1T4Jkw/logos4-removebg-preview.png" alt="logos4" border="0"></a>
                        <a href="https://imgbb.com/"><img src="https://i.ibb.co/ycZcjcwt/logos3-removebg-preview.png" alt="logos3" border="0"></a>
                        <a href="https://imgbb.com/"><img src="https://i.ibb.co/whPkXC3d/logos-removebg-preview.png" alt="logos" border="0"></a>
                    </div>
                `;
            }

            contenedor.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <div class="card-image-container" style="position: relative; overflow: hidden;">
                        <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                        ${simbolosHtml}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">${producto.description}</p>
                        <p class="card-text"><strong>Precio: $${(producto.price * 4000).toLocaleString('es-CO')} COP</strong></p>
                        <button data-id="${producto.id}" class="btn btn-primary agregar-carrito">Agregar al carrito</button>
                    </div>
                </div>
            `;
        });
    }
}

function obtenerProductosHombre() {
    document.getElementById("Hombre").addEventListener("change", function () {
        obtenerProductos(true, "mens-shirts", "mens-shoes", "mens-watches");
    });
}
function obtenerProductosMujer() {
    document.getElementById("Mujer").addEventListener("change", function () {
        obtenerProductos(true, "womens-dresses", "womens-shoes", "womens-watches", "tops");
    });
}
function obtenerProductosJewelery() {
    document.getElementById("Accesorios").addEventListener("change", function () {
        obtenerProductos(false, "womens-jewellery", "womens-bags", "sunglasses");
    });
}

obtenerProductosHombre();
obtenerProductosMujer();
obtenerProductosJewelery();
obtenerProductos(true, "mens-shirts", "mens-shoes", "mens-watches");


document.getElementById("productos").addEventListener("click", function(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        
        const idProducto = Number(e.target.dataset.id);
        
        const productoCompleto = productosGlobal.find(producto => producto.id === idProducto);
        
        if (productoCompleto) {
            agregarAlCarrito(productoCompleto);
            console.log("Producto guardado en localStorage: ", productoCompleto.title);
            
        }
    }
});