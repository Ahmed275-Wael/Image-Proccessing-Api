import express from 'express';
import images from './img_router';

const routes: express.Router = express.Router();

routes.use('/img_router', images);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    response.status(200).send(
      '<h1>Welcome to Image-Processing-Api</h1><p>Listening at <code><a href="/img_router">/img_router</a></code> for queries containing at least a valid filename. Optionally use both width and height to set the size...</p><p>Examples:<ul><li><a href="/img_router?filename=fjord">/img_router?filename=fjord</a></li><li><a href="/img_router?filename=fjord&width=100&height=100">/img_router?filename=fjord&width=100&height=100</a></li></ul></p>'
    );
  }
);

export default routes;