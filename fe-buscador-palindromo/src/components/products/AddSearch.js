import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function AddSearch({ setQuery }) {

    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        setInputValue(inputValue);
        if (inputValue === ' ') {
            setInputValue('');
        }else{
            setQuery(q => ({ ...q, 'query': inputValue }))
        }
       
    }, [inputValue, setQuery]);

    return (
        
        <form>
            <input
                type="text" 
                value={inputValue}
                onChange={ (e) => setInputValue(e.target.value) }
                placeholder="Por favor ingrese un Nombre o ID de producto"
            />
        </form>
    )
}


AddSearch.propTypes = {
    setQuery: PropTypes.func.isRequired
}

export default AddSearch
