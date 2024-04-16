/** Clase 11 - Aplicación chat con Websockets **/

//1) npm init --yes para generar el package.json de nuestro proyecto
//2) Instalamos las dependencias que necesitamos para generar nuestro chat: npm install express express-handlebars socket.io
//3) Instalar nodemon como dependencia de desarrollo y generar el script.

const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars"); //Este es el objeto que contiene el motor de plantillas de Handlebars configurado a través de la librería express-handlebars. Cuando importas express-handlebars y lo asignas a la variable exphbs, estás obteniendo acceso a todas las funciones y opciones proporcionadas por express-handlebars.
const socket = require("socket.io");
const viewsRouter = require("./routes/views.router.js");

//Nota repaso express-handlebars:

//Configuramos Express - Handlebars

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware
app.use(express.static("./src/public"));

//Rutas
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto ${PUERTO}`);
});

//1) Me guardo una referencia del servidor htpp para pasarsela a socket.io

//Socket.io

//2) Creamos una instancia de socket.io pasandole como parametro el servidor http
const io = new socket.Server(httpServer);

//3) Crear un array para guardar los mensajes que se vayan enviado en el chat
let messages = [];

io.on("connection", (socket) => {
  console.log("Un cliente conectado");
  // socket.on("hola", (data)=>{
  //   console.log(data)
  // })

  socket.on("message", (data) => {
    //Recibo la data del cliente y lo voy a pushear en el array que declaramos arriba:
    messages.push(data);
    //Utilizamos el método emit que nos permite emitir eventos desde el servidor hacia el cliente o viceversa
    io.emit("messagesLogs", messages);

  });
}); //Método on para escuchar una conexión
