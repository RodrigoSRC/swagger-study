"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
let ProductsService = class ProductsService {
    products = [];
    idCounter = 1;
    create(createProductDto) {
        const product = {
            id: this.idCounter++,
            ...createProductDto,
        };
        this.products.push(product);
        return product;
    }
    findAll() {
        return this.products;
    }
    findOne(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new common_1.NotFoundException(`Produto com id ${id} não encontrado`);
        }
        return product;
    }
    update(id, updateProductDto) {
        const product = this.findOne(id);
        Object.assign(product, updateProductDto);
        return product;
    }
    remove(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Produto com id ${id} não encontrado`);
        }
        this.products.splice(index, 1);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map