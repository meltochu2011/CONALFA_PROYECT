"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**IMPORTAMOS LOS METODOS */
const index_controller_1 = require("../controllers/index.controller");
const index_admincontroller_1 = require("../controllers/index.admincontroller");
/**CONTROLADORES PARA CLIENTE DE ADMINISTRADOR
 * _________________________________________________________________________________
 * _________________________________________________________________________________
*/
/**TEST */
router.get('/test', index_controller_1.test);
/**INICIO DE QUERIES CONALFA
 *
*/
/**OBTENER VOCALES */
router.get('/vocal', index_controller_1.getVowels);
/**OBTENER CONSONANTES */
router.get('/consonant', index_controller_1.getConsonants);
/**OBTENER SILABAS */
router.get('/syllable', index_controller_1.getSyllable);
/**OBTENER PALABRAS */
router.get('/word', index_controller_1.getSyllable_word);
/**OBTENER FRASES */
router.get('/phrase', index_controller_1.getphrase);
/**OBTENER TAREA */
router.get('/gettask', index_controller_1.get_task);
router.get('/savestudenttask');
/**OBTENER TAREA */
router.get('/getarea', index_controller_1.get_area);
/**OBTENER DETALLES DE TAREAS REALIZADAS*/
router.get('/get_tasks_details', index_controller_1.get_detalles_tareas);
/**OBTENER ESTUDIANTES*/
router.get('/get_students/:profesor_id', index_controller_1.get_students);
/**OBTENER PROFESORES DE UN AREA */
router.get('/getprofesors/:area_id', index_controller_1.get_profesor_area);
/**OBTENER PROFESORES DE UN AREA */
router.get('/detalletarea/:student_id/:profesor_id', index_controller_1.get_detalles_tareas);
/*________________________________________________________________________
__________________________________________________________________________ */
router.post('/createtask', index_controller_1.createTask);
router.post('/createtasklesson', index_controller_1.create_task_lesson);
/*registrar la tarea del usuario*/
router.post('/savestudenttask', index_controller_1.save_sutudent_task);
router.post('/createuser', index_controller_1.create_user);
router.delete('/trans', index_controller_1.ejemplo);
//ELIMINAR TAREA
router.delete('/deletetareas/:profesor_id', index_controller_1.deletetareas);
router.delete('/disablelesson/:syllable_word_id', index_controller_1.disablelesson);
/**ADIMINISTRACION DE LA APP, COMO AUTENTICACION
 * ______________________________________________
 * ______________________________________________
 */
//router.post('/addUser',addUser);
router.post('/admin/user', index_admincontroller_1.get_autentication);
exports.default = router;
