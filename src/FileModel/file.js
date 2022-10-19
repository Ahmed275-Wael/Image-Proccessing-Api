"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const img_proc_1 = __importDefault(require("./img-proc"));
class ImgFile {
    //=======================================Utilities===========================================//
    // Resource : https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-ImgFiles-present-in-a-directory-in-node-j?rq=1
    // Utility Function to list the available ImgFile names in the ~/assets/images 
    static getAvailDirNames(isThumb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!isThumb) {
                    return ((yield fs_1.promises.readdir(ImgFile.imagePath)).map((filename) => filename.split('.')[0]));
                }
                return ((yield fs_1.promises.readdir(ImgFile.ThumbPath)).map((filename) => filename.split('.')[0]));
            }
            catch (_a) {
                return [];
            }
        });
    }
    /**
     * @param {ImgQuery} img
     * @param {string} [img.filename]
     * @param {string} [img.width]
     * @param {string} [img.height]
     * @param {string} [img.format]
     * @param {boolean} IsThumb
     * @return {null|string}
     */
    // Utility Function to get ImgFilePath (Image or Thumbnail) with the desired format (JPG, PNG, GIF)
    static getImgFilePath(img, IsThumb) {
        return __awaiter(this, void 0, void 0, function* () {
            if (img.width && img.height && IsThumb) {
                return path_1.default.resolve(ImgFile.ThumbPath, `${img.filename}-${img.width}x${img.height}.${img.format}`);
            }
            return path_1.default.resolve(ImgFile.imagePath, `${img.filename}.${img.format}`);
        });
    }
    /**
     * @param {string} [filename='']
     * @return {boolean}
     */
    // Utility Function using the getAvailImgNames to track if the image is available or not
    static isImageAvailable(filename = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                return false;
            }
            return (yield ImgFile.getAvailDirNames(false)).includes(filename);
        });
    }
    static getImagePath(img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!img.filename || (yield ImgFile.isImageAvailable(img.filename)) == false) {
                return null;
            }
            return yield ImgFile.getImgFilePath(img, false);
        });
    }
    /**
     * @return {string[]}
     */
    /**
     * @param {ImgQuery} img
     * @param {string} [img.filename]
     * @param {string} [img.width]
     * @param {string} [img.format]
     * @param {string} [img.height]
     * @return {boolean}
     */
    static isThumbAvailable(img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(img.filename && img.width && img.height)) {
                return false;
            }
            const ThumbName = `${img.filename}-${img.width}x${img.height}.${img.format}`;
            return (yield ImgFile.getAvailDirNames(true)).includes(ThumbName);
        });
    }
    static isImgFileCorrupted(img, isThumb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(yield ImgFile.getImgFilePath(img, isThumb));
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static createThumbPath() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(ImgFile.ThumbPath);
            }
            catch (_a) {
                fs_1.promises.mkdir(ImgFile.ThumbPath);
            }
        });
    }
    /**
     * @param {ImgQuery} img
     * @param {string} [img.filename]
     * @param {string} [img.format]
     * @param {string} [img.width]
     * @param {string} [img.height]
     * @return {null|string}
     */
    static createThumbnail(img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(img.filename && img.width && img.height && img.format)) {
                return null;
            }
            const ImgFilePath = yield ImgFile.getImgFilePath(img, false);
            const PathThumb = yield ImgFile.getImgFilePath(img, true);
            console.log(`Creating thumbnail ${PathThumb}`);
            return yield (0, img_proc_1.default)({
                src: ImgFilePath,
                dest: PathThumb,
                format: (img.format),
                width: parseInt(img.width),
                height: parseInt(img.height)
            });
        });
    }
}
exports.default = ImgFile;
// Default Paths of Images and thier created thumbnails  "Base Class Variables"
// Resource : https://www.geeksforgeeks.org/node-js-path-resolve-method/
ImgFile.imagePath = path_1.default.resolve(__dirname, '../../assets/images');
ImgFile.ThumbPath = path_1.default.resolve(__dirname, '../../assets/images/thumbs');
