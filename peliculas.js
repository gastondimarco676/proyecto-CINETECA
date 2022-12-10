//variables
const peliculas = []
let carrito = []
const contenedorPeliculas = document.getElementById('contenedor-peliculas')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const vaciarCarrito = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')
const botonCarrito = document.getElementById('boton-carrito')
const Modal = document.getElementById('modal')
const abrirModal = document.getElementById('abrirModal')
const cerrarModal = document.getElementById('cerrarModal')
const comprar = document.getElementById('comprar')


const h1 = document.getElementById('h1')
/*const resumen = document.getElementById(`resumen${id}`)*/

//cargar carrito
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
  }
  actualizarCarrito()
})

//FETCH Crea Cards
fetch("peliculaslista.json")
  .then(response => response.json())
  .then(peliculaslista => {
    peliculaslista.forEach(peli => {
      peliculas.push(peli)
      let peliCard = document.createElement('div');
      let { id, nombre, con, año, img, precio, cantidad } = peli
      peliCard.className = ('card')
      peliCard.innerHTML = `
        <h3>${nombre} </br>(${año})</h3>
        <div id="contenedorCadaPeli">
        <img id="img" src="${img}" ></img>
        <p id="descripcion">${peli.sinopsis}</p>
      </div>
    
      </br>
      <p># ${con}</br>
      Precio: $${precio}</p>
      <br/><button id="agregar${id}" class="boton-agregar">Agregar</button>`

      contenedorPeliculas.append(peliCard);

      //EL boton carrito
      const boton = document.getElementById(`agregar${id}`)
      boton.addEventListener('click', () => {
        agregarAlArrayCarrito(id)
        Swal.fire({
          icon: 'success',
          text: 'Se agregó tu película al carrito!',

        })
      })

    });
  })



//FUNCIONES

//crear elemento nuevo en carrito
const actualizarCarrito = () => {

  contenedorCarrito.innerHTML = ""

  carrito.forEach((peli) => {
    let { id, nombre, con, año, img, precio, cantidad } = peli
    const div = document.createElement('div')
    div.className = ('productoEnCarrito')
    div.innerHTML = `
    <h5 >${nombre}</h5></br>
    <img id="img" src="${img}" class="card-img-top"></img>
  </div>
    <p>Precio: $${precio} </br>Cantidad: <span id="cantidad">${cantidad}</span></p>
    <i class="bi bi-trash"></i>
    <button onclick = 'eliminarDelCarrito(${id})' id="botonEliminar"><i class="fa-solid fa-trash" id="tacho"></i></button>
    `


    contenedorCarrito.append(div)


    localStorage.setItem('carrito', JSON.stringify(carrito))

  })
  contadorCarrito.innerHTML = carrito.length
  precioTotal.innerHTML = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)
}

//vaciar Carrito
vaciarCarrito.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
})

//agregar al Array Carrito

const agregarAlArrayCarrito = (peliId) => {
  const existe = carrito.find(peli => peli.id === peliId)//antes carrito.some
  const item = peliculas.find((peli) => peli.id === peliId)//antes nombre item y peliculas.find
  existe ?
    existe.cantidad++
    :
    carrito.push({ ...item })//item en vez de existe//spreadOperator {...item, cantidad++}una propied mas

  console.log(carrito)
  localStorage.setItem('peli', JSON.stringify(carrito))

  actualizarCarrito()
}

//Eliminar del carrito
const eliminarDelCarrito = (peliId) => {
  const item = carrito.find((peli) => peli.id === peliId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  actualizarCarrito()
}

//Abrir y cerrar modal

function showModal() {
  document.getElementById('modal').style.display = 'block';
}
abrirModal.addEventListener('click', () => {
  showModal()
})

function CloseModal() {
  document.getElementById('modal').style.display = 'none';
}
cerrarModal.addEventListener('click', () => {
  CloseModal()
})


/*resumen.addEventListener('click',=>{
  peliculaslista.filter(peli => peli.id===resumen)
})*/

//BOTON COMPRAR
comprar.addEventListener('click', () => {
  carrito.length > 0 ?
    Swal.fire({
      icon: 'success',
      text: 'Gracias por tu compra!',
      footer: 'Que difrutes del buen cine clásico!'

    })

    : 
      Swal.fire({
        icon: 'error',
        text: 'Aún no has elegido ninguna película',
        footer: 'Agrega una película al carrito antes de comprar'

      })
})
