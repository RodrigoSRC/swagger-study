import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ example: 1, description: 'ID do produto' })
  id: number;

  @ApiProperty({ example: 'Teclado Mecânico', description: 'Nome do produto' })
  name: string;

  @ApiProperty({ example: 99.9, description: 'Preço do produto' })
  price: number;

  @ApiProperty({
    example: 'Teclado mecânico RGB com switches blue',
    description: 'Descrição do produto',
  })
  description: string;
}
