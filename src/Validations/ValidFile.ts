import ImgFile from '../utils/FileUtils';

// query segments
interface ImageQuery {
  filename?: string;
  width?: string;
  format? :string;
  height?: string;
}
// This module uses the FileModel utility module to validate for file existance and parameters
/**
 * @param {ImageQuery} query 
 * @return {null|string} 
 */
const validate = async (query: ImageQuery): Promise<null | string> => {

  // Check if requested file is available
  if (!(await ImgFile.isImageAvailable(query.filename))) {
                                                                     //false As it is searching for images not thumbs
    const availableImageNames: string = (await ImgFile.getAvailDirNames(false)).join(', '); 
    return `Please pass a valid filename . Available filenames are: [${availableImageNames}].`;
  }
  if (!(query.width ||query.height)) {
    return null; 
  }
  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "Give only a positive  value for the 'width' .";
  }
  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "Give only a positive  value for the 'height'.";
  }
  const format :string = query.format || '';
  if (format == ''){
    return "Please choose one of the formats present in/images/orgs directory"
  }

  return null;
};
export default validate;