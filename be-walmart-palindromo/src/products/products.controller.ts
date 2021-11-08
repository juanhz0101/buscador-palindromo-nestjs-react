import {
  PaginationBodyInterceptor,
  MongoPaginationParamDecorator,
  MongoPagination,
} from '@algoan/nestjs-pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
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

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.getProduct(parseInt(id));
  }

  @Post()
  createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Body() product: CreateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }
}
