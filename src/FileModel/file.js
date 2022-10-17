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
class File {
    /**
     * @param {ImageQuery} params
     * @param {string} [params.filename]
     * @param {string} [params.width]
     * @param {string} [params.height]
     * @return {null|string}
     */
    static getImagePath(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename) {
                return null;
            }
            const filePath = params.width && params.height
                ? path_1.default.resolve(File.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`)
                : path_1.default.resolve(File.imagesFullPath, `${params.filename}.jpg`);
            try {
                yield fs_1.promises.access(filePath);
                return filePath;
            }
            catch (_a) {
                return null;
            }
        });
    }
    /**
     
     * @param {string} [filename='']
     * @return {boolean}
     */
    static isImageAvailable(filename = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                return false; // Fail early
            }
            return (yield File.getAvailableImageNames()).includes(filename);
        });
    }
    /**
     
     * @return {string[]}
     */
    static getAvailableImageNames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield fs_1.promises.readdir(File.imagesFullPath)).map((filename) => filename.split('.')[0]);
            }
            catch (_a) {
                return [];
            }
        });
    }
    /**
     
     * @param {ImageQuery} params
     * @param {string} [params.filename]
     * @param {string} [params.width]
     * @param {string} [params.height]
     * @return {boolean}
     */
    static isThumbAvailable(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename || !params.width || !params.height) {
                return false;
            }
            const filePath = path_1.default.resolve(File.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`);
            try {
                yield fs_1.promises.access(filePath);
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
                yield fs_1.promises.access(File.imagesThumbPath);
            }
            catch (_a) {
                fs_1.promises.mkdir(File.imagesThumbPath);
            }
        });
    }
    /**
    
     * @param {ImageQuery} params
     * @param {string} [params.filename]
     * @param {string} [params.width]
     * @param {string} [params.height]
     * @return {null|string}
     */
    static createThumb(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename || !params.width || !params.height) {
                return null;
            }
            const filePathFull = path_1.default.resolve(File.imagesFullPath, `${params.filename}.jpg`);
            const filePathThumb = path_1.default.resolve(File.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`);
            console.log(`Creating thumb ${filePathThumb}`);
            return yield (0, img_proc_1.default)({
                source: filePathFull,
                target: filePathThumb,
                width: parseInt(params.width),
                height: parseInt(params.height)
            });
        });
    }
}
exports.default = File;
File.imagesFullPath = path_1.default.resolve(__dirname, '../../assets/images');
File.imagesThumbPath = path_1.default.resolve(__dirname, '../../assets/images/thumbs');
