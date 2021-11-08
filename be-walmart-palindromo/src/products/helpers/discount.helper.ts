import { Criteria } from '../interfaces/Criteria';
import { Product } from '../interfaces/Product';

export const SearchCriteria = (query: string): Criteria => {
  const criteria: Criteria = {
    executeSearch: true,
    multiple: false,
    hasDiscount: true,
  };

  if (isNaN(query as any)) {
    criteria.executeSearch = query.length >= 3;
    criteria.multiple = true;
    criteria.hasDiscount = Palindrome(query);
  }

  return criteria;
};

export const Palindrome = (word: string): boolean => {
  const wordToArray = word.split('');
  const reverseArray = wordToArray.reverse();
  const arrayToWord = reverseArray.join('');

  return word === arrayToWord;
};

export const setDiscountToProducts = (products: Product[]): Product[] => {
  const discount = 50;

  const productsWithDiscount = products.map((product) => {
    product.priceWithDiscount =
      product.price - (product.price * discount) / 100;
    product.discount = discount;
    return product;
  });

  return productsWithDiscount;
};
