import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProductsModule,
        MongooseModule.forRoot(
          'mongodb://productListUser:productListPassword@localhost:27017/promotions?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
        ),
        MongooseModule.forFeature([
          {
            name: 'Product',
            schema: ProductSchema,
          },
        ]),
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller.getProducts()).toBeDefined();
  });
});
