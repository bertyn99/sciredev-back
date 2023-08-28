import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/infrastructure/app.module'; // Adjust the import to your file structure

describe.skip('UserController (e2e)', () => {
  let app: INestApplication;
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /user/findAll', () => {
    return request(app.getHttpServer())
      .get('/user/findAll')
      .expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('GET /user/:id', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .expect(200);
  });

  it('PATCH /user/:id', () => {
    return request(app.getHttpServer())
      .patch('/user/1')
      .send({ name: 'NewName' })  // Remplacez par les champs réels de votre DTO
      .expect(200);
  });

  it('DELETE /user/:id', () => {
    return request(app.getHttpServer())
      .delete('/user/1')
      .expect(200);
  });
});
