import { promises as fs } from 'fs';
import path from 'path';
import File from '../FileModel/file';

describe('Test Api through sharp module', (): void => {
 it('Existing file, valid size values', async (): Promise<void> => {
     await File.createThumb({ filename: 'fjord', width: '99', height: '99' });
    
     const resizedImagePath: string = path.resolve(
          File.ThumbPath,
          `fjord-99x99.jpg`
        );
        let IsFileCreated: boolean;
    
        try {
          await fs.access(resizedImagePath);
          IsFileCreated = true;
        } catch {
            IsFileCreated = false;
        }
    
        expect(IsFileCreated).toBe(true);
      });
    });
  it('Filename does not exist', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'loo',
      width: '100',
      height: '200'
    });
    expect(error).not.toBeNull();
  });
  it('Invalid width value', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'fjord',
      width: '-100',
      height: '200'
    });
    expect(error).not.toBeNull();
  });
  it('Invalid height value', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'fjord',
      width: '100',
      height: '-200'
    });
    expect(error).not.toBeNull();
  });
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.ThumbPath,
    'fjord-99x99.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
  }
});