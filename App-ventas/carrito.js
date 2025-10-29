function agregarAlCarrito(nombre, precio) {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var encontrado = false;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre == nombre) {
      carrito[i].cantidad += 1;
      encontrado = true;
    }
  }
  if (!encontrado) {
    carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));

  var mensaje = document.getElementById("mensaje");
  mensaje.innerHTML = nombre + " agregado al carrito ✅";
  mensaje.style.display = "block";

  setTimeout(function() {
    mensaje.style.display = "none";
  }, 2000);
}


function renderCarrito() {
  var carritoDiv = document.getElementById("carrito");
  var totalP = document.getElementById("total");
  if (!carritoDiv) return;
  carritoDiv.innerHTML = "";
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length == 0) {
    carritoDiv.innerHTML = "<p>El carrito esta vacio</p>";
    totalP.innerHTML = "";
    return;
  }
  var tabla = "<table border='1'><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Total</th><th>Eliminar</th></tr>";
  var total = 0;
  for (var i=0; i<carrito.length; i++) {
    var sub = carrito[i].precio * carrito[i].cantidad;
    total += sub;
    tabla += "<tr>";
    tabla += "<td>"+carrito[i].nombre+"</td>";
    tabla += "<td>$"+carrito[i].precio+"</td>";
    tabla += "<td>"+carrito[i].cantidad+"</td>";
    tabla += "<td>$"+sub+"</td>";
    tabla += "<td><button onclick='eliminarProducto(\""+carrito[i].nombre+"\")'>Eliminar</button></td>";
    tabla += "</tr>";
  }
  tabla += "</table>";
  carritoDiv.innerHTML = tabla;
  totalP.innerHTML = "Total: $" + total;
}

function eliminarProducto(nombre) {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var nuevo = [];
  for (var i=0;i<carrito.length;i++) {
    if (carrito[i].nombre != nombre) {
      nuevo.push(carrito[i]);
    }
  }
  localStorage.setItem("carrito", JSON.stringify(nuevo));
  renderCarrito();
}

function vaciarCarrito() {
  var modal = document.getElementById("modal");
  var si = document.getElementById("modal-si");
  var no = document.getElementById("modal-no");

  modal.style.display = "flex";

  si.onclick = function() {
    localStorage.setItem("carrito", "[]");
    renderCarrito();
    modal.style.display = "none";
  }

  no.onclick = function() {
    modal.style.display = "none";
  }
}


window.onload = function() {
  var vaciarBtn = document.getElementById("vaciar");
  if(vaciarBtn) vaciarBtn.onclick = vaciarCarrito;
  renderCarrito();
}
