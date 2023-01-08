import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import PalindromeApp from "../PalindromeApp";

describe('Pruebas en <PalindromeApp />', () => {

    test('debe de mostrar <PalindromeApp /> correctamente', () => {
        
        const wrapper = shallow( <PalindromeApp />);
        expect( wrapper ).toMatchSnapshot();
    })

    test('debe mostrar una lista de productos', () => {
        
        const defaultQuery = { query: '', pagination:'/products?page=1&limit=20'};
        const wrapper = shallow( <PalindromeApp defaultQuery={defaultQuery} />)
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('ProductGrid').length ).toBe( 1 )

    })

})