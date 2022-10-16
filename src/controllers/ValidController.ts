import express from 'express';
import validate from './../FileModel/ValidFile';
import File from '../FileModel/file';

async function image(request: express.Request,
    response: express.Response): Promise<void> {
    const validationMessage: null | string = await validate(request.query);
    if (validationMessage) {
        response.send(validationMessage);
        return;
    }

    let error: null | string = '';

    if (!(await File.isThumbAvailable(request.query))) {
        error = await File.createThumb(request.query);
    }


    if (error) {
        response.send(error);
        return;
    }


    const path: null | string = await File.getImagePath(request.query);
    if (path) {
        response.sendFile(path);
    } else {
        response.send('Error Proccessing the path');
    }
}
  export default image;