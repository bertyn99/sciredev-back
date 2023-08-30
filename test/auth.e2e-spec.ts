import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/infrastructure/app.module'; // Adjust the import to your file structure

// Fonction pour générer une chaîne aléatoire
const randomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
let app: INestApplication;
describe('Auth (e2e)', () => {
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  it.skip('should sign up a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        userName: 'test' + randomString(5),  // Génère une chaîne aléatoire de longueur 5 et la préfixe avec "test"
        email: 'test' + randomString(5) + '@example.com',  // Même logique pour l'email
        password: 'test' + randomString(8)  // Même logique pour le mot de passe
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('should sign in an existing user', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'testoy@gmail.com',
        password: 'testoy64',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

});

afterAll(async () => {
  await app.close();
});
