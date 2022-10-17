import { promises as fs } from 'fs';
import path from 'path';
import proc_Image from './img-proc'; 


interface ImgQuery {
  filename?: string;
  width?: string;
  height?: string;
}

export default class File {
  /**
   * @param {ImgQuery} params 
   * @param {string} [params.filename] 
   * @param {string} [params.width] 
   * @param {string} [params.height] 
   * @return {null|string} 
   */
  static async getFilePath (params :ImgQuery): Promise<string>{
    if (params.width && params.height){
      return path.resolve(
        File.ThumbPath,
        `${params.filename}-${params.width}x${params.height}.jpg`
      )}
     return path.resolve(File.imagePath, `${params.filename}.jpg`);

  }

  static async getImagePath(params: ImgQuery): Promise<null | string> {
    if (!params.filename) {
      return null;
    }
    const filePath: string =
     await File.getFilePath(params);
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }
  /**
   * @param {string} [filename=''] 
   * @return {boolean} 
   */
   static async getAvailImgNames(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagePath)).map(
        (filename: string): string => filename.split('.')[0]
      ); 
    } catch {
      return [];
    }
  }
  static async getAvailThmbNames(): Promise<string[]> {
    try {
      return (await fs.readdir(File.ThumbPath)).map(
        (filename: string): string => filename.split('.')[0]
      ); 
    } catch {
      return [];
    }
  }
  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false; 
    }
    return (await File.getAvailImgNames()).includes(filename);
  }
  /**
   * @return {string[]} 
   */
  

  /**
   * @param {ImgQuery} params 
   * @param {string} [params.filename] 
   * @param {string} [params.width] 
   * @param {string} [params.height] 
   * @return {boolean} 
   */
  static async isThumbAvailable(params: ImgQuery): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false; 
    }
    const filePath: string = path.resolve(
      File.ThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

 
  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(File.ThumbPath);
    } catch {
      fs.mkdir(File.ThumbPath);
    }
  }

  /**
   * @param {ImgQuery} params 
   * @param {string} [params.filename] 
   * @param {string} [params.width] 
   * @param {string} [params.height] 
   * @return {null|string} 
   */
  static async createThumb(params: ImgQuery): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null; 
    }
    const filePath: string = path.resolve(
      File.imagePath,
      `${params.filename}.jpg`
    );
    const PathThumb: string = path.resolve(
      File.ThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );
    console.log(`Creating thumb ${PathThumb}`);
    return await proc_Image({
      source: filePath,
      target: PathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }
  static imagePath = path.resolve(__dirname, '../../assets/images');
  static ThumbPath = path.resolve(__dirname, '../../assets/images/thumbs');
}