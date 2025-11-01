import { setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  let storedCart = localStorage.getItem('so-cart');
  let cart = [];

  if (storedCart) {
    try {
      const parsed = JSON.parse(storedCart);

      cart = Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      console.error('Error parseando so-cart, reiniciando carrito', e);
      cart = [];
    }
  }

  // Agregar el producto nuevo
  cart.push(product);

  setLocalStorage('so-cart', cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
