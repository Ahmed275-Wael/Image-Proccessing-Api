import { promises as fs } from 'fs';
import path from 'path';
import File from '../FileModel/file';

describe('Test image processing Api through sharp module', (): void => {
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
      filename: 'loo',
      width: '-100',
      height: '200'
    });
    expect(error).not.toBeNull();
  });
  it('Invalid height value', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'loo',
      width: '100',
      height: '-200'
    });
    expect(error).not.toBeNull();
  });

  // Note: Could also fail because of directory permissions
  it('Writes resized thumb file (existing file, valid size values)', async (): Promise<void> => {
    await File.createThumb({ filename: 'fjord', width: '99', height: '99' });

    const resizedImagePath: string = path.resolve(
      File.imagesThumbPath,
      `fjord-99x99.jpg`
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesThumbPath,
    'fjord-99x99.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // intentionally left blank
  }
});