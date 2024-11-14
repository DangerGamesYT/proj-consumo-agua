import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumoAguaModule } from './consumo_agua/consumo_agua.module';

dotenv.config();

@Module({
  imports: [ConsumoAguaModule, MongooseModule.forRoot(process.env.MONGODB_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
