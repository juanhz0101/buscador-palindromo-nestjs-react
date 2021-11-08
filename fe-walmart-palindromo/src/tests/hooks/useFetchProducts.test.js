import '@testing-library/jest-dom';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { renderHook } from '@testing-library/react-hooks'


describe('Pruebas en el hook useFetchProducts', () => {

    test('debe de retornar el estado inicial', async () => {

        const paginationUrl = '/products?page=1&limit=20'

        const { result, waitForNextUpdate } = renderHook( () => useFetchProducts('', paginationUrl))
        const { data, loading } = result.current;
        await waitForNextUpdate()
        expect(data).toEqual([])
        expect( loading ).toBe(true)
    })
 
    test('debe de retorna un arreglo de productos y loading en false', async () => {
        
        const paginationUrl = '/products?page=1&limit=20'
        const { result, waitForNextUpdate } = renderHook( () => useFetchProducts('', paginationUrl))
        await waitForNextUpdate()
        const { data, loading } = result.current;
        expect(data.length).toEqual(20)
        expect( loading ).toBe(false)
    })
    

})