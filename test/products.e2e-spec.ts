import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Products (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /products', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send({ name: 'Teclado', price: 99.9, description: 'Mecânico RGB' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Teclado',
          price: 99.9,
          description: 'Mecânico RGB',
        });
      });
  });

  it('GET /products', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            name: 'Teclado',
            price: 99.9,
            description: 'Mecânico RGB',
          },
        ]);
      });
  });

  it('GET /products/:id', () => {
    return request(app.getHttpServer())
      .get('/products/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Teclado',
          price: 99.9,
          description: 'Mecânico RGB',
        });
      });
  });

  it('PUT /products/:id', () => {
    return request(app.getHttpServer())
      .put('/products/1')
      .send({
        name: 'Teclado Atualizado',
        price: 109.9,
        description: 'Mecânico RGB Atualizado',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Teclado Atualizado',
          price: 109.9,
          description: 'Mecânico RGB Atualizado',
        });
      });
  });

  it('DELETE /products/:id', () => {
    return request(app.getHttpServer())
      .delete('/products/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({});
      });
  });
});
