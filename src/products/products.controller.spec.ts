import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

// Produto fake que os mocks vão retornar
const mockProduct = {
  id: 1,
  name: 'Teclado',
  price: 99.9,
  description: 'Mecânico RGB',
};

// Mock do ProductsService — cada método é um jest.fn()
const mockProductsService = {
  create: jest.fn().mockReturnValue(mockProduct),
  findAll: jest.fn().mockReturnValue([mockProduct]),
  findOne: jest.fn().mockReturnValue(mockProduct),
  update: jest.fn().mockReturnValue({ ...mockProduct, name: 'Teclado Gamer' }),
  remove: jest.fn(),
};

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService, // quando alguém pedir ProductsService...
          useValue: mockProductsService, // ...entrega o mock no lugar
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return the product', () => {
      const dto = { name: 'Teclado', price: 99.9, description: 'Mecânico RGB' };

      const result = controller.create(dto);

      expect(mockProductsService.create).toHaveBeenCalledWith(dto);

      expect(result).toEqual(mockProduct);
    });
  });
});
