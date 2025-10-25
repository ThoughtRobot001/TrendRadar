import mockProducts from '../data/mockProducts';
import { fetchProductFromFirestore, fetchProductsFromFirestore } from './firebase';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const enrichProduct = (product) => ({
  ...product,
  price_range: product.price_range ?? `$${product.price.min.toFixed(2)} - $${product.price.max.toFixed(2)}`
});

export const fetchProducts = async () => {
  await delay(300);
  const firestoreProducts = await fetchProductsFromFirestore();
  const data = firestoreProducts.length ? firestoreProducts : mockProducts;
  return data.map(enrichProduct);
};

export const fetchProductById = async (id) => {
  await delay(200);
  const firestoreProduct = await fetchProductFromFirestore(id);
  const data = firestoreProduct ?? mockProducts.find((product) => product.id === id);
  return data ? enrichProduct(data) : null;
};

export const fetchTrendingKeywords = async () => {
  await delay(200);
  const sorted = [...mockProducts]
    .sort((a, b) => b.trend_growth - a.trend_growth)
    .slice(0, 5)
    .map((product) => ({
      keyword: product.keyword,
      growth: product.trend_growth
    }));
  return sorted;
};
