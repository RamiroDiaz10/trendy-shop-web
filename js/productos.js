async function obtenerProductos(...categorias) {
    
    document.getElementById("productos").innerHTML = "";

    for (const categoria of categorias) {
        const respuesta = await fetch('https://dummyjson.com/products/category/' + categoria + '?limit=50');
        const datos = await respuesta.json();
        
        const productos = datos.products;
        console.log(productos);
        
        productos.forEach(producto => {
            document.getElementById("productos").innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                <div class="card-body">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text">${producto.description}</p>
                    <a href="#" class="btn btn-primary">Agregar al carrito</a>
                </div>
            </div>
            `;
        });
    }
}

function obtenerProductosHombre ()
 {
    document.getElementById("Hombre")
        .addEventListener("click", function () {
            obtenerProductos("mens-shirts", "mens-shoes", "mens-watches");
        });
}

function obtenerProductosMujer ()
 {
    document.getElementById("Mujer")
        .addEventListener("click", function () {
            obtenerProductos("womens-dresses", "tops", "womens-shoes", "womens-watches");
        });
}

function obtenerProductosJewelery ()
 {
    document.getElementById("Accesorios")
        .addEventListener("click", function () {
            obtenerProductos("womens-jewellery", "womens-bags", "sunglasses");
        });
}   

obtenerProductosHombre();
obtenerProductosMujer();
obtenerProductosJewelery();

