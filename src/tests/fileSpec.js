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
const file_1 = __importDefault(require("../FileModel/file"));
describe('Test image processing Api through sharp module', () => {
    it('Filename does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield file_1.default.createThumb({
            filename: 'loo',
            width: '100',
            height: '200'
        });
        expect(error).not.toBeNull();
    }));
    it('Invalid width value', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield file_1.default.createThumb({
            filename: 'loo',
            width: '-100',
            height: '200'
        });
        expect(error).not.toBeNull();
    }));
    it('Invalid height value', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield file_1.default.createThumb({
            filename: 'loo',
            width: '100',
            height: '-200'
        });
        expect(error).not.toBeNull();
    }));
    // Note: Could also fail because of directory permissions
    it('Writes resized thumb file (existing file, valid size values)', () => __awaiter(void 0, void 0, void 0, function* () {
        yield file_1.default.createThumb({ filename: 'fjord', width: '99', height: '99' });
        const resizedImagePath = path_1.default.resolve(file_1.default.ThumbPath, `fjord-99x99.jpg`);
        let errorFile = '';
        try {
            yield fs_1.promises.access(resizedImagePath);
            errorFile = null;
        }
        catch (_a) {
            errorFile = 'File was not created';
        }
        expect(errorFile).toBeNull();
    }));
});
// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const resizedImagePath = path_1.default.resolve(file_1.default.ThumbPath, 'fjord-99x99.jpg');
    try {
        yield fs_1.promises.access(resizedImagePath);
        fs_1.promises.unlink(resizedImagePath);
    }
    catch (_a) {
        // intentionally left blank
    }
}));
