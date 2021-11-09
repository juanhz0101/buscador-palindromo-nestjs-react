import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductsModule } from './products.module';
import { ProductsController } from './products.controller';
import { MongoPagination } from '@algoan/nestjs-pagination';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProductsModule,
        MongooseModule.forRoot(
          'mongodb://productListUser:productListPassword@db-walmart-backend-container:27017/promotions?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
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

    service = module.get<ProductsService>(ProductsService);
  });

  it('El servicio products debe esta definido', () => {
    expect(service).toBeDefined();
  });

  it('el metodo getProducts de estar definido', async () => {
    const pagination: MongoPagination = {
      filter: {},
      skip: 1,
      sort: {},
      limit: 1,
    };
    expect(await service.getProducts(pagination)).toBeDefined();
  });

  it('el metodo getProductsBySearch de estar definido', async () => {
    const pagination: MongoPagination = {
      filter: {},
      skip: 1,
      sort: {},
      limit: 1,
    };
    expect(
      await service.getProductsBySearch('dsaasd', pagination),
    ).toBeDefined();
  });

  it('el metodo getProducts de retornar 10 productos', async () => {
    const pagination: MongoPagination = {
      filter: {},
      skip: 0,
      sort: {},
      limit: 10,
    };

    const { data } = await service.getProducts(pagination);
    expect(data.length).toBe(10);
  });

  it('el metodo getProductsBySearch debe retornar 1 producto con descuento del 50%', async () => {
    const pagination: MongoPagination = {
      filter: {},
      skip: 0,
      sort: {},
      limit: 10,
    };

    const { data } = await service.getProductsBySearch('dsaasd', pagination);
    expect(data[0].discount).toBe(50);
  });

  it('el metodo getProductsBySearch debe retornar 1 unico producto por ID', async () => {
    const pagination: MongoPagination = {
      filter: {},
      skip: 0,
      sort: {},
      limit: 10,
    };

    const { data } = await service.getProductsBySearch('1234', pagination);
    expect(data.length === 1).toBe(true);
  });
});
