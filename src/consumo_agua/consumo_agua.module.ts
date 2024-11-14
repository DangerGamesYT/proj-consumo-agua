import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumoAguaController } from './consumo_agua.controller';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAgua, ConsumoAguaSchema } from './consumo_agua.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ConsumoAgua.name, schema: ConsumoAguaSchema }]),
  ],
  controllers: [ConsumoAguaController],
  providers: [ConsumoAguaService]
})
export class ConsumoAguaModule {}
