import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsumoAgua } from './consumo_agua.model';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Injectable()
export class ConsumoAguaService {
    constructor(
        @InjectModel(ConsumoAgua.name) private consumoAguaModel: Model<ConsumoAgua>,
      ) {}
    
      // Método para registrar o consumo de água
      async registrarConsumo(createConsumoDto: CreateConsumoDto): Promise<ConsumoAgua> {
        const novoConsumo = new this.consumoAguaModel(createConsumoDto);
        return novoConsumo.save();
      }
    
      // Método para consultar histórico de consumo
      async consultarHistorico(dataInicio: Date, dataFim: Date): Promise<ConsumoAgua[]> {
        return this.consumoAguaModel.find({
          dataLeitura: { $gte: dataInicio, $lte: dataFim },
        }).exec();
      }
    
      // Método para gerar alerta de consumo elevado
      async gerarAlerta(usuarioId: string): Promise<string | null> {
        const consumosUsuario = await this.consumoAguaModel.find({ usuarioId }).sort({ dataLeitura: 1 }).exec();
      
        // Verificar se existem pelo menos dois registros para comparação
        if (consumosUsuario.length < 2) return null;
      
        const consumoAtual = consumosUsuario[consumosUsuario.length - 1].quantidade;
        const consumoAnterior = consumosUsuario[consumosUsuario.length - 2].quantidade;
      
        // Verificar se o consumo atual é maior que o anterior
        if (consumoAtual > consumoAnterior) {
          return `Alerta: O consumo do usuário ${usuarioId} aumentou em relação ao mês anterior!`;
        }
      
        return null;
      }
    }
