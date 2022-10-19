# Table of Contents

* [Scripts to run](#-scripts-to-run)
* [How to use](#how-to-use)
* [Notes](#notes)
* [Author](#author)

## Scripts to run :
- For installation of missing dependencies : npm install
- For Building the project : npm run build
- For building and testing the Project : npm run test
- For running Prettier : npm run format
- For running eslint for fixing : npm run lint:fix
- For Starting the server : npm run start

## How to use :
- Create .env file with the desired port example :"PORT = 3000"
- Endpoint to resize images and show available files :
  http://localhost:3000/img_router
- The Query is run by GET method 

### Contents of the query :
- filename : fjord , lol (You can add more .jpg , .png , .gif files in <Your working directory>/assets/images)
- width : +ve pixel numerical value 
- height : +ve pixel numerical value

### Endpoints for this Project :
- http://localhost:3000 (Welcome Page with some brief instructions) 
- http://localhost:3000/img_router (Page to show available files)
- http://localhost:3000/img_router?filename=fjord&format=jpg (Showing the .jpg file fjord stored in <Your working directory>/assets/images)
- http://localhost:3000/img_router?filename=lol&width=200&height=200&format=png (Showing the .jpg file fjord stored in <Your working directory>/assets/images scaled by 200x200 and storing it in <Your working directory>/assets/images/thumbs)

## Notes
- Some of the written code referenced from the TypeScript,node.js, express, sharp and jasmine documentation but with minimal copied code and utmost understanding of the topic.
- sharp documentation: https://sharp.pixelplumbing.com/
- express documentation: https://expressjs.com/
- node.js: https://nodejs.org/en/docs/
- jasmine: https://jasmine.github.io/setup/nodejs.html
- https://www.geeksforgeeks.org/node-js-path-resolve-method/
- https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-ImgFiles-present-in-a-directory-in-node-j?rq=1
- https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp

## Author
The code was written by Ahmed Wael Mohamed ([@Ahmed275-Wael](https://github.com/Ahmed275-Wael)) , for the Image-Processing-Api project by Udacity.