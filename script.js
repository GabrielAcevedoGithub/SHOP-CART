
// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Recuperar el carrito del localStorage

// Función para calcular el total del carrito
const calcularTotal = () => {
    return carrito.reduce((total, item) => {
        const precioNumerico = parseFloat(item.precio.replace('$', '').replace(',', '')); // Convertir el precio a número
        return total + precioNumerico;
    }, 0).toFixed(2); // Redondear a 2 decimales
};

// Actualizar la interfaz del carrito
const actualizarCarrito = () => {
    const carritoItems = document.querySelector('.carrito-items');
    const totalElement = document.getElementById('total');
    carritoItems.innerHTML = '';

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p>El carrito está vacío.</p>';
        totalElement.textContent = '0.00';
    } else {
        carrito.forEach((item, index) => {
            const itemHTML = `
                    <div class="carrito-item">
                        <span>${item.nombre} - ${item.precio}</span>
                        <button data-index="${index}" class="btn-eliminar">Eliminar</button>
                    </div>
                `;
            carritoItems.insertAdjacentHTML('beforeend', itemHTML);
        });

        // Actualizar el total
        totalElement.textContent = calcularTotal();
    }

    // Agregar funcionalidad para los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            const productoEliminado = carrito[index].nombre;
            carrito.splice(index, 1); // Eliminar el producto del carrito
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar localStorage
            actualizarCarrito(); // Actualizar la interfaz
            showToast2(`${productoEliminado} se eliminó de carrito`);
        });
    });
};

// Agregar producto al carrito
const agregarAlCarrito = (producto) => {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar en localStorage
    actualizarCarrito(); // Actualizar la interfaz
    showToast(`${producto.nombre} se añadió al carrito`);
};

// Inicializar funcionalidad de botones "Agregar al Carrito"
const botonesCarrito = document.querySelectorAll('.btn-carrito');
botonesCarrito.forEach((boton) => {
    boton.addEventListener('click', (e) => {
        const producto = e.target.parentElement;
        const nombre = producto.querySelector('h3').innerText;
        const precio = producto.querySelector('.precio').innerText;

        agregarAlCarrito({ nombre, precio });
    });
});

// Funcionalidad para vaciar el carrito
const btnVaciar = document.getElementById('vaciar-carrito');
btnVaciar.addEventListener('click', () => {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Vaciar localStorage
    actualizarCarrito(); // Actualizar la interfaz
});

const showToast = (message) => {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

    toastContainer.appendChild(toast);

    // Elimina el toast después de 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
};

const showToast2 = (message) => {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast2';
    toast.innerText = message;

    toastContainer.appendChild(toast);

    // Elimina el toast después de 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
};

// Inicializar el carrito al cargar la página
actualizarCarrito();

