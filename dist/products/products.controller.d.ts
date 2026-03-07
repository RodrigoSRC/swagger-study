import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Product;
    findAll(): Product[];
    findOne(id: number): Product;
    update(id: number, updateProductDto: UpdateProductDto): Product;
    remove(id: number): void;
}
