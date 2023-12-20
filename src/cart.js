let allProducts = [];
const cart = [];

document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'http://localhost:3000/data';
  const catalogContainer = document.getElementById('catalog');
  const paginationContainer = document.getElementById('pagination');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const cartIcon = document.getElementById('cartIcon');
  const cartListContainer = document.getElementById('cartList');
  const checkoutButton = document.getElementById('checkoutButton');
  const openCartButton = document.getElementById('openCartButton');
  const cartContainer = document.getElementById('cart');
  const productsPerPage = 6;
  let currentPageIndex = 0;


  // Manejar el clic en el enlace
  document.getElementById('checkoutLink').addEventListener('click', function (event) {
    // Prevenir la acción predeterminada del enlace (evitar que la página se cargue)
    event.preventDefault();

    // Obtener la lista de productos del carrito
    const cartItems = cart.map(product => ({ model: product.model, price: product.price }));

    // Calcular el total del carrito
    const total = cart.reduce((sum, product) => sum + product.price, 0);

    // Almacenar la lista de productos y el total en el localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total);

    // Redirigir a la nueva página con los datos del carrito
    window.location.href = 'checkout.html';
  });

  function updateItemCount() {
    const itemCount = cart.length;
    const itemCountElement = document.getElementById("cartItemCount");
    itemCountElement.textContent = itemCount > 0 ? itemCount : '';
  }

  function updateCartIcon() {
    updateItemCount();
  }

  const menuBtn = document.querySelector(".menu-btn");
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
  });

  function addToCart(product, quantity) {
    // Verifica si la cantidad es válida
    if (quantity <= 0) {
      alert('La cantidad debe ser mayor que cero.');
      return;
    }

    // Agrega el producto con la cantidad especificada al carrito
    for (let i = 0; i < quantity; i++) {
      cart.push(product);
    }

    updateCartIcon();
    showCartList();
  }

  

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartIcon();
    showCartList();
  }

  function navigatePage(pages, newIndex) {
    if (newIndex >= 0 && newIndex < pages.length) {
      currentPageIndex = newIndex;
      displayPage(pages, currentPageIndex);
    }
  }

  function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  function displayPage(pages, pageIndex) {
    const currentPage = pages[pageIndex];
    catalogContainer.innerHTML = '';

    currentPage.forEach(product => {
      const productElement = createProductElement(product);
      catalogContainer.appendChild(productElement);
    });

    createPaginationButtons(pages);
  }

  function createPaginationButtons(pages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Anterior';
    prevBtn.addEventListener('click', () => navigatePage(pages, currentPageIndex - 1));
    paginationContainer.appendChild(prevBtn);

    pages.forEach((_, index) => {
      const button = document.createElement('button');
      button.textContent = index + 1;
      button.addEventListener('click', () => navigatePage(pages, index));
      paginationContainer.appendChild(button);
    });

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Siguiente';
    nextBtn.addEventListener('click', () => navigatePage(pages, currentPageIndex + 1));
    paginationContainer.appendChild(nextBtn);

    updatePaginationButtons();
  }

  function updateCheckoutPage() {
    const checkoutProductsList = document.getElementById('checkoutProductsList');
    const checkoutTotal = document.getElementById('checkoutTotal');

    checkoutProductsList.innerHTML = '';

    let total = 0;

    cart.forEach(product => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${product.model} - ${product.price}
      `;
      total += product.price;

      checkoutProductsList.appendChild(listItem);
    });

    checkoutTotal.textContent = total;
  }

  function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.model}">
      <h2>${product.model}</h2>
      <p>${product.price}</p>
      <div>
        <input type="number" class="quantityInput" value="1" min="1">
        <button class="btn btn-primary addToCartBtn" data-product="${JSON.stringify(product)}">Add to Cart</button>
      </div>
    `;

    const addToCartBtn = productElement.querySelector('.addToCartBtn');
    addToCartBtn.addEventListener('click', () => {
      const quantityInput = productElement.querySelector('.quantityInput');
      const quantity = parseInt(quantityInput.value, 10);
      addToCart(product, quantity);
    });

    return productElement;
  }

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter(product => product.model.toLowerCase().includes(searchTerm));
    const pages = chunkArray(filteredProducts, productsPerPage);
    currentPageIndex = 0;
    displayPage(pages, currentPageIndex);
  }

  function updatePaginationButtons() {
    const buttons = paginationContainer.querySelectorAll('button');

    buttons.forEach((button, index) => {
      if (index === currentPageIndex + 1) {
        button.classList.add('current');
      } else {
        button.classList.remove('current');
      }
    });
  }

  function updateCartBox() {
    const cartBox = document.querySelector('.cart-box');
    cartBox.innerHTML = '';

    let total = 0;

    cart.forEach(product => {
      const cartProduct = document.createElement('div');
      cartProduct.innerHTML = `
        <p>${product.model} - ${product.price}</p>
        <button class="removeFromCartBtn">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;
      // eliminar elementos del carrito
      const removeButton = cartProduct.querySelector('.removeFromCartBtn');
      removeButton.addEventListener('click', () => removeFromCart(cart.indexOf(product)));

      cartBox.appendChild(cartProduct);
      total += product.price;
    });
    //
    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<h3>Total: ${total}</h3>`;
    cartBox.appendChild(totalElement);

    const cartListContainer = document.getElementById('cartList');
    if (cart.length > 0) {
      cartListContainer.style.display = 'block';
    } else {
      cartListContainer.style.display = 'none';
    }
  }

  openCartButton.addEventListener('click', function () {
    // Alternar la visibilidad del contenedor al hacer clic en el botón
    if (cartContainer.style.display === 'block') {
      cartContainer.style.display = 'none';
      // cartVisible = false; // Si usas cartVisible, asegúrate de definirlo en algún lugar del código
    } else {
      // Mostrar el contenedor y, opcionalmente, actualizar su contenido
      cartContainer.style.display = 'block';
      updateCartBox(); // Puedes llamar a la función que actualiza el contenido del carrito aquí
    }
  });
  function showCartList() {
    const cartListItemsContainer = document.getElementById('cartListItems');
    cartListItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${product.model} - ${product.price}
            <button class="removeFromCartBtn" data-index="${index}">Remove</button>
        `;

        total += product.price;

        const removeButton = listItem.querySelector('.removeFromCartBtn');
        removeButton.addEventListener('click', () => removeFromCart(index));

        cartListItemsContainer.appendChild(listItem);
    });

    const totalElement = document.createElement('li');
    totalElement.innerHTML = `<p>Total: ${total}</p>`;
    cartListItemsContainer.appendChild(totalElement);

    const cartListContainer = document.getElementById('cartList');
    cartListContainer.style.display = 'block';
}


  // Agrega un evento clic al botón de cerrar con icono
  const closeCartButton = document.getElementById('closeCartButton');
  closeCartButton.addEventListener('click', cerrarCarrito);

  // Función para cerrar el contenedor del carrito
  function cerrarCarrito() {
    var cartContainer = document.getElementById('cart');
    cartContainer.style.display = 'none';
  }

  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      allProducts = data;
      const pages = chunkArray(data, productsPerPage);
      displayPage(pages, currentPageIndex);

      searchButton.addEventListener('click', performSearch);
      cartIcon.addEventListener('click', showCartList);
    })
    .catch(error => console.error('Error fetching or processing data:', error));
});




