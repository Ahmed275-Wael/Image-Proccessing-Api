import express from 'express';
import image from '../controllers/ImgController';
const images: express.Router = express.Router();

images.get('/',image);

export default images;