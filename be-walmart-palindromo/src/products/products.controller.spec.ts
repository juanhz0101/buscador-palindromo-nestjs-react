import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { MongoPagination } from '@algoan/nestjs-pagination';

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

  it('el metodo getProducts de estar definido', () => {
    const pagination: MongoPagination = {
      filter: {},
      skip: 1,
      sort: { _id: -1 },
      limit: 1,
    };
    expect(controller.getProducts(pagination)).toBeDefined();
  });

  it('el metodo getProductsBySearch de estar definido', () => {
    const pagination: MongoPagination = {
      filter: {},
      skip: 1,
      sort: { _id: -1 },
      limit: 1,
    };
    expect(controller.getProductsBySearch('dsaasd', pagination)).toBeDefined();
  });

  it('debe retornar 10 productos el metodo getProducts', async () => {
    const pagination: MongoPagination = {
      filter: {},
      skip: 0,
      sort: {},
      limit: 10,
    };

    const products = await controller.getProducts(pagination);
    expect(products.resources.length).toBe(10);
  });

  it('debe retornar 1 producto con descuento del 50% el metodo getProductsBySearch', async () => {
    const pagination: MongoPagination = {
      filter: {},
      skip: 0,
      sort: {},
      limit: 10,
    };

    const products = await controller.getProductsBySearch('dsaasd', pagination);

    expect(products.resources[0].discount).toBe(50);
  });
});
