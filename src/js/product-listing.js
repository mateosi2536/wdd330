import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ExternalServices();
const listElement = document.querySelector('.product-list');
const titleElement = document.querySelector('.products h2');

if (category && titleElement) {
  const categoryName = category.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  titleElement.textContent = `Top Products: ${categoryName}`;
}

const myList = new ProductList(category, dataSource, listElement);
myList.init();

