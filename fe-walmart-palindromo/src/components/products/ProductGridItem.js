import React from 'react'
import PropTypes from 'prop-types'

function ProductGridItem( { id, brand, description, image, price, priceWithDiscount, discount} ) {

    return (
        <div className="card animate__animated animate__fadeIn">
            <img src={image} alt={brand}/>
            <p>ID {id}</p>
            <p className="brand">Marca: {brand}</p>
            <p>Descripcion: {description}</p>
            <p>Precio original: {price}</p>
            {priceWithDiscount && <p>Precio con descuento: {priceWithDiscount} </p> }
            {discount && <p>Precio con descuento: {discount} </p> }
        </div>
    )
}

export default ProductGridItem

ProductGridItem.propTypes = {
    brand: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}
