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
const file_1 = __importDefault(require("./file"));
/**
 * @param {ImageQuery} query
 * @return {null|string}
 */
const validate = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if requested file is available
    if (!(yield file_1.default.isImageAvailable(query.filename))) {
        const availableImageNames = (yield file_1.default.getAvailableImageNames()).join(', ');
        return `Please pass a valid filename . Available filenames are: ${availableImageNames}.`;
    }
    if (!query.width && !query.height) {
        return null;
    }
    const width = parseInt(query.width || '');
    if (Number.isNaN(width) || width < 1) {
        return "Give a positive  value for the 'width' query segment.";
    }
    const height = parseInt(query.height || '');
    if (Number.isNaN(height) || height < 1) {
        return "Give a positive  value for the 'height' query segment.";
    }
    return null;
});
exports.default = validate;
