import React from 'react'
import PropTypes from 'prop-types'

function ProductGridItem( { id, brand, description, image, price, priceWithDiscount, discount} ) {

    const formatPrice = (price) => {
        const numberFormat = new Intl.NumberFormat('es-ES');
        return numberFormat.format( parseFloat(price))
    }

    return (
        <div className="card animate__animated animate__fadeIn">
            <p>Identificador: {id}</p>
            <img src={image} alt={brand}/>
            {discount && <p className="discount">Descuento %{discount} 💥 </p> }
            {priceWithDiscount ? 
                <p> <b>Precio normal</b> <br /><del>${ formatPrice(price) }</del></p> 
                :
                <p> <b>Precio</b> <br /> ${ formatPrice(price) }</p> 
            }
            {priceWithDiscount && <p> <b>Precio x Hoy</b> <br /> ${ formatPrice(priceWithDiscount) } 😱</p> }
            <p className="brand"><b>Marca</b> <br /> {brand}</p>
            <p><b>Descripción</b> <br />{description}</p>
             
        </div>
    )
}

export default ProductGridItem

ProductGridItem.propTypes = {
    brand: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}
