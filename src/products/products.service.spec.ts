import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product and return it with an id', () => {
      const dto = { name: 'Teclado', price: 99.9, description: 'Mecânico RGB' };

      const result = service.create(dto);

      expect(result).toEqual({
        id: 1,
        ...dto,
      });
    });
  });

  describe('findAll', () => {
    it('should return empty array when no products exist', () => {
      const result = service.findAll();
      expect(result).toEqual([]);
    });

    it('should return all products', () => {
      const dto = { name: 'Teclado', price: 99.9, description: 'Mecânico RGB' };
      service.create(dto);

      const result = service.findAll();
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ id: 1, ...dto });

      // CASOS DE UUID

      // expect(result).toEqual([expect.objectContaining({...dto})])
      // OU
      // expect(result[0]).toMatchObject({ name: 'Teclado', price: 99.9 });

      // expect(result[0].id).toBeDefined();
      // OU
      // expect(typeof result[0].id).toBe('number');
    });
  });

  describe('findOne', () => {
    it('should return a product by id', () => {
      const dto = { name: 'Teclado', price: 99.9, description: 'Mecânico RGB' };
      service.create(dto);

      const result = service.findOne(1);

      // CASOS DE UUID

      // const created = service.create(dto);
      // const result = service.findOne(created.id);

      expect(result).toEqual({ id: 1, ...dto });

      // CASOS DE UUID

      // expect(result).toEqual(expect.objectContaining({...dto}))
      // OU
      // expect(result).toMatchObject({ ...dto });

      // expect(result.id).toBeDefined();
      // OU
      // expect(typeof result.id).toBe('number');
    });

    it('should throw NotFoundException if product does not exist', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product and return it', () => {
      const dto = { name: 'Teclado', price: 99.9, description: 'Mecânico RGB' };
      service.create(dto);

      const updateDto = { name: 'Teclado Gamer', price: 149.9 };
      const result = service.update(1, updateDto);

      // CASOS DE UUID

      // const created = service.create(dto);
      // const result = service.update(created.id, updateDto);

      expect(result).toEqual({ id: 1, ...dto, ...updateDto });
      // OU
      // expect(result).toMatchObject({id: 1, ...updateDto });
    });

    it('should throw NotFoundException if product does not exist', () => {
      expect(() => service.update(999, { name: 'Produto' })).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', () => {
      const dto = {
        name: 'Teclado',
        price: 99.9,
        description: 'Mecânico RGB',
      };
      service.create(dto);

      service.remove(1);

      // CASOS DE UUID

      // const created = service.create(dto);
      // const result = service.remove(created.id);

      expect(service.findAll()).toEqual([]);
    });

    it('should throw NotFoundException if product does not exist', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
