document.addEventListener('DOMContentLoaded', function () {
  // Llamar a la función para actualizar la página de checkout
  updateCheckoutPage();
});
// Función para calcular el total del carrito
function calculateTotal(cartItems) {
  return cartItems.reduce((sum, product) => sum + product.price, 0);
}


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
          ${product.model} - ${product.price}€  
          <input type="checkbox" class="product-checkbox" data-index="${index}">
          <button class="remove-product-button" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
      `;
      checkoutProductsList.appendChild(listItem);
  });

  checkoutTotal.textContent = cartTotal+ '€ ';

  // Manejar clic en el botón para eliminar productos seleccionados
  removeSelectedButton.addEventListener('click', function () {
      // Obtener todos los checkboxes seleccionados
      const selectedCheckboxes = document.querySelectorAll('.product-checkbox:checked');

      // Crear una lista de índices de productos a eliminar
      const indicesToRemove = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.dataset.index));

      // Eliminar los productos seleccionados del carrito
      indicesToRemove.sort((a, b) => b - a).forEach(index => cartItems.splice(index, 1));

      // Actualizar el localStorage con los cambios
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('cartTotal', calculateTotal(cartItems));

      // Actualizar la lista y el total en la página
      updateCheckoutPage();
  });

  // Manejar clic en el botón para eliminar un producto específico
  const removeProductButtons = document.querySelectorAll('.remove-product-button');
  removeProductButtons.forEach(button => {
      button.addEventListener('click', function () {
          const indexToRemove = parseInt(button.dataset.index);
          cartItems.splice(indexToRemove, 1);

          // Actualizar el localStorage con los cambios
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          localStorage.setItem('cartTotal', calculateTotal(cartItems));

          // Actualizar la lista y el total en la página
          updateCheckoutPage();
      });
  });
}



