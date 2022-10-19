import sharp, { FormatEnum } from 'sharp';

// query segments
interface Img_img {
  src: string;
  dest: string;
  width: number;
  height: number;
  format: string;
}
// Reference :: https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp
/**
 * Resize,chnage the format of the image and put it in a new destination through sharp module
 * @param {Img_img} img Parameters.
 * @param {string} img.src src image path.
 * @param {string} img.dest destination path.
 * @param {number} img.width destination width.
 * @param {number} img.height destination height.
 * @param {string} img.format destination format of (gif png jpeg).
 * @return {string | null} Returns "Success"string or null for Failure.
 */
const Resize_Image = async (img: Img_img): Promise<string | null> => {
  try {
      switch(img.format){
        case("jpg"):
        await sharp(img.src).resize(img.width, img.height).toFormat('jpg').toFile(img.dest);
        break;
        case("png"):
        await sharp(img.src).resize(img.width, img.height).toFormat('png').toFile(img.dest);
        break;
        case("gif"):
        await sharp(img.src).resize(img.width, img.height).toFormat('gif').toFile(img.dest);
        break;
        case(undefined):
        await sharp(img.src).resize(img.width, img.height).toFormat('jpg').toFile(img.dest);
        break;

        default:
          return 'Please choose one of the Following extensions : jpg png gif';
      }
      return null;
  } catch (error) {
    console.log (error);
    return "shit";
  }
};

export default Resize_Image;