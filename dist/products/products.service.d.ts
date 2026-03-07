import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private products;
    private idCounter;
    create(createProductDto: CreateProductDto): Product;
    findAll(): Product[];
    findOne(id: number): Product;
    update(id: number, updateProductDto: UpdateProductDto): Product;
    remove(id: number): void;
}
