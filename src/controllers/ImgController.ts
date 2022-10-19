import express from 'express';
import validate from '../Validations/ValidFile';
import ImgFile from '../utils/FileUtils';
// This module is the controller of the request query "As we are using GET method"
async function image(request: express.Request,
    response: express.Response): Promise<void> {
        
    const validationMessage: null | string = await validate(request.query);//It validates for the health of the query
    if (validationMessage) {
        response.send(validationMessage);
        return;
    }

    let error: null | string = '';

    if (!(await ImgFile.isThumbAvailable(request.query))) {  // creates a thumb if requested "Checks the cache to find saved thumbnails"
        error = await ImgFile.createThumbnail(request.query);
    }
    if (error) {
        response.send(error);
        return;
    }
    
    const path: null | string = await ImgFile.getImagePath(request.query);// Checks for the file path and returns it in the screen
    if (path) {
        response.status(200).sendFile(path);
    } else {
        response.send('Error Proccessing the path');
    }
}
  export default image;