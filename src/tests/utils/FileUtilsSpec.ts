import { promises as fs } from 'fs';
import path from 'path';
import ImgFile from '../../utils/FileUtils';

describe('Test Api through sharp module', (): void => {
 it('Existing file, valid size values', async (): Promise<void> => {
     await ImgFile.createThumbnail({ filename: 'lol', width: '99', height: '99' , format:'png' });
    
     const resizedImagePath: string = path.resolve(
          ImgFile.ThumbPath,
          `lol_99x99.png`
        );
        let IsImgFileCreated: boolean;
    
        try {
          await fs.access(resizedImagePath);
          IsImgFileCreated = true;
        } catch {
            IsImgFileCreated = false;
        }
    
        expect(IsImgFileCreated).toBe(true);
      });
    });
  it('Filename does not exist', async (): Promise<void> => {
    const err: null | string = await ImgFile.createThumbnail({
      filename: 'loo',
      width: '100',
      height: '200', 
      format:'png'
    });
    expect(err).not.toBeNull();
  });

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    ImgFile.ThumbPath,
    'lol-10x20.png'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
  }
});