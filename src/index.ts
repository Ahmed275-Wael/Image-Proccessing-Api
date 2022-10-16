import express from 'express';
import routes from './routes/index';
import File from './FileModel/file';

 import * as dotenv from 'dotenv'

 dotenv.config()
const PORT = process.env.PORT || 3000
// create an instance server
const app: express.Application = express()
// HTTP request logger middleware
app.use(routes)
// add routing for / path

// start express server
app.listen(PORT, async (): Promise<void> => {
  await File.createThumbPath();

  const url: string = `\x1b[2mhttp://localhost:${PORT}\x1b[0m`;
  console.log(`Please open ${url} to review the project ...`);
});
export default app