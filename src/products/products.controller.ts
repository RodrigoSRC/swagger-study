import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso.',
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.create(createProductDto);
  }
  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos',
    type: [Product],
  })
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um produto por ID' })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Product {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um produto' })
  @ApiResponse({ status: 200, description: 'Produto removido' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.productsService.remove(id);
  }
}
