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
const sharp_1 = __importDefault(require("sharp"));
// Reference :: https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp
/**
 * Resize,chnage the format of the image and put it in a new destination through sharp module
 * @param {Img_img} img Parameters.
 * @param {string} img.src src image path.
 * @param {string} img.dest destination path.
 * @param {number} img.width destination width.
 * @param {number} img.height destination height.
 * @param {string} img.format destination format of (gif png jpeg).
 * @return {string | null} Returns "Success"string or null for Failure.
 */
const Resize_Image = (img) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        switch (img.format) {
            case ("JPG"):
                yield (0, sharp_1.default)(img.src).resize(img.width, img.height).toFormat('jpg').toFile(img.dest);
                break;
            case ("PNG"):
                yield (0, sharp_1.default)(img.src).resize(img.width, img.height).toFormat('png').toFile(img.dest);
                break;
            case ("GIF"):
                yield (0, sharp_1.default)(img.src).resize(img.width, img.height).toFormat('gif').toFile(img.dest);
                break;
            default:
                return 'Please choose one of the Following extensions : JPG PNG GIF';
        }
        return "success";
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = Resize_Image;
