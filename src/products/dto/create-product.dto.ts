import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Teclado Mecânico', description: 'Nome do produto' })
  name: string;

  @ApiProperty({ example: 99.9, description: 'Preço do produto' })
  price: number;

  @ApiProperty({
    example: 'Teclado mecânico RGB com switch vermelho',
    description: 'Descrição do produto',
  })
  description: string;
}
