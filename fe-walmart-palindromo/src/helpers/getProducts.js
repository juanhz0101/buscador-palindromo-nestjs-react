export const getProducts = async (paginationUrl) => {

    const paginationConfig = getPaginationConfig(paginationUrl)
    const url = `http://localhost:3000/products?${paginationConfig}`;
    const response = await fetch( url ,{
        'mode': 'cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    } );
    const { resources, pagination } = await response.json();
    const products = resources.map(({id, brand, description, image, price }) => {
        return { id, brand, description, image:`https://${image}`, price } 
    })

    const {page, limit} = getPaginationLimits(url)
    pagination.page = page;
    pagination.limit = limit;

    return {
        products,
        paginationInfo: pagination
    }

}

export const getProductsQuery = async ( query, paginationUrl ) => { 
    const paginationConfig = getPaginationConfig(paginationUrl)
    const url = `http://localhost:3000/products/search?query=${ encodeURI( query ) }&${paginationConfig}`;
    const response = await fetch( url ,{
        'mode': 'cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    } );
    const { resources, pagination } = await response.json();
    const products = resources.map(({id, brand, description, image, price, priceWithDiscount, discount  }) => {

        return {id, brand, description, image:`https://${image}`, price, priceWithDiscount, discount }
    })

    const {page, limit} = getPaginationLimits(url)
    pagination.page = page;
    pagination.limit = limit;
    return {
        products,
        paginationInfo: pagination
    }
}

const getPaginationConfig = (url) => {
    return url.split('?')[1]
}

const getPaginationLimits = (url) => {
        
    const isUrl = new URL(url)
    const params = new URLSearchParams(isUrl.search)

    return { page:params.get('page') , limit: params.get('limit')}
}