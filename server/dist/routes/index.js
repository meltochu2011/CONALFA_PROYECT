"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../libs/multer"));
const router = (0, express_1.Router)();
/**IMPORTAMOS LOS METODOS */
const index_controller_1 = require("../controllers/index.controller");
const index_controller_orders_1 = require("../controllers/index.controller_orders");
const usersindex_controller_1 = require("../controllers/usersindex.controller");
const index_admincontroller_1 = require("../controllers/index.admincontroller");
/**CONTROLADORES PARA CLIENTE DE ADMINISTRADOR
 * _________________________________________________________________________________
 * _________________________________________________________________________________
*/
/**OBTENER CATEGORÍAS (SIN PAGINACION)*/
router.get('/categories', index_controller_1.getCategories);
/**OBTENER CATEGORÍAS A LAS QUE PERTENECE UN PRODUCTO ESPECIFICO*/
router.get('/specific_product_categories/:id_product', index_controller_1.getSelected_categories);
/**OBTENER CATEGORÍAS (PAGINADAS)*/
router.get('/categories_pagecount/:cat_count', index_controller_1.getCategories_pagecount);
/**OBTENER IMAGENES DE GALERÍA ENVIANDO PARAMETRO DE INICIO DE PAGINACION */
router.get('/getgallery/:count', index_controller_1.getGallery);
/**CREAR UNA NUEVA CATEGORÍA */
router.post('/categories', index_controller_1.createCategory);
/**ELIMINAR UNA CATEGORÍA */
router.delete('/categories/:id_category', index_controller_1.deleteCategory);
/**ELIMINAR UN PRODUCT */
router.delete('/products/:id_product', index_controller_1.deleteProduct);
router.delete('/trans', index_controller_1.ejemplo);
/** ACTUALIZAR UN PRODUCTO ESPECÍFICO DE EN MODO DETALLE*/
router.put('/productdetail/:id_product', index_controller_1.editProduct_detail);
/** ACTUALIZAR UN PRODUCTO ESPECÍFICO DE EN MODO QUICKLY*/
router.put('/product_quickly/:id_product', index_controller_1.editProduct_quickly);
/** ACTUALIZAR UNA CATEGORÍA ESPECÍFICA*/
router.put('/categories/:id_category', index_controller_1.updateCategory);
/**se mando como put porque solo aceptaba un parametro entero, asi que a pesar de que elimina se mandó como
 * una operacion update
 */
router.put('/Gallery_element/:id_gallery', index_controller_1.delete_Gallery_element);
/**INSERTAR IMAGEN */
router.route('/gallery').post(multer_1.default.single('image'), index_controller_1.createGalleryelement);
/**AGREGAR PLATILLO */
router.post('/dishes/add', index_controller_1.create_dish);
/**OBTENER VALORES DE TABLA PRODUCTOS LISTADO GENERAL SIN FILTROS*/
router.get('/getproducts/:count', index_controller_1.get_products);
/**OBTENER PRODUCTOS DE UNA DETERMINADA CATEGORIA CON PAGINACION*/
router.get('/getproductsbyfilter/:id_category/:count', index_controller_1.getcategory_products_onfilter);
/**OBTENER VALORES DE UN PRODUCTO ESPECÍFICO */
router.get('/getproductdetail/:id_product', index_controller_1.get_product_detail);
/**OBTENER PRODUCTOS DE UNA DETERMINADA CATEGORIA*/
router.get('/getcategorydishes/:id_category', index_controller_1.get_category_dishes);
/**OBTENER LOS ITEMS O EXTRAS DE UN PRODUCTO ESPECÍFICO*/
router.get('/getproductitems/:id_product', index_controller_1.get_products_items);
/**OBTENER CANTIDAD DE PRODUCTOS*/
router.get('/getproductsquantity', index_controller_1.get_products_quantity);
/**OBTENER CANTIDAD DE CATEGORÍAS EXISTENTES*/
router.get('/getcategoriesquantity', index_controller_1.get_categories_quantity);
/**OBTENER CANTIDAD DE IMAGENES QUE HAY EN LA GALERIA*/
router.get('/getimagesquantity', index_controller_1.get_images_quantity);
/**OBTENER CANTIDAD DE PRODUCTOS*/
router.get('/getproductsquantity_byfilter/:id_category', index_controller_1.get_products_quantity_onfilter);
/**CONTROLADORES PARA ORDENES
 * _________________________________________________________________________________
 * _________________________________________________________________________________
*/
/**OBTENER ORDENES (PAGINADAS)*/
router.get('/getcounted_orders/:count', index_controller_orders_1.getOrders_count);
/**OBTENER DETALLE DE ORDEN*/
router.get('/getorder_detail/:orderdetail_id', index_controller_orders_1.get_order_detail);
/**OBTENER DETALLE DE ORDEN*/
router.get('/getproducts_order_detail/:orderdetail_id', index_controller_orders_1.get_order_detail_product);
/**OBTENER EXTRAS DE UNA ORDEN ESPECIFICA*/
router.get('/get_orderitems_detail/:orderdetail_id', index_controller_orders_1.get_orderitems_detail);
/**CONTROLADORES PARA CLIENTE DE USARIOS
 * _________________________________________________________________________________
 * _________________________________________________________________________________
*/
/**OBTENER CATEGORÍAS (SIN PAGINACION) PARA APP CLIENTE DE USUARIOS*/
router.get('/categoriesuser', usersindex_controller_1.getCategoriesmovil_user);
/**OBTENER LOS ITEMS O EXTRAS DE UN PRODUCTO ESPECÍFICO PARA APP CLIENTE DE USUARIOS*/
router.get('/getproductitemsuser/:id_product', usersindex_controller_1.get_products_items_user);
/**OBTENER PRODUCTOS DE UNA DETERMINADA CATEGORIA*/
router.get('/getcategorydishesuser/:id_category', usersindex_controller_1.get_category_dishes_user);
/**OBTENER VALORES DE UN PRODUCTO ESPECÍFICO */
router.get('/getproductdetailuser/:id_product', usersindex_controller_1.get_product_detail_user);
/**OBTENER VALORES DE TABLA PRODUCTOS */
router.get('/getallproducts', usersindex_controller_1.get_all_products);
/**ADIMINISTRACION DE LA APP, COMO AUTENTICACION
 * ______________________________________________
 * ______________________________________________
 */
router.get('/autentication', index_admincontroller_1.get_autentication);
exports.default = router;
