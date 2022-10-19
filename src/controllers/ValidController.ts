import express from 'express';
import validate from './../FileModel/ValidFile';
import ImgFile from '../FileModel/file';

async function image(request: express.Request,
    response: express.Response): Promise<void> {
    const validationMessage: null | string = await validate(request.query);
    if (validationMessage) {
        response.send(validationMessage);
        return;
    }

    let error: null | string = '';

    if (!(await ImgFile.isThumbAvailable(request.query))) {
        error = await ImgFile.createThumbnail(request.query);
    }
    if (error) {
        response.send(error);
        return;
    }
    
    const path: null | string = await ImgFile.getImagePath(request.query);
    if (path) {
        response.sendFile(path);
    } else {
        response.send('Error Proccessing the path');
    }
}
  export default image;