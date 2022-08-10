const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const precioTotal = document.getElementById('precioTotal')

botonVaciar.addEventListener('click' , () =>{
    carrito.length = 0
    actualizarCarrito()
})
let carrito = [];

document.addEventListener('DOMContentLoaded', ()=> {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


stockProductos.forEach((element) => {
    const div = document.createElement('div');
    div.classList.add('producto')
    div.innerHTML = `
    <img src= ${element.img} alt=''>
    <h3>${element.nombre}</h3>
    <p class='precioProducto'>$${element.precio}</p>
    <p>Categoría : ${element.categoria}</p>
    <button id='agregar${element.id}' class='boton-agregar'>Agregar <i class='fas fa-shopping-cart'></i></button>
    `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${element.id}`)

    boton.addEventListener('click' , () => {
        agregarAlCarrito(element.id)
    })
});

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)

    if(existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
           
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId);
        carrito.push(item);
        console.log(carrito); 

    }
    actualizarCarrito();
    Toastify({

        text: "Agregado al carrito correctamente",
        
        duration: 2000
        
        }).showToast();
}
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item);
    carrito.splice(indice,1)
    actualizarCarrito()
}
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ''
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML =  `
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio}</p>
        <p>Cantidad: <span id='cantidad'>${prod.cantidad} </span></p>
        <button onclick = 'eliminarDelCarrito(${prod.id})' class='boton-eliminar fas fa-trash-alt'></button>
        `
    contenedorCarrito.appendChild(div)
    localStorage.setItem('carrito' , JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length ;
    precioTotal.innerText = carrito.reduce((acc , prod) => acc + prod.precio, 0)
}











