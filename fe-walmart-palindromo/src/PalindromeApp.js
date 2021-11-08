import React, { useState } from 'react'
import ProductGrid from './components/products/ProductGrid'
import AddSearch from './components/products/AddSearch'

function PalindromeApp({ defaultQuery = { query: '', pagination:'/products?page=1&limit=20'} }) {

    const [query, setQuery] = useState(defaultQuery)
    
    return (
        <>
            <h2>Lider Palindromo</h2>
            <hr />
            <AddSearch setQuery={setQuery} /> 
            <ProductGrid query={query} setQuery={setQuery} /> 
            
        </>
    )
}

export default PalindromeApp