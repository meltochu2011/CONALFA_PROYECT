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
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_autentication = void 0;
const database_1 = require("../database");
const get_autentication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, user_pass } = req.body;
    //console.log('Body recibido:', req.body);
    //console.log(user_name, user_pass);
    const count = parseInt(req.params.count);
    try {
        /**AGREGADO */
        console.log("hola estoy accediendo");
        /**FIN AGREGADO */
        const response2 = yield database_1.pool.query("SELECT COUNT(*) OVER() as usercount, m.user_rol_id, m.nombres, m.apellidos, m.rol_name FROM users u inner join multiple_rol m on u.user_rol_id = m.user_rol_id where u.user_name = $1 and u.pass = $2", [user_name, user_pass]);
        // console.log(response2.rows[0].m.user_rol_id);
        //console.log(response2.rows[0].nombres);
        // console.log(response2.rows[0].rol_name);
        //const jwt = require('jsonwebtoken');s
        if (response2.rows.length == 0) {
            return res.json({
                token: 'notloggedin',
            });
            // console.log("Usuario o password Incorrectos");
        }
        else {
            console.log("entra acá " + response2.rows[0].user_rol_id);
            //console.log(response2.rows[0].u.user_count);
            return res.status(200).json({
                token: response2.rows[0].user_rol_id,
                nombres: response2.rows[0].nombres,
                apellidos: response2.rows[0].apellidos,
                rol_name: response2.rows[0].rol_name, //array_id_group_items[i].id_group_items,
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('token: ' + error);
    }
});
exports.get_autentication = get_autentication;
