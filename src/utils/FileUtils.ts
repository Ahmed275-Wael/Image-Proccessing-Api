import { promises as fs } from 'fs';
import path from 'path';
import Resize_Image from './SharpFactory'; 


interface ImgQuery {
  filename?: string;
  format?: string;
  width?: string;
  height?: string;
}

export default class ImgFile {
// Default Paths of Images and thier created thumbnails  "Base Class Variables"
// Resource : https://www.geeksforgeeks.org/node-js-path-resolve-method/
  static imagePath  = path.resolve(__dirname, './../../images/orgs');
  static ThumbPath  = path.resolve(__dirname, './../../images/thumbnails');
  
  //=======================================Utilities===========================================//
 
  // Resource : https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-ImgFiles-present-in-a-directory-in-node-j?rq=1
 // Utility Function to list the available ImgFile names in the ~/assets/images 
  static async getAvailDirNames(isThumb : boolean): Promise<string[]> {
    try {
      if (!isThumb) {
      return ((await fs.readdir(ImgFile.imagePath)).map(
        (filename: string): string => filename.split ('.')[0]
      )); 
    }
      return ((await fs.readdir(ImgFile.ThumbPath)).map(
        (filename: string): string => filename.split ('.')[0]
      ));
    } catch {
      return [];
    }
  }
  /**
   * @param {ImgQuery} img 
   * @param {string} [img.filename] 
   * @param {string} [img.width] 
   * @param {string} [img.height] 
   * @param {string} [img.format]
   * @param {boolean} IsThumb
   * @return {null|string} 
   */
  // Utility Function to get ImgFilePath (Image or Thumbnail) with the desired format (JPG, PNG, GIF)
  static async getImgFilePath (img :ImgQuery, IsThumb :boolean):Promise<string>{
    if(img.width && img.height && IsThumb){
      return path.resolve(
        ImgFile.ThumbPath,
        `${img.filename}_${img.width}x${img.height}.${img.format}`
      )}
     return path.resolve(ImgFile.imagePath, 
      `${img.filename}.${img.format}`
      )}

  /**
   * @param {string} [filename=''] 
   * @return {boolean} 
   */
  // Utility Function using the getAvailImgNames to track if the image is available or not
  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false; 
    }
    return (await ImgFile.getAvailDirNames(false)).includes(filename);
  }

  static async getImagePath(img: ImgQuery): Promise<null | string> {
    if (!img.filename || await ImgFile.isImageAvailable(img.filename) == false) {
      return null;
    }
    return await ImgFile.getImgFilePath(img,true);
  }
  /**
   * @return {string[]} 
   */
  

  /**
   * @param {ImgQuery} img 
   * @param {string} [img.filename] 
   * @param {string} [img.width] 
   * @param {string} [img.format]
   * @param {string} [img.height] 
   * @return {boolean} 
   */
  static async isThumbAvailable(img: ImgQuery): Promise<boolean> {
    if (!(img.filename && img.width && img.height)) {
      return false; 
    }
    const ThumbName: string = 
      `${img.filename}_${img.width}x${img.height}.${img.format}`;

    return (await ImgFile.getAvailDirNames(true)).includes(ThumbName);
  }

  static async isImgFileCorrupted (img : ImgQuery, isThumb : boolean) : Promise<boolean> {
    try {
      await fs.access(await ImgFile.getImgFilePath(img,isThumb));
      return true;
    } catch {
      return false;
    }
  }
 
  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(ImgFile.ThumbPath);
    } catch {
      fs.mkdir(ImgFile.ThumbPath);
    }
  }

  /**
   * @param {ImgQuery} img 
   * @param {string} [img.filename] 
   * @param {string} [img.format]
   * @param {string} [img.width] 
   * @param {string} [img.height] 
   * @return {null|string} 
   */
  static async createThumbnail(img: ImgQuery): Promise<null | string> {
    if (!(img.filename && img.width && img.height && img.format)) {
      return null; 
    }
    const ImgFilePath: string = await ImgFile.getImgFilePath(img,false );
    const PathThumb: string = await ImgFile.getImgFilePath(img,true);
    console.log(`Creating thumbnail ${PathThumb}`);
    return await Resize_Image({
      src: ImgFilePath,
      dest: PathThumb,
      format: (img.format),
      width: parseInt(img.width),
      height: parseInt(img.height)
    });
  }
  
}