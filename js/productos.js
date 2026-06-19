async function obtenerProductos(mostrarSimbolos, ...categorias) {

    document.getElementById("productos").innerHTML = "";

    for (const categoria of categorias) {
        const respuesta = await fetch('https://dummyjson.com/products/category/' + categoria + '?limit=50');
        const datos = await respuesta.json();

        const productos = datos.products;
        console.log(productos);

        productos.forEach(producto => {
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


            document.getElementById("productos").innerHTML += `
            <div class="card" style="width: 18rem;">
                
                <div class="card-image-container" style="position: relative; overflow: hidden;">
                    <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                    
                    ${simbolosHtml}
                </div>

                <div class="card-body">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text">${producto.description}</p>
                    <p class="card-text"><strong>Precio: $${(producto.price * 4000).toLocaleString('es-CO')} COP</strong></p>
                    <a href="#" class="btn btn-primary">Agregar al carrito</a>
                </div>
            </div>
            `;
        });
    }
}

function obtenerProductosHombre() {
    document.getElementById("Hombre")
        .addEventListener("change", function () {
            obtenerProductos(true, "mens-shirts", "mens-shoes", "mens-watches");
        });
}

function obtenerProductosMujer() {
    document.getElementById("Mujer")
        .addEventListener("change", function () {
            obtenerProductos(true, "womens-dresses", "womens-shoes", "womens-watches", "tops");
        });
}

function obtenerProductosJewelery() {
    document.getElementById("Accesorios")
        .addEventListener("change", function () {
            obtenerProductos(false, "womens-jewellery", "womens-bags", "sunglasses");
        });
}

obtenerProductosHombre();
obtenerProductosMujer();
obtenerProductosJewelery();

obtenerProductos(true, "mens-shirts", "mens-shoes", "mens-watches");

