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
exports.get_all_products = exports.get_product_detail_user = exports.get_category_dishes_user = exports.get_products_items_user = void 0;
const database_1 = require("../database");
const get_products_items_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**  */
    /*OBTENEMOS LOS ITEMS QUE PERTENECEN A UN PRODUCTO ESPECÍFICO*/
    const id_product = parseInt(req.params.id_product);
    var array_id_group_items = [];
    var array_items = [];
    try {
        const response = yield database_1.pool.query('SELECT id_group_items FROM product_group_detail where id_product = $1 ', [id_product]);
        array_id_group_items = response.rows;
        /*console.log(id_product)
        array_id_group_items.push(response.rows[0])*/
        for (let i = 0; i < array_id_group_items.length; i++) {
            //console.log(array_id_group_items[i].id_group_items); 
            const response2 = yield database_1.pool.query('SELECT gi.id_group_items, gi.name , gi.max_selected, gio.tag, gio.price  FROM  group_items_options gio   INNER JOIN group_items gi ON  gio.id_group_items = gi.id_group_items and gi.id_group_items = $1', [array_id_group_items[i].id_group_items]);
            array_items.push(response2.rows);
        }
        return res.status(200).json({ "appResponse": { "data": array_items } });
        /*console.log(response.rows)
        */
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error ' + error);
    }
});
exports.get_products_items_user = get_products_items_user;
/*export const getCategoriesmovil_user = async (req: Request, res: Response): Promise <Response> =>{
    
    const count=parseInt(req.params.count);

    try {
        const response: QueryResult = await pool.query('SELECT * FROM category ORDER BY name');
        return  res.status(200).json( {"appResponse" : {"data" : response.rows}  });
        
        } catch (error) {
        console.log(error)
       
        return  res.status(500).json('Internal server error');
        
    }
    
}*/
const get_category_dishes_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_category = parseInt(req.params.id_category);
    /*SELECCIONAR TODOS LOS PRODUCTOS QUE PERTENECEN A DETERMINADA CATEGORIA*/
    try {
        const response = yield database_1.pool.query('SELECT * FROM product p INNER JOIN product_category pc on p.id_product=pc.id_product and pc.id_category = $1 ', [id_category]);
        return res.status(200).json({ "appResponse": { "data": response.rows } });
        /*console.log(response.rows)
        res.send('dishes')*/
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
});
exports.get_category_dishes_user = get_category_dishes_user;
const get_product_detail_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id_product);
    /*OBTENEMOS VALORES ESPECIFICOS DE LA TABLA PRODUCTO POR MEDIO DE UN id */
    try {
        const response = yield database_1.pool.query('SELECT * FROM product where id_product = $1 ', [id]);
        return res.status(200).json({ "appResponse": { "data": response.rows.length > 0 ? response.rows[0] : {} } });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal server erro');
    }
});
exports.get_product_detail_user = get_product_detail_user;
const get_all_products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*SELECCIONAR TODOS LOS PRODUCTOS QUE PERTENECEN A DETERMINADA CATEGORIA*/
    try {
        const response = yield database_1.pool.query("SELECT * FROM product p INNER JOIN product_category pc on p.id_product=pc.id_product and p.is_enable='1' ORDER BY name");
        return res.status(200).json({ "appResponse": { "data": response.rows } });
        /*console.log(response.rows)
        res.send('dishes')*/
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
});
exports.get_all_products = get_all_products;
