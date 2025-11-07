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
exports.socket_orders = void 0;
const database_1 = require("../database");
class socket_orders {
    static order_createOrderjson(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
            console.log('El nombre de tu zona horaria es ', resolvedOptions.timeZone);
            const short = require('short-uuid');
            const codeseparator = short.uuid().split("-");
            const code = codeseparator[0];
            //console.log(codeseparator[0]);
            const date = new Date();
            const date_spanishformat = date.toLocaleString('es-MX', {
                timeZone: 'America/Guatemala',
                dateStyle: 'medium' /*,
                timeStyle: 'medium',*/
            });
            console.log(date_spanishformat);
            const date_englishformat = date.toLocaleString('en-US', {
                timeZone: 'America/Guatemala',
                dateStyle: 'medium' /*,
                timeStyle: 'medium',*/
            });
            console.log(date_englishformat);
            const ordertime = date.toLocaleString('es-MX', {
                timeZone: 'America/Guatemala'
                /*dateStyle: 'medium',
                timeStyle: 'medium',*/
            });
            console.log(ordertime);
            const datetime_separator = ordertime.split(" ");
            // console.log(ordertime.split(" "));
            const orderdate = datetime_separator[0];
            const products = data.products;
            const total = data.total;
            const hour = datetime_separator[1];
            const customer_name = data.customer_name;
            const customer_last_name = data.customer_last_name;
            const user_phone = data.phone;
            // console.log(data[1].add_ons.length > 0 ? data[1].add_ons[0].tag : {});
            //console.log(products);
            //console.log(products[0].add_ons[0].tag);
            //console.log(data.products[0].add_ons[0].tag);
            try {
                database_1.pool.query('BEGIN');
                const response_idorder = yield database_1.pool.query("insert into orders (order_date,order_time,code,order_state,total,order_type,date_spanishformat,date_englishformat) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning id_order", [orderdate, hour, code, "Procesando", total, "extern_nologedin", date_spanishformat, date_englishformat]);
                const { id_order } = response_idorder.rows[0];
                const order_users = yield database_1.pool.query("insert into orders_extern_users (person_name,person_second_name,user_phone,id_order) VALUES ($1,$2,$3,$4)", [customer_name, customer_last_name, user_phone, id_order]);
                //console.log(products.length);
                for (let i = 0; i < products.length; i++) {
                    //falta dish_price
                    const response_id_ordersdetail = yield database_1.pool.query("insert into orders_detail (id_product,dishes_number,sub_total,id_order) VALUES ($1,$2,$3,$4) returning id_order_detail ", [products[i].id_product, products[i].amount, products[i].sub_total, id_order]);
                    const id_order_detail = response_id_ordersdetail.rows[0].id_order_detail;
                    //console.log(response_id_ordersdetail.rows[0].id_order_detail);
                    const add_ons_size = products[i].add_ons.length;
                    //if(add_ons_size > 0)
                    {
                        //console.log(add_ons_size);
                        for (let j = 0; j < add_ons_size; j++) {
                            yield database_1.pool.query("insert into extra_orders_detail (extra_name,extra_price,id_order_detail) VALUES ($1,$2,$3)", [products[i].add_ons[j].tag, products[i].add_ons[j].price, id_order_detail]);
                        }
                    }
                    //console.log(products[i].add_ons.length > 0 ? products[i].add_ons[0].tag : {})
                    //await pool.query("insert into orders_detail (id_product,dishes_number,sub_total,id_order) VALUES ($1,$2,$3,$4)",[products[i].id_product, products[i].amount ,products[i].sub_total,id_order]);
                }
                //completed = 1;
                database_1.pool.query('COMMIT');
                //console.log(completed.rowCount);
                //const retorno = general_order.rowCount;
                return 1;
            }
            catch (error) {
                return 0;
            }
        });
    }
}
exports.socket_orders = socket_orders;
