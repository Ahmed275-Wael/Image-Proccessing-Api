import express from 'express';
import File from './file';

// query segments
interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

/**
 * @param {ImageQuery} query 
 * @return {null|string} 
 */
const validate = async (query: ImageQuery): Promise<null | string> => {
  // Check if requested file is available
  if (!(await File.isImageAvailable(query.filename))) {
    const availableImageNames: string = (
      await File.getAvailableImageNames()
    ).join(', ');
    return `Please pass a valid filename . Available filenames are: ${availableImageNames}.`;
  }

  if (!query.width && !query.height) {
    return null; 
  }

  
  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "Give a positive  value for the 'width' query segment.";
  }

  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "Give a positive  value for the 'height' query segment.";
  }

  return null;
};
export default validate;