import {
  Palindrome,
  SearchCriteria,
  setDiscountToProducts,
} from './discount.helper';

describe('Pruebas discount.helper.spect.ts', () => {
  it('Debe retornar verdadero si es un palindromo', () => {
    const word = 'abba';
    const isPalindrome = Palindrome(word);
    expect(isPalindrome).toBe(true);
  });

  it('Debe retornar falso si no es un palindromo', () => {
    const word = 'abcde';
    const isPalindrome = Palindrome(word);
    expect(isPalindrome).toBe(false);
  });

  it('Debe crear un criterio de busqueda para consultar multiples productos sin descuento', () => {
    const word = 'abcde';

    const searchCriteria = {
      executeSearch: true,
      multiple: true,
      hasDiscount: false,
    };
    const resultSearch = SearchCriteria(word);

    expect(resultSearch).toEqual(searchCriteria);
  });

  it('Debe crear un criterio de busqueda para consultar un unico producto con descuento', () => {
    const word = '123';

    const searchCriteria = {
      executeSearch: true,
      multiple: false,
      hasDiscount: true,
    };
    const resultSearch = SearchCriteria(word);

    expect(resultSearch).toEqual(searchCriteria);
  });

  it('Debe crear un criterio de busqueda para consultar multiples productos con descuento', () => {
    const word = 'abba';

    const searchCriteria = {
      executeSearch: true,
      multiple: true,
      hasDiscount: true,
    };
    const resultSearch = SearchCriteria(word);

    expect(resultSearch).toEqual(searchCriteria);
  });

  it('Debe crear un criterio de busqueda que no permita consultar productos', () => {
    const word = 'ab';

    const searchCriteria = {
      executeSearch: false,
      multiple: true,
      hasDiscount: false,
    };
    const resultSearch = SearchCriteria(word);

    expect(resultSearch).toEqual(searchCriteria);
  });

  it('Debe retornar producto con descuento del 50% en su precio', () => {
    const toDiscount = 50;

    const product: any[] = [
      {
        id: 58,
        brand: 'daad',
        description: 'vangde oswss',
        image: 'www.lider.cl/catalogo/images/furnitureIcon.svg',
        price: 798724,
      },
    ];

    const priceWithDiscount =
      product[0].price - (product[0].price * toDiscount) / 100;
    const productWithDiscount = setDiscountToProducts(product);

    expect(priceWithDiscount).toBe(productWithDiscount[0].price);
  });
});
