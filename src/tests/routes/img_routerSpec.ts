import supertest from 'supertest';
import app from '../../index';
import { promises as fs } from 'fs';
import path from 'path';
import File from '../../utils/FileUtils';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

  describe('endpoint: /img_router', (): void => {
    it('gets /img_router?filename=fjord (valid format)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/img_router?filename=fjord&format=jpg'
      );

      expect(response.status).toBe(200);
    });

    it('gets /img_router?filename=fjord&width=199&height=199 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/img_router?filename=fjord&width=199&height=199&format=jpg'
      );

      expect(response.status).toBe(200);
    });

    it('gets /img_router?filename=fjord&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/img_router?filename=fjord&width=-200&height=200&format=jpg'
      );

      expect(response.status).toBe(200);
    });

    it('gets /img_router (no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/img_router');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /loo', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/loo');

      expect(response.status).toBe(404);
    });
  });
;


afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.ThumbPath,
    'fjord-199x199.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    
  }
});