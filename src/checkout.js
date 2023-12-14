document.addEventListener('DOMContentLoaded', function () {
  // Mostrar la lista de productos y el total en la página
  updateCheckoutPage();
});

function updateCheckoutPage() {
  const checkoutProductsList = document.getElementById('checkoutProductsList');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const removeSelectedButton = document.getElementById('removeSelectedButton');

  // Obtener la lista de productos y el total del carrito desde el localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartTotal = Number(localStorage.getItem('cartTotal')) || 0;

  checkoutProductsList.innerHTML = '';

  cartItems.forEach((product, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" class="product-checkbox" data-index="${index}"> 
      ${product.model} - ${product.price.toFixed(2)}€
    `;
    checkoutProductsList.appendChild(listItem);
  });

  checkoutTotal.textContent = cartTotal.toFixed(2) + '€';

  // Manejar clic en el botón para eliminar artículos seleccionados
  removeSelectedButton.addEventListener('click', function () {
    // Obtener todos los checkboxes seleccionados
    const selectedCheckboxes = document.querySelectorAll('.product-checkbox:checked');

    // Crear una lista de índices de artículos a eliminar
    const indicesToRemove = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.dataset.index));

    // Eliminar los artículos seleccionados del carrito
    indicesToRemove.sort((a, b) => b - a).forEach(index => cartItems.splice(index, 1));

    // Actualizar el localStorage con los cambios
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', calculateTotal(cartItems));

    // Actualizar la lista y el total en la página
    updateCheckoutPage();
  });
}

// Función para calcular el total del carrito
function calculateTotal(cartItems) {
  return cartItems.reduce((sum, model) => sum + model.price, 0);
}
