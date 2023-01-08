import { MongoPagination } from '@algoan/nestjs-pagination';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/Product';
import {
  SearchCriteria,
  setDiscountToProducts,
} from './helpers/discount.helper';
import { Criteria } from './interfaces/Criteria';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(
    pagination: MongoPagination,
  ): Promise<{ count: number; data: Product[] }> {
    const data: Product[] = await this.productModel
      .find(pagination.filter)
      .skip(pagination.skip)
      .limit(pagination.limit);
    const count: number = await this.productModel.count(pagination.filter);

    return {
      count,
      data,
    };
  }

  async getProductsBySearch(
    query: string,
    pagination: MongoPagination,
  ): Promise<{ count: number; data: Product[] }> {
    let sanitizeQuery = query.toLowerCase().trim()
    let results: Product[] = [];
    let filter: any = {};
    let count: number;
    const criteria: Criteria = SearchCriteria(sanitizeQuery);

    if (criteria.executeSearch) {
      if (criteria.multiple) {
        filter = {
          $or: [
            { brand: { $regex: sanitizeQuery } },
            { description: { $regex: sanitizeQuery } },
          ],
        };
      } else {
        filter.id = parseInt(sanitizeQuery);
      }
      const products: Product[] = await this.productModel
        .find(filter)
        .skip(pagination.skip)
        .limit(pagination.limit);

      count = await this.productModel.count(filter);

      results = criteria.hasDiscount
        ? setDiscountToProducts(products)
        : products;
    }
    return { count, data: results };
  }
}
