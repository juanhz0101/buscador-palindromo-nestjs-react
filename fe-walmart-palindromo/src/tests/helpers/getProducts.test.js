import '@testing-library/jest-dom'

import { getProducts, getProductsQuery } from '../../helpers/getProducts';

describe('Pruebas en getProducts Fetch', () => {

    test('debe de traer 20 productos', async () => {

        const paginationUrl = '/products?page=1&limit=20'
        const data = await getProducts(paginationUrl);
        expect(data.products.length).toBe(20);
    })  
    
    test('debe de traer 0 elementos si envio un producto que no existe', async () => {

        const paginationUrl = '/products/search?page=1&limit=20'
        const data = await getProductsQuery('abcde', paginationUrl);
        expect(data.products.length).toBe(0); 
    })  

    test('debe de traer 1 elementos si envio un ID de producto', async () => {

        const paginationUrl = '/products/search?page=1&limit=20'
        const data = await getProductsQuery('123' ,paginationUrl);
        expect(data.products.length).toBe(1); 
    })  

    test('debe de traer mas 1 elemento si envio un palindromo', async () => {

        const paginationUrl = '/products/search?page=1&limit=20'
        const data = await getProductsQuery('dassad' ,paginationUrl);
        expect(data.products.length > 1).toBe( true ); 
    })
})