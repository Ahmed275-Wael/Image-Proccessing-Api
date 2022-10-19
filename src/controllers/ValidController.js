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
const ValidFile_1 = __importDefault(require("./../FileModel/ValidFile"));
const file_1 = __importDefault(require("../FileModel/file"));
function image(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const validationMessage = yield (0, ValidFile_1.default)(request.query);
        if (validationMessage) {
            response.send(validationMessage);
            return;
        }
        let error = '';
        if (!(yield file_1.default.isThumbAvailable(request.query))) {
            error = yield file_1.default.createThumbnail(request.query);
        }
        if (error) {
            response.send(error);
            return;
        }
        const path = yield file_1.default.getImagePath(request.query);
        if (path) {
            response.sendFile(path);
        }
        else {
            response.send('Error Proccessing the path');
        }
    });
}
exports.default = image;
