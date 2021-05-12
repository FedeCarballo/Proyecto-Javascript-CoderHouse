let productos = []
let carrito = []

let Categorias = [
    {   
        nombre:"Todo",
        img: "images/categorias/todo1.jpg"    
},
    {   
        nombre:"Pizzas",
        img: "images/categorias/pizzas1.jpg"
},
    {
        nombre:"Minutas",
        img:"images/categorias/milanesas1.jpg"
    },
    {
        nombre:"Picadas",
        img:"images/categorias/picadas1.jpg"
    }
]
const productosEnHTML = document.getElementById("pagecontent")
const carritoEnHTML = document.getElementById("carritoHTML")
const CategoriasenHTML = document.getElementById("categoria")

let URLJSON = "/products.json"
    $.getJSON(URLJSON, function (respuesta,estado) { 
        if(estado === "success"){
            let Producto = respuesta;
            for(const producto of Producto ){
                productos.push(producto);
                function renderProductos () {
        productos.forEach(producto => {
            let nuevoNodo = document.createElement('div');
            nuevoNodo.innerHTML = `
                <div class="product-container" category="${producto.category}">
                <img class="img" src="${producto.img}">
                <h3 class="titulo">${producto.title}</h3>
                <h4 class="precio">$${producto.precio}</h4>
                <button class="boton" onclick="addToCart(${productos.indexOf(producto)})" class="boton">Agregar</button>
                </div>
            `
            productosEnHTML.appendChild(nuevoNodo);
                        });
                    }
                }
    renderProductos()
            }
        });

function Rendercategorias (){
    Categorias.forEach(cat => {
        let nuevaCategoria = document.createElement('div');
        nuevaCategoria.innerHTML = `
            <div class="categorias">
                <h2 >${cat.nombre}</h2>
                <img src=${cat.img} category="${cat.nombre}">
            </div>
        `
        CategoriasenHTML.appendChild(nuevaCategoria);

    })
} 
Rendercategorias();


$('#tituloCATEGORIA').click( () => {
     $('#categoria').toggle('slow');
});


$('#categoria img').click(function(){
    var catProduct = $(this).attr('category');
    console.log(catProduct);

    $(".product-container").css('transform','scale(0,1)')
    function ocultandoProductos(){
    $(".product-container").hide();}
    setTimeout(ocultandoProductos,400);
    function mostrandoProductos(){
        $('.product-container[category="'+catProduct+'"]').show();
        $('.product-container[category="'+catProduct+'"]').css('transform','scale(1)')
        }
    setTimeout(mostrandoProductos,400);  
    })
    $('#categoria img[category="Todo"]').click(function(){
    function mostrarTODO(){
    $('.product-container').css('transform','scale(1)')
    $('.product-container').show()}
    setTimeout(mostrarTODO,400)
        }
    );
function addToCart(index) {
    const producto = productos[index];
    if (carrito.length > 0) {
        var noExiste = true;
        for (var i = 0; i < carrito.length; i++) {
            if (producto.title === carrito[i].title) {
                carrito[i].cantidad++;
                noExiste = false;
            }
        }
        if (noExiste) {
            producto.cantidad =   1;
            carrito.push(producto);
        }
    }
    else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    swal("Producto agregado a su carrito de compras",
    )        
    sumarPrecios()
    renderCarrito();   
}
function productoEnCarrito (nombre,precio,cantidad,id) {
                    this.nombre = nombre;
                    this.precio = precio;
                    this.cantidad = cantidad; 
                    this.id = id;
                }
function renderCarrito () {
    let storageCarrito = [];
    carritoEnHTML.innerHTML = ''
    if (carrito.length > 0){
        carrito.forEach(prod => {
            let Nuevoelemento = document.createElement('tbody') 
            Nuevoelemento.innerHTML += `
            <thead >
                    <td>${prod.title}</td>
                    <td >${prod.cantidad}</td>
                    <td>$${prod.precio}</td>
                ` 
                carritoEnHTML.appendChild(Nuevoelemento);
                if (localStorage.getItem(productoEnCarrito) ===null){
                    storageCarrito.push(new productoEnCarrito (prod.title,prod.precio,prod.cantidad,prod.id));
                    let jsonstorageCarrito = JSON.stringify(storageCarrito);
                    localStorage.setItem("items comprados",jsonstorageCarrito);
                }         
             });              

            
    } 
}
 sumarPrecios()
function sumarPrecios(){
    let total = 0;
    const precioHTML = document.getElementById("totalPrecio");
    carrito.forEach(prod => {
        const precio = Number(prod.precio);
        const cantidad = Number(prod.cantidad);
        return total = total + precio * cantidad
    })
precioHTML.innerHTML = `<button class="btn btn-primary button-checkout">Pagar $${total.toFixed(2)}</button>`
    $(".btn-primary").click(function() {
        swal({
            title: "Su pedido se ha registrado exitosamente",
            icon:"success",
        })        
        carrito = [];        
        sumarPrecios()
        renderCarrito() 
})      
    const miBoton = document.createElement('button');
    miBoton.classList.add('btn', 'btn-danger', 'mx-5');
    miBoton.textContent = 'Vaciar carrito';
    precioHTML.appendChild(miBoton);
    miBoton.addEventListener('click',VaciarCarrito)

        function VaciarCarrito() {
            swal({
                title: "Seguro que desea vaciar el carrito?",
                text: "Una vez confirmado no puede deshacerse",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => { 
                if (willDelete) {
                swal("tu carrito se encuentra vacio",  {
                    icon: "success",
                }
                
                )
                carrito = [];        
                sumarPrecios()
                renderCarrito() 
                ;
                
                } else {
                swal("Su carrito se encuentra protegido, continue comprando");
                }
            });
        }
}
