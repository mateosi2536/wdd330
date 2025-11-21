import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems !== null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    document.querySelectorAll('.cart-card__remove').forEach((item) => {
      item.addEventListener('click', (e) => {
        removeItemFromCart(e.target.dataset.id);
      });
    });
    displayTotal(cartItems);
  } else {
    document.querySelector('.product-list').innerHTML = '<li>Your cart is empty</li>';
    displayTotal([]);
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}">X</span>
</li>`;

  return newItem;
}

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.FinalPrice, 0);
}

function displayTotal(items) {
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotalElement = document.querySelector('.cart-total');
  if (items.length > 0) {
    const total = calculateTotal(items);
    cartTotalElement.innerHTML = `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove('hide');
  } else {
    cartFooter.classList.add('hide');
  }
}

function removeItemFromCart(productId) {
  const cartItems = getLocalStorage('so-cart');
  const itemIndex = cartItems.findIndex((item) => item.Id === productId);
  if (itemIndex > -1) {
    cartItems.splice(itemIndex, 1);
    setLocalStorage('so-cart', cartItems);
    renderCartContents();
  }
}

renderCartContents();
