import express from 'express';
import image from '../controllers/ValidController';
const images: express.Router = express.Router();

images.get('/',image);

export default images;