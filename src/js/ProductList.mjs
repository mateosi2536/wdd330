import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData(this.category);
    this.renderList(products);
  }

  renderList(products) {
    renderListWithTemplate(
      this.productCardTemplate,
      this.listElement,
      products,
      'beforeend',
      true
    );
  }

  productCardTemplate(product) {
    const hasDiscount = product.SuggestedRetailPrice && product.FinalPrice < product.SuggestedRetailPrice;
    const discountPercent = hasDiscount
      ? Math.round((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice * 100)
      : 0;

    return `
            <li class="product-card">
              <a href="/product_pages/?product=${product.Id}">
                ${hasDiscount ? `<span class="product-card__discount-badge">-${discountPercent}%</span>` : ''}
                <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                ${hasDiscount ? `
                  <p class="product-card__price">
                    <del>$${product.SuggestedRetailPrice}</del>
                    <strong>$${product.FinalPrice}</strong>
                  </p>
                ` : `
                  <p class="product-card__price">$${product.FinalPrice}</p>
                `}
              </a>
            </li>
        `;
  }
}