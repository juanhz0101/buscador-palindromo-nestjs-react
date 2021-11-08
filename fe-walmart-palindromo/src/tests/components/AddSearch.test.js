import React from 'react';
import '@testing-library/jest-dom';
import { shallow} from 'enzyme';
import AddSearch from "../../components/products/AddSearch";


describe('Pruebas en <AddCategory />', () => {

    const setQuery = jest.fn();
    let wrapper = shallow( <AddSearch setQuery={setQuery} />);

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallow( <AddSearch setQuery={setQuery} />);
    })

    test('debe de mostrar <AddCategory /> correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
    })
    
})