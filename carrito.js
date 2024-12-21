document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItems = document.querySelector('.carrito-items');
    const totalElement = document.getElementById('total');

    // Función para calcular el total del carrito
    const calcularTotal = () => {
        return carrito.reduce((total, item) => {
            const precioNumerico = parseFloat(item.precio.replace('$', '').replace(',', ''));
            return total + precioNumerico;
        }, 0).toFixed(2);
    };

    // Actualizar la interfaz del carrito
    const actualizarCarrito = () => {
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
                // Mostrar notificación
                showToast2(`${productoEliminado} se eliminó del carrito`);
                
            });
        });
    };

    // Vaciar carrito
    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        localStorage.removeItem('carrito'); // Elimina el carrito del almacenamiento local
        location.reload(); // Recarga la página
    });

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

    // Renderizar el carrito al cargar la página
    actualizarCarrito();
});