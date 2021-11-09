import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb://productListUser:productListPassword@db-walmart-backend-container:27017/promotions?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    ),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
