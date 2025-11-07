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
exports.getOrders_count = exports.get_orderitems_detail = exports.get_order_detail_product = exports.get_order_detail = void 0;
const database_1 = require("../database");
const get_order_detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**OBTIENE LOS VALORES MAS GENERALES DE UNA ORDEN ESPECIFICA DE LA TABLA ORDERS */
    const orderdetail_id = parseInt(req.params.orderdetail_id);
    const response = yield database_1.pool.query('SELECT e.person_name,e.person_second_name,e.user_phone,o.id_order,o.order_date,o.order_time,o.code,o.order_state,o.tag,o.total,o.order_type,o.date_spanishformat,o.date_englishformat FROM orders o inner join orders_extern_users e on o.id_order = e.id_order and o.id_order = $1 ORDER BY o.id_order', [orderdetail_id]);
    return res.status(200).json(response.rows);
});
exports.get_order_detail = get_order_detail;
const get_order_detail_product = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**OBTIENE LOS PLATILLOS, EL PRECIO Y LA CANTIDAD DE UNIDADES DE ESE PLATILLO, EN UNA ORDEN ESPECIFICA */
    const order_id = parseInt(req.params.order_id);
    const response = yield database_1.pool.query('SELECT id_order_detail, dish_name, dish_price, dishes_number, sub_total FROM orders_detail where id_order = $1', [order_id]);
    return res.status(200).json(response.rows);
});
exports.get_order_detail_product = get_order_detail_product;
const get_orderitems_detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**OBTIENE LOS EXTRAS O GUARNICIONES QUE PERTENECEN A UNA ORDEN */
    const orderdetail_id = parseInt(req.params.orderdetail_id);
    const response = yield database_1.pool.query('SELECT e.extra_name, e.extra_price, e.id_order_detail FROM orders_detail o inner join extra_orders_detail e on o.id_order_detail = e.id_order_detail and o.id_order = $1', [orderdetail_id]);
    return res.status(200).json(response.rows);
});
exports.get_orderitems_detail = get_orderitems_detail;
const getOrders_count = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**OBTENER LAS ORDENES DE 15 EN 15 SEGUN LA PAGINA */
    const count = parseInt(req.params.count);
    const orderstate = req.params.orderstate;
    try {
        const response = yield database_1.pool.query('SELECT o.id_order, e.person_name,e.person_second_name,e.user_phone,o.order_date,o.order_time,o.code,o.order_state,o.tag,o.total,o.order_type,o.date_spanishformat,o.date_englishformat FROM orders o inner join orders_extern_users e on o.id_order = e.id_order and o.order_state = $1  ORDER BY o.id_order desc LIMIT 15 OFFSET $2', [orderstate, count]);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
});
exports.getOrders_count = getOrders_count;
/*export const get_orders_quantity = async (req: Request, res: Response): Promise <Response> =>{
    
   
    const orderstate= req.params.orderstate;
    
    try {
        const response: QueryResult = await pool.query('SELECT count(*) from orders where order_state = $1', [orderstate])
    
   
        return  res.status(200).json(response.rows);
      
    } catch (error) {
        console.log(error)
        return  res.status(500).json('Internal server error');
    }
    
}*/
/*export const update_orderstate = async (req: Request, res: Response): Promise <Response> =>{
    

    const order_id= req.params.order_id;
    const order_state= req.params.order_state;
    
    try {
        const response: QueryResult = await pool.query("UPDATE orders SET order_state=$1 where id_order = $2", [order_state,order_id])
    
   
        return res.json('Estado modificado');
      
    } catch (error) {
        console.log(error)
        return  res.status(500).json('Internal server error');
    }
    
}*/
/*export const delete_oldorders = async (req : Request, res : Response): Promise <Response> => {
    
    try {
         
        const maxresponse: QueryResult = await pool.query('select id_order from orders order by id_order limit 3 offset 0');
        


  return  res.json({
       message : maxresponse.rows
    }
    )

    } catch (error) {
        
        return  res.status(200).json({
            err : error
         }
         )
    }
          
}*/ 
