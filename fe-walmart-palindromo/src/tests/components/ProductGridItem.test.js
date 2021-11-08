import React from 'react';
import '@testing-library/jest-dom'
import { shallow} from 'enzyme'
import ProductGridItem from "../../components/products/ProductGridItem";


describe('Pruebas en <ProductGridItem />', () => {

    const
        id = "2", 
        brand = "dsaasd", 
        description = "zlrwax bñyrh", 
        image = "https://www.lider.cl/catalogo/images/babyIcon.svg", 
        price = "130173", 
        priceWithDiscount = "65086.5", 
        discount = "50"

    const wrapper = shallow( 
    <ProductGridItem 
        id={id} 
        brand={brand} 
        description={description} 
        image={image} 
        price={price} 
        priceWithDiscount={priceWithDiscount}
        discount={discount}
    />);

    test('debe de mostrar <ProductGridItem /> correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
    })

    test('debe de tener un párrafo con la marca', () => {

        const p = wrapper.find('.brand');
        expect( p.text().trim() ).toBe( 'Marca: '+ brand );
    })

    test('debe de tener la imagen igual al url y alt de los props', () => {

        const img = wrapper.find('img');

        expect( img.prop('src') ).toBe( image );
        expect( img.prop('alt') ).toBe( brand );
    })

    test('debe de tener animate__fadeIn', () => {

        const div = wrapper.find('div');
        const className = div.prop('className')

        expect( className.includes('animate__fadeIn') ).toBe( true );
    })
    
})