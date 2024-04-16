//Creamos una instancia de socket.io del lado del cliente
const socket = io();

//Vamos a guardar el nombre del usuario.
let user;

const chatBox = document.getElementById("chatBox");

//Usamos el objeto Swal, acrónimo de SweetAlert.
//El método de este objeto es fire

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingrese un usuario para identificarse en el chat",
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre para continuar";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  console.log(user);
});

// socket.emit("hola","Hola que hace?");

chatBox.addEventListener("keyup", (event) => {
  // el método addEventlistener necesita de dos parametros, el evento(1) y la función callback con la lógica de cuando se dispare el evento (2)

  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      //El método trim nos permite sacar los espacios en blanco al principio y al final de un string
      //Si el mensaje tiene mas de 0 caracteres, lo enviamos al servidor.
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

// Listener de mensajes

socket.on("messagesLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let mensajes = "";
  data.forEach((mensaje) => {
    mensajes = mensajes + `<br> ${mensaje.user} dice: ${mensaje.message}`;
  });

  log.innerHTML = mensajes;
});2
