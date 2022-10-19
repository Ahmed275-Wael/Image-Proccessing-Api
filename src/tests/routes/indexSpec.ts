import supertest from 'supertest';
import app from '../../index';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test Index Endpoint', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
 
})
