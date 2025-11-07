"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const obtenerNumeroAleatorioEnRango = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
let nombre = "";
const storage = multer_1.default.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        //Para obtener unicamente la extension de la imagen es           path.extname(file.originalname)
        cb(null, obtenerNumeroAleatorioEnRango(100, 400) + obtenerNumeroAleatorioEnRango(1, 100) + file.originalname);
        nombre = file.originalname;
    }
});
exports.default = (0, multer_1.default)({ storage });
