import { setLocalStorage } from './utils.mjs';

// src/js/ProductDetails.mjs
export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductPage();

        document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
    }

    addProductToCart(product) {
        let storedCart = localStorage.getItem('so-cart');
        let cart = [];

        if (storedCart) {
            try {
                const parsed = JSON.parse(storedCart);

                cart = Array.isArray(parsed) ? parsed : [parsed];
            } catch (e) {
                console.error('Error parsing so-cart, restarting cart', e);
                cart = [];
            }
        }

        cart.push(product);

        setLocalStorage('so-cart', cart);
    }

    addToCart() {
        let cart = JSON.parse(localStorage.getItem('so-cart') || '[]');
        if (!Array.isArray(cart)) cart = [cart];
        cart.push(this.product);
        setLocalStorage('so-cart', cart);
    }

    renderProductPage() {
        const p = this.product;
        const hasDiscount = p.ListPrice && p.ListPrice > p.FinalPrice;
        const discount = hasDiscount
            ? Math.round((p.ListPrice - p.FinalPrice) / p.ListPrice * 100)
            : 0;

        const imageSrc = p.Image || '/images/no-image.jpg';

        // SOLO RENDERIZA EL CONTENIDO DEL PRODUCTO
        const container = document.getElementById('product-container');
        container.innerHTML = `
    <section class="product-detail">
      <h3>${p.Brand.Name}</h3>
      <h2 class="divider">${p.Name}</h2>
      <img class="divider" src="${imageSrc}" alt="${p.Name}" />

      ${hasDiscount ? `
        <p class="product-card__price">
          <del>$${p.ListPrice}</del>
          <strong>$${p.FinalPrice}</strong>
          <sup class="product-card__discount">-${discount}%</sup>
        </p>
      ` : `
        <p class="product-card__price">$${p.FinalPrice}</p>
      `}

      <p class="product__color">${p.Colors[0]?.ColorName || 'N/A'}</p>
      <p class="product__description">${p.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${p.Id}">Add to Cart</button>
      </div>
    </section>
  `;
    }
}