//LOCAL STORAGE
function guardarStorage (clave,valor){
    localStorage.setItem(clave , JSON.stringify(valor));
}

function recuperarStorage(clave){
    return JSON.parse(localStorage.getItem(clave)) || []
}

// funcion generacion de ID
function uuid(){
    const head = Date.now().toString(36);
    console.log(head);
    const tail = Math.random().toString(36).substring(2);
    console.log(tail);
    return head + tail
}
function inicio(){
    // && => si es true/false                              se ejecuta/no se ejecuta
    !localStorage.getItem('usuario') && guardarStorage('usuario', usuario);

}

//CONTENEDOR PRODUCTOS
const contenedorProductos = document.getElementById('contenedorProductos');
contenedorProductos.innerHTML = `
    
<div class="card" style="width: 18rem;">
    <img src="{element.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
</div>
`
//pinto las cards => deboi hacer una funcion mostrarProducto.
function pintar(array) {
    contenedorProductos.innerHTML = ''
    array.forEach(element => {
        contenedorProductos.innerHTML += `
<div class="caja">
        <div class="card " style="width: 18rem;">
    <img src="${element.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title"> ${element.nombre} </h5>
                <p class="card-text">
                Precio : <span>${element.precio}</span>
                <br>
                Categoría : ${element.categoria} 
                <br>
                Stock disponible : ${element.stock}
                </p>
            <a href="#" class="btn btn-primary botonAgregar">Agregar</a>
        </div>
        </div>
</div>
        `
    });
}
pintar(productos);


//CONTENEDOR CARRITO
const btn_agregar = document.querySelectorAll('.botonAgregar')
//en la variable btn_agregar capturo todos los botones del html

for( let boton of btn_agregar){
    boton.addEventListener('click' , agregar_carrito);
}
//Necesito llevar un registro de lo que se va agregando al carrito, por ello creo un arreglo carrito = []
let carrito = []; 
function agregar_carrito(e){ 
    //jerarquias
    let hijo = e.target;
    let padre = e.target.parentNode;
    let abuelo = e.target.parentNode.parentNode;
    //console.log('hijo', hijo);
    //console.log('padre', padre);
    //console.log('abuelo', abuelo);
    //una vez implementadas las jerarquias voy a asigarle variables para poder operar sobre el elemento:

    let nombre_producto = padre.querySelector('h5').textContent;
    //console.log('nombre_producto: ' , nombre_producto);
    
    let precio_producto = padre.querySelector('span').textContent;
    //console.log('precio_producto' , precio_producto);

    let imagen_producto = abuelo.querySelector('img').src;
    //console.log('imagen_producto' , imagen_producto);
    //por cada interaccion tendre distintos valores en nombre , precio e imagen del producto, por lo que debo crear el objeto carrito guardando esos valores.
    let producto_carrito = {
        nom: nombre_producto,
        im: imagen_producto,
        price: precio_producto,
        cant : 1,
    };
    

    //agrego cada objeto seleccionado por el usuario a mi arreglo carrito
    carrito.push(producto_carrito);
    console.log('carrito' , carrito);
    //voy a guardar el carrito en localstorage
    let carrito_JSON = JSON.stringify(carrito);
    console.log('JSON' , carrito_JSON);
    localStorage.setItem('carrito' , carrito_JSON);
    
    mostrar_carrito(producto_carrito);
}

function mostrar_carrito(producto_carrito){
    //creo una fila
    
    let fila = document.createElement('tr');
    fila.innerHTML= `
    <td><img class='imagen' src='${producto_carrito.im}'></td>
    <td>${producto_carrito.nom}</td>
    <td>${producto_carrito.cant}</td>
    <td>${producto_carrito.price}</td>
    <td>TOTAL: ${producto_carrito.price}</td>
    
    <td><button class='btn btn-danger' id='borrar_elemento'>Borrar</button></td>
    
    `
    let table = document.getElementById('tbody');
    table.append(fila);

    let btn_borrar = document.querySelectorAll('#borrar_elemento'); //capturo los botones borrar
    console.log(btn_borrar);
    for( let boton of btn_borrar){
        boton.addEventListener('click' , borrar);
    }
}
function borrar(e){
    hij = e.target; 
    pad = e.target.parentNode;
    abu = e.target.parentNode.parentNode;
    //console.log(abu);
    abu.remove();
    //meter un remove en el local
}

productos.forEach()


