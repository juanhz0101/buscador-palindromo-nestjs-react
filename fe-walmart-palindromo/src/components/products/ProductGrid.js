import React from 'react'
import { useFetchProducts } from '../../hooks/useFetchProducts'
import ProductGridItem from './ProductGridItem';
import PropTypes from 'prop-types';


function ProductGrid({ query, setQuery }) {
    
    const { data:products, loading, paginationInfo } = useFetchProducts( query );

    const heandleButtonPreviousPage = (e) => ( setQuery(q => ({ ...q, 'pagination': paginationInfo.previous })) )
    const heandleButtonNextPage = (e) => ( setQuery(q => ({ ...q, 'pagination': paginationInfo.next })) )
    const heandleButtonFirstPage = (e) => ( setQuery(q => ({ ...q, 'pagination': paginationInfo.first })) )
    const heandleButtonLastPage = (e) => ( setQuery(q => ({  ...q, 'pagination': paginationInfo.last })) )

    return (
        <>
            <h3 className="animate__animated animate__fadeIn">{ query.query }</h3>
            { loading && <p className="animate__animated animate__flash">Loading</p>}

            <div className="card-grid">
                {
                    products.map( ( product ) =>  (
                    
                        <ProductGridItem 
                            key={product.id} 
                            { ...product} 
                            />
                    )) 
                }
            </div>

            <div >
                <p>Total registros: {paginationInfo.totalResources}</p>
                <p>Total registros por pagina: {paginationInfo.limit}</p>
                <p>Total paginas: {paginationInfo.totalPages}</p>
                <p>Pagina actual: {paginationInfo.page}</p>
                <br />
                <p>
                    <button disabled={paginationInfo.previous === null} onClick={ heandleButtonPreviousPage }>Previa</button>
                    
                    <button disabled={paginationInfo.next === null} onClick={ heandleButtonNextPage }>Siguiente</button>

                    <button disabled={paginationInfo.first === null} onClick={ heandleButtonFirstPage }>Primera</button>

                    <button disabled={paginationInfo.last === null} onClick={ heandleButtonLastPage }>Ultima</button>
                </p>
            </div>

        </>
        
    )
}

export default ProductGrid

ProductGrid.propTypes = {
    query: PropTypes.object.isRequired,
    setQuery: PropTypes.func.isRequired
}

