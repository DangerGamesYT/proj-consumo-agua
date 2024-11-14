import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { ConsumoAgua } from './consumo_agua.model';

@Controller('consumo_agua')
export class ConsumoAguaController {
    constructor(private readonly consumoAguaService: ConsumoAguaService) {}

    // Endpoint para registrar o consumo
    @Post()
    async registrarConsumo(
      @Body() createConsumoDto: CreateConsumoDto): Promise<{ consumo: ConsumoAgua; alerta?: string }> {
        // Registrar o novo consumo
        const novoConsumo = await this.consumoAguaService.registrarConsumo(createConsumoDto);
      
        // Gerar alerta, se aplicável
        const alerta = await this.consumoAguaService.gerarAlerta(createConsumoDto.usuarioId);
      
        // Retornar o consumo registrado e o alerta, se houver
        return { consumo: novoConsumo, alerta };
      }
  
    // Endpoint para consultar o histórico de consumo
    @Get('historico')
    async consultarHistorico(
      @Query('dataInicio') dataInicio: string,
      @Query('dataFim') dataFim: string,
    ): Promise<ConsumoAgua[]> {
      return this.consumoAguaService.consultarHistorico(new Date(dataInicio), new Date(dataFim));
    }
  
    // Endpoint para verificar alertas de consumo elevado
    @Get('alerta')
    async verificarAlerta(@Query('usuarioId') usuarioId: string): Promise<string | null> {
      return this.consumoAguaService.gerarAlerta(usuarioId);
    }
  }
