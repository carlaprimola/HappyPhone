document.addEventListener('DOMContentLoaded', function () {
  // Obtener los parámetros del producto de la URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Obtener el parámetro "product" y convertirlo de nuevo a un objeto
  const productParam = urlParams.get('product');
  const product = JSON.parse(decodeURIComponent(productParam));

  // Mostrar la información del producto en la página
  const productNameElement = document.getElementById('productName');
  const productImageElement = document.getElementById('productImage');
  const productRamElement = document.getElementById('productRam');
  const productStorageElement = document.getElementById('productStorage');
  const productCameraElement = document.getElementById('productCamera');
  const productDescriptionElement = document.getElementById('productDescription');

  // Verificar si los elementos existen antes de intentar asignar valores
  if (productNameElement && productImageElement && productRamElement && productStorageElement && productCameraElement && productDescriptionElement) {
    productNameElement.textContent = product.model;
    productImageElement.src = product.image;
    productImageElement.alt = product.model;
    productRamElement.textContent = `RAM: ${product.ram}`;
    productStorageElement.textContent = `Almacenamiento: ${product.storage}`;
    productCameraElement.textContent = `Cámara: ${product.camera}`;
    productDescriptionElement.textContent = ` ${product.description}`;
  }
});

  