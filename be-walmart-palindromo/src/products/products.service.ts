import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/Product'
import { CreateProductDto } from './dto/create-products.dto';
import { SearchCriteria, setDiscountToProducts } from './helpers/discount.helper'
import { Criteria } from './interfaces/Criteria';

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async getProducts(): Promise<Product[]>{

        return await this.productModel.find()
    }

    async getProductsBySearch(query: string): Promise<Product[]>{

        let results: Product[] = []
        let filter: any = {}
        const criteria: Criteria = SearchCriteria(query);

        if (criteria.executeSearch) {
            if (criteria.multiple) {
                filter = { $or: [ { brand: { $regex: query } }, { description: { $regex: query } } ]}
            }else {
                filter.id = parseInt(query)
            }

            let products: Product[] = await this.productModel.find(filter)
            results = criteria.hasDiscount ? setDiscountToProducts(products): products
        }
        
        return results
    }

    async getProduct(id: number): Promise<Product>{

        return await this.productModel.findById(id)
    }

    async createProduct(product: CreateProductDto): Promise<Product>{

        const newProduct = new this.productModel(product)
        return await newProduct.save()
    }

    async deleteProduct(id: string): Promise<Product>{

        return await this.productModel.findByIdAndDelete(id)
    }

    async updateProduct(id: string, product: CreateProductDto): Promise<Product>{

        return await this.productModel.findByIdAndUpdate(id, product, {new: true})
    }

}
