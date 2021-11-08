import {
  PaginationBodyInterceptor,
  MongoPaginationParamDecorator,
  MongoPagination,
} from '@algoan/nestjs-pagination';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { Product } from './interfaces/Product';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UseInterceptors(
    new PaginationBodyInterceptor({ pageName: 'page', perPageName: 'limit' }),
  )
  @Get()
  async getProducts(
    @MongoPaginationParamDecorator({
      pageName: 'page',
      perPageName: 'limit',
    })
    pagination: MongoPagination,
  ): Promise<{ totalResources: number; resources: Product[] }> {
    const { count, data } = await this.productService.getProducts(pagination);

    return {
      totalResources: count,
      resources: data,
    };
  }

  @UseInterceptors(
    new PaginationBodyInterceptor({ pageName: 'page', perPageName: 'limit' }),
  )
  @Get('/search')
  async getProductsBySearch(
    @Query('query') query: string,
    @MongoPaginationParamDecorator({
      pageName: 'page',
      perPageName: 'limit',
    })
    pagination: MongoPagination,
  ): Promise<{ totalResources: number; resources: Product[] }> {
    const { count, data } = await this.productService.getProductsBySearch(
      query,
      pagination,
    );

    return {
      totalResources: count,
      resources: data,
    };
  }
}
