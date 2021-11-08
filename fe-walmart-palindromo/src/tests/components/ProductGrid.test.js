import React from 'react';
import '@testing-library/jest-dom';
import { shallow} from 'enzyme';
import ProductGrid from "../../components/products/ProductGrid";
import { useFetchProducts } from '../../hooks/useFetchProducts';
jest.mock('../../hooks/useFetchProducts')


describe('Pruebas en <ProductGrid />', () => {

    const query = { query: '', pagination:'/products?page=1&limit=20'};
    const setQuery = jest.fn();

    test('debe de mostrar <ProductGrid /> correctamente', () => {

        
        useFetchProducts.mockReturnValue({
            data: [],
            loading: true,
            paginationInfo:{
                totalResources: 21
            }
        });
        

        const wrapper = shallow( <ProductGrid query={query} setQuery={setQuery} />);
        expect( wrapper ).toMatchSnapshot();
    })

    test('debe de mostrar items cuando se cargan productos useFetchProducts', () => {

        const gifs = [
            {
                id: "2", 
                brand: "dsaasd", 
                description: "zlrwax bñyrh", 
                image: "https://www.lider.cl/catalogo/images/babyIcon.svg", 
                price: "130173", 
                priceWithDiscount: "65086.5", 
                discount: "50"
            },
            {
                id: "532", 
                brand: "dsaasd", 
                description: "zlrwax bñyrh", 
                image: "https://www.lider.cl/catalogo/images/babyIcon.svg", 
                price: "130173", 
                priceWithDiscount: "65086.5", 
                discount: "50"
            }
        ]

        useFetchProducts.mockReturnValue({
            data: gifs,
            loading: false,
            paginationInfo:{
                totalResources: 21
            }
        });
        
        const wrapper = shallow( <ProductGrid query={query} setQuery={setQuery} />);

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('ProductGridItem').length ).toBe( gifs.length )
    })
    

    
})