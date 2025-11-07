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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
//import socket from 'socket.io'
const app = (0, express_1.default)();
const indexroutes_1 = __importDefault(require("./routes/indexroutes"));
const socket_orders_1 = require("./controllers/socket_orders");
//midelwares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(indexroutes_1.default);
const cors = require('cors');
app.set('port', process.env.PORT || 4000);
const server = require('http').Server(app);
server.listen(app.get('port'), () => {
    console.log('Ready, the port is ' + app.get('port'));
});
//app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:3002', 'http://localhost:4200', 'https://joockuu.vercel.app', 'http://localhost:3000', 'https://back-v9n1.onrender.com', 'http://localhost:3500']
    }
});
/*
io.on("connection", (socket) => {
    socket.on("update item", (arg1, arg2, callback) => {
      console.log(arg1); // 1
      console.log(arg2); // { name: "updated" }
      callback({
        status: "ok"
      });
    });
  });*/
io.on('connection', (socket) => {
    //if(contador <= 15)
    const { groupname } = socket.handshake.query;
    console.log('Hola dispositivo', socket.id, " group name ", groupname);
    socket.join(groupname);
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    }), 3000);
    socket.on('event', (res) => {
        const data = res;
        socket.to(groupname).emit('event', data);
    });
    socket.on('dataevent', (res, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const data = res;
        const resp = socket_orders_1.socket_orders.order_createOrderjson(res);
        if ((yield resp) == true) {
            socket.to(groupname).emit('event', 'delivery');
            //io.to(socket.id).emit('unicast',true);
            callback({
                status: true
            });
        }
        if ((yield resp) == false) {
            callback({
                status: false
            });
        }
    }));
});
/**INSTANCIA PARA TENER DISPONIBLE LA CARPETA UPLOADS, EN DONDE ESTAN LAS IMAGENES */
app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
