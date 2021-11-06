import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { Product } from './interfaces/Product';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get('/search/:query')
  getProductsBySearch(@Param('query') query: string): Promise<Product[]> {
    return this.productService.getProductsBySearch(query);
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
