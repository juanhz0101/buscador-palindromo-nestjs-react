import { Criteria } from '../interfaces/Criteria';
import { Product } from '../interfaces/Product';


export const SearchCriteria = (query: string): Criteria => {

    let criteria: Criteria = {
        executeSearch: true,
        multiple: false,
        hasDiscount: true
    }

    if (isNaN(query as any)) {
        
        criteria.executeSearch = (query.length >= 3)
        criteria.multiple = true
        criteria.hasDiscount = Palindrome(query)      
    }

    return criteria
}

export const Palindrome = (word: string): boolean => {

    let wordToArray = word.split("")
    let reverseArray = wordToArray.reverse()
    let arrayToWord = reverseArray.join("")

    return word === arrayToWord
}

export const setDiscountToProducts = (products: Product[]): Product[]  => {

    const discount = 50;
    
    let productsWithDiscount = products.map(product =>
        {
            product.price = product.price - (( product.price *  discount ) / 100) 
            return product
        })
    
    return productsWithDiscount
}