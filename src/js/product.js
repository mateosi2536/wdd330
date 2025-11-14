import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const productId = getParam('product');
const dataSource = new ProductData('tents');
const productDetails = new ProductDetails(productId, dataSource);

async function init() {
  const product = await dataSource.findProductById(productId);
  const data = await dataSource.getData();
  
  console.log(productId);
  console.log(product);
  console.log(data);
  
  productDetails.init();
}

init();
