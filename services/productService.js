export const getProductos = async (categoria) => {
    const respuesta = await fetch('https://dummyjson.com/products/category/' + categoria + '?limit=50');
    const datos = await respuesta.json();

    const productos = datos.products;

    return productos
}