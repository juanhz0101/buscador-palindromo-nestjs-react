import { useEffect, useState } from "react"
import { getProducts, getProductsQuery } from '../helpers/getProducts';

export  const useFetchProducts = ({query = '', pagination = '/products?page=1&limit=20'} ) => {

    const [state, setState] = useState({
        data: [],
        loading: true,
        paginationInfo: {}
    });

    useEffect( () => {

        if (query === '') {
            getProducts(pagination)
            .then( ({ products, paginationInfo }) => {
                setState({
                    data: products,
                    loading: false,
                    paginationInfo
                })
            })
        }else{
            getProductsQuery(query, pagination)
            .then( ({ products, paginationInfo }) => {
                setState({
                    data: products,
                    loading: false,
                    paginationInfo
                })
            })
        }

    }, [ query, pagination])

    return state

}